'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { X, MapPin, Search, LocateFixed, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import 'leaflet/dist/leaflet.css';

const DEFAULT_CENTER = { lat: 26.9124, lng: 75.7873 }; // Jaipur, fallback center

export default function LocationPicker({ isOpen, onClose, onConfirm }) {
  const [marker, setMarker] = useState(DEFAULT_CENTER);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [locating, setLocating] = useState(false);
  const [fetchingAddress, setFetchingAddress] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Lock background page scroll while the modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Reverse geocode (lat/lng -> address) using free Nominatim, and update
  // the marker's popup on the map too — no API key anywhere
  const reverseGeocode = useCallback(async (lat, lng) => {
    setFetchingAddress(true);
    if (markerRef.current) {
      markerRef.current.bindPopup('Fetching address...').openPopup();
    }
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&addressdetails=1`
      );
      if (!res.ok) throw new Error('Nominatim request failed');
      const data = await res.json();

      if (!data || data.error) {
        toast.error('Could not fetch address for this location');
        return;
      }

      const addr = data.address || {};
      const cityVal =
        addr.city || addr.town || addr.village || addr.county || addr.state_district || '';
      const pincodeVal = addr.postcode || '';

      setAddress(data.display_name || '');
      setCity(cityVal);
      setPincode(pincodeVal);

      if (markerRef.current) {
        markerRef.current.bindPopup(data.display_name || 'Selected location').openPopup();
      }
    } catch (err) {
      toast.error('Could not fetch address for this location');
    } finally {
      setFetchingAddress(false);
    }
  }, []);

  // Moves the map + marker to a given lat/lng programmatically
  const flyTo = useCallback((lat, lng, zoom = 17) => {
    setMarker({ lat, lng });
    if (mapRef.current && markerRef.current) {
      mapRef.current.setView([lat, lng], zoom);
      markerRef.current.setLatLng([lat, lng]);
    }
  }, []);

  // Initialize the Leaflet map only on the client, only while the modal is open
  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;

    (async () => {
      const L = (await import('leaflet')).default;
      if (cancelled || !mapContainerRef.current || mapRef.current) return;

      // Fix broken default marker icon paths that happen with bundlers
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(mapContainerRef.current, {
        center: [marker.lat, marker.lng],
        zoom: 15,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      const leafletMarker = L.marker([marker.lat, marker.lng], { draggable: true }).addTo(map);

      leafletMarker.on('dragend', () => {
        const { lat, lng } = leafletMarker.getLatLng();
        setMarker({ lat, lng });
        reverseGeocode(lat, lng);
      });

      map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        leafletMarker.setLatLng([lat, lng]);
        setMarker({ lat, lng });
        reverseGeocode(lat, lng);
      });

      mapRef.current = map;
      markerRef.current = leafletMarker;
      setMapReady(true);
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
      setMapReady(false);
    };
  }, [isOpen, reverseGeocode]);

  // Debounced free search using Nominatim — no API key needed
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowResults(true);

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    searchTimeoutRef.current = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=5&q=${encodeURIComponent(value)}`
        );
        const data = await res.json();
        setSearchResults(Array.isArray(data) ? data : []);
      } catch (err) {
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, []);

  const handleSelectSearchResult = (result) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    const addr = result.address || {};
    const cityVal = addr.city || addr.town || addr.village || addr.county || addr.state_district || '';
    const pincodeVal = addr.postcode || '';

    setAddress(result.display_name || '');
    setCity(cityVal);
    setPincode(pincodeVal);

    flyTo(lat, lng);
    if (markerRef.current) {
      markerRef.current.bindPopup(result.display_name || 'Selected location').openPopup();
    }

    setSearchQuery(result.display_name || '');
    setShowResults(false);
    setSearchResults([]);
  };

  // "Use my current location" button
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        flyTo(latitude, longitude);
        reverseGeocode(latitude, longitude);
        setLocating(false);
      },
      () => {
        toast.error('Could not access your location. Please allow location permission.');
        setLocating(false);
      }
    );
  };

  const handleConfirm = () => {
    if (!address) {
      toast.error('Please select a location first');
      return;
    }
    onConfirm({ address, city, pincode, lat: marker.lat, lng: marker.lng });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 flex-shrink-0">
          <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
            <MapPin size={18} className="text-green-600" /> Select Delivery Location
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Free search box - Nominatim, no API key */}
          <div className="relative">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowResults(true)}
                placeholder="Search for area, street name..."
                className="w-full pl-9 pr-9 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              {searchLoading && (
                <Loader2 size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 animate-spin" />
              )}
            </div>

            {showResults && searchResults.length > 0 && (
              <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-56 overflow-y-auto">
                {searchResults.map((result) => (
                  <button
                    key={result.place_id}
                    onClick={() => handleSelectSearchResult(result)}
                    className="w-full text-left px-3 py-2.5 text-sm hover:bg-gray-50 border-b border-gray-50 last:border-b-0 flex items-start gap-2"
                  >
                    <MapPin size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{result.display_name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleUseCurrentLocation}
            disabled={locating}
            className="flex items-center gap-2 text-green-600 font-semibold text-sm hover:text-green-700"
          >
            {locating ? <Loader2 size={15} className="animate-spin" /> : <LocateFixed size={15} />}
            Use my current location
          </button>

          {/* Map - Leaflet + OpenStreetMap, completely free */}
          <div className="relative">
            <div
              ref={mapContainerRef}
              style={{ width: '100%', height: '260px', borderRadius: '16px' }}
            />

            {(!mapReady || fetchingAddress) && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-2xl">
                <Loader2 className="animate-spin text-green-600" size={22} />
              </div>
            )}
          </div>
          <p className="text-xs text-gray-400 -mt-2">
            Search karo, click karo ya pin drag karo — address turant map par aur neeche dono jagah dikh jayega
          </p>

          {/* Editable address fields */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-gray-500">Full Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                placeholder="Enter your address...."
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-500">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                  placeholder="Enter your City...."
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500">Pincode</label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                  placeholder="Enter your PinCode..."
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors"
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
}