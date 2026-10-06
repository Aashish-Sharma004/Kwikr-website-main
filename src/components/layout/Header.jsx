'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, MapPin, ChevronDown, User, Menu, X, Phone, Heart, Package, LayoutGrid } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { products, categories } from '@/data/products';
import useMagnetic from '@/hooks/useMagnetic';
import LocationPicker from './LocationPicker';

const navCategories = [
  { name: 'Fruits & Veg', href: '/products?category=fruits-vegetables', emoji: '🥦' },
  { name: 'Dairy & Milk', href: '/products?category=dairy-milk', emoji: '🥛' },
  { name: 'Snacks', href: '/products?category=snacks', emoji: '🍿' },
  { name: 'Beverages', href: '/products?category=beverages', emoji: '🧃' },
  { name: 'Bakery', href: '/products?category=bakery', emoji: '🍞' },
  { name: 'Atta & Rice', href: '/products?category=atta-rice', emoji: '🌾' },
  { name: 'Household', href: '/products?category=household', emoji: '🧹' },
  { name: 'Frozen', href: '/products?category=frozen', emoji: '🧊' },
];

export default function Header() {
  const router = useRouter();
  const { totalItems, openCart } = useCart();
  const { totalWishlist } = useWishlist();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ---- Location state ----
  const [locationLabel, setLocationLabel] = useState('Select Location');
  const [savedLocation, setSavedLocation] = useState(null);
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  const searchRef = useRef(null);
  const megaMenuRef = useRef(null);
  const cartMagneticRef = useMagnetic(0.25);

  // ---- Mobile menu open/close helpers ----
  const openMobileMenu = () => setMobileMenuOpen(true);
  const closeMobileMenu = () => setMobileMenuOpen(false);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Load previously saved location from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('kwikr_location');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSavedLocation(parsed);
        setLocationLabel(parsed.city || parsed.address || 'Select Location');
      } catch {
        // ignore malformed old data
      }
    }
  }, []);

  useEffect(() => {
    if (query.trim().length > 1) {
      const q = query.toLowerCase();
      setResults(
        products.filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        ).slice(0, 6)
      );
      setShowDropdown(true);
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  }, [query]);

  useEffect(() => {
    const handler = e => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target)) {
        setMegaMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeMobileMenu();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  // Lock background scroll while mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Auto-close mobile menu if the viewport is resized up to desktop width
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) closeMobileMenu();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
      setShowDropdown(false);
    }
  };

  // Called by LocationPicker when the user confirms a location
  const handleLocationConfirm = (loc) => {
    setSavedLocation(loc);
    setLocationLabel(loc.city || loc.address);
    localStorage.setItem('kwikr_location', JSON.stringify(loc));
  };

  return (
    <header className={`sticky top-0 z-40 bg-green-50 transition-shadow duration-200 ${scrolled ? 'shadow-md' : 'shadow-sm border-b border-green-100'}`}>

      {/* Main header row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3 lg:gap-5">

        {/* Hamburger (mobile) */}
        <button
          type="button"
          onClick={toggleMobileMenu}
          className="lg:hidden relative z-50 p-2 -ml-1 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors flex-shrink-0"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-green-600 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-black text-lg leading-none">K</span>
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="text-lg font-black text-gray-900 tracking-tight">Kwikr</div>
            <div className="text-[10px] text-gray-400 leading-none font-medium">10-min delivery</div>
          </div>
        </Link>

        {/* Location — click to open LocationPicker modal (Places Autocomplete + Map + Geocoding) */}
        <button
          onClick={() => setShowLocationPicker(true)}
          className="hidden md:flex items-center gap-1.5 border border-gray-200 hover:border-green-400 text-gray-600 hover:text-green-600 rounded-lg px-3 py-2 text-sm transition-colors flex-shrink-0 group"
          title="Click to set your delivery location"
        >
          <MapPin size={14} className="text-green-600" />
          <span className="font-medium max-w-[110px] truncate">{locationLabel}</span>
          <ChevronDown size={11} className="text-gray-400 group-hover:text-green-500" />
        </button>

        {/* Search bar */}
        <div ref={searchRef} className="flex-1 relative">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search from more than 1,000 products..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => query.length > 1 && setShowDropdown(true)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 hover:border-gray-300 focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100 rounded-lg text-sm outline-none transition-all placeholder-gray-400"
              />
            </div>
          </form>

          {/* Search dropdown */}
          {showDropdown && results.length > 0 && (
            <div className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
              {results.map(p => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                  onClick={() => { setShowDropdown(false); setQuery(''); }}
                >
                  <div className="w-9 h-9 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.weight}{p.unit} · {p.brand}</p>
                  </div>
                  <span className="text-sm font-bold text-green-600 flex-shrink-0">₹{p.price}</span>
                </Link>
              ))}
              <button
                type="button"
                onClick={() => { router.push(`/products?search=${encodeURIComponent(query)}`); setShowDropdown(false); }}
                className="w-full px-4 py-2.5 text-left text-sm text-green-600 font-semibold bg-green-50 hover:bg-green-100 transition-colors"
              >
                See all results for &ldquo;{query}&rdquo; →
              </button>
            </div>
          )}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {/* Help - desktop only */}
          <div className="hidden xl:flex items-center gap-1.5 text-xs text-gray-500 border-r border-gray-200 pr-3 mr-1">
            <Phone size={13} className="text-green-600" />
            <div className="leading-tight">
              <div className="text-[10px] text-gray-400">Need Help?</div>
              <div className="font-semibold text-gray-700">1800-123-4567</div>
            </div>
          </div>

          {/* Orders */}
          <Link
            href="/orders"
            className="hidden lg:flex items-center gap-1.5 text-sm text-gray-600 hover:text-green-600 font-medium px-3 py-2 rounded-lg hover:bg-green-50 transition-colors"
          >
            <Package size={15} />
            <span className="hidden xl:inline">My Orders</span>
          </Link>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="relative flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-500 font-medium p-2 sm:px-3 sm:py-2 rounded-lg hover:bg-red-50 transition-colors"
            aria-label="Wishlist"
          >
            <Heart size={16} />
            <span className="hidden xl:inline">Wishlist</span>
            {totalWishlist > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {totalWishlist > 9 ? '9+' : totalWishlist}
              </span>
            )}
          </Link>

          {/* Account */}
          <Link
            href="/profile"
            className="hidden md:flex items-center gap-1.5 text-sm text-gray-600 hover:text-green-600 font-medium px-3 py-2 rounded-lg hover:bg-green-50 transition-colors"
          >
            <User size={15} />
            <span className="hidden lg:inline">My Account</span>
          </Link>

          {/* Cart */}
          <button
            id="header-cart-icon"
            ref={cartMagneticRef}
            onClick={openCart}
            className="relative flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white pl-3.5 pr-4 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm"
          >
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">My Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-orange-400 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center leading-none">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Category nav bar — desktop */}
      <div className="hidden lg:block bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-0.5">
            <div ref={megaMenuRef} className="relative flex-shrink-0 py-1">
              <button
                onClick={() => setMegaMenuOpen(o => !o)}
                onMouseEnter={() => setMegaMenuOpen(true)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${megaMenuOpen ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-green-50 hover:text-green-700'}`}
              >
                <LayoutGrid size={15} />
                All Categories
                <ChevronDown size={12} className={`transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {megaMenuOpen && (
                <div
                  onMouseLeave={() => setMegaMenuOpen(false)}
                  className="absolute top-[calc(100%+6px)] left-0 bg-white rounded-xl shadow-xl border border-gray-100 z-50 p-5 flex gap-6"
                  style={{ width: '820px' }}
                >
                  <div className="grid grid-cols-3 gap-1 flex-1">
                    {categories.map(cat => (
                      <Link
                        key={cat.id}
                        href={`/products?category=${cat.id}`}
                        onClick={() => setMegaMenuOpen(false)}
                        className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-green-50 transition-colors group"
                      >
                        <span className={`w-9 h-9 rounded-full ${cat.color} flex items-center justify-center text-lg flex-shrink-0`}>{cat.icon}</span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800 group-hover:text-green-700 truncate">{cat.name}</p>
                          <p className="text-xs text-gray-400">{cat.count}+ items</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="w-40 flex-shrink-0 bg-gradient-to-br from-green-500 to-green-700 rounded-xl p-4 flex flex-col justify-between text-white">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide opacity-80">Fresh Deal</p>
                      <p className="text-lg font-black leading-tight mt-1">Up to 30% OFF on Fruits & Veggies</p>
                    </div>
                    <Link
                      href="/products?category=fruits-vegetables"
                      onClick={() => setMegaMenuOpen(false)}
                      className="text-xs font-bold bg-white text-green-700 rounded-lg px-3 py-1.5 text-center mt-3"
                    >
                      Shop Now →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center overflow-x-auto py-1 gap-0.5 scrollbar-hide">
              {navCategories.map(cat => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-gray-600 font-medium hover:bg-green-50 hover:text-green-700 transition-all whitespace-nowrap flex-shrink-0"
                >
                  <span>{cat.emoji}</span>
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu backdrop — clicking anywhere outside the panel also closes it */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 z-40 bg-black/40 lg:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-white border-t border-gray-100 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            {/* Location — mobile, opens the same LocationPicker modal */}
            <button
              onClick={() => { setShowLocationPicker(true); closeMobileMenu(); }}
              className="flex items-center gap-3 py-3 px-3 rounded-lg text-gray-700 hover:bg-gray-50 w-full text-left"
            >
              <MapPin size={16} className="text-green-600" />
              <span className="font-semibold">{locationLabel}</span>
            </button>

            <Link
              href="/profile"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 py-3 px-3 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <User size={16} className="text-green-600" />
              <span className="font-semibold">My Account</span>
            </Link>
            <div className="grid grid-cols-2 gap-2 pb-2 mb-2 border-b border-gray-100">
              <Link
                href="/wishlist"
                onClick={closeMobileMenu}
                className="flex items-center gap-2 py-3 px-3 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                <Heart size={16} className="text-red-500" />
                <span className="font-semibold text-sm">Wishlist</span>
              </Link>
              <Link
                href="/orders"
                onClick={closeMobileMenu}
                className="flex items-center gap-2 py-3 px-3 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                <Package size={16} className="text-green-600" />
                <span className="font-semibold text-sm">My Orders</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {navCategories.map(cat => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 hover:bg-green-50 hover:text-green-700 rounded-lg text-sm font-medium text-gray-700 transition-colors"
                >
                  <span className="text-base">{cat.emoji}</span>
                  {cat.name}
                </Link>
              ))}
            </div>
            <Link
              href="/products"
              onClick={closeMobileMenu}
              className="block text-center text-green-600 font-semibold text-sm py-3 border-t border-gray-100 mt-2"
            >
              View All Categories →
            </Link>
          </div>
        </div>
      )}

      {/* Location picker modal */}
      <LocationPicker
        isOpen={showLocationPicker}
        onClose={() => setShowLocationPicker(false)}
        onConfirm={handleLocationConfirm}
      />
    </header>
  );
}











// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { Search, ShoppingCart, MapPin, ChevronDown, User, Menu, X, Phone, Heart, Package, LayoutGrid } from 'lucide-react';
// import { useCart } from '@/context/CartContext';
// import { useWishlist } from '@/context/WishlistContext';
// import { products, categories } from '@/data/products';
// import useMagnetic from '@/hooks/useMagnetic';

// const navCategories = [
//   { name: 'Fruits & Veg', href: '/products?category=fruits-vegetables', emoji: '🥦' },
//   { name: 'Dairy & Milk', href: '/products?category=dairy-milk', emoji: '🥛' },
//   { name: 'Snacks', href: '/products?category=snacks', emoji: '🍿' },
//   { name: 'Beverages', href: '/products?category=beverages', emoji: '🧃' },
//   { name: 'Bakery', href: '/products?category=bakery', emoji: '🍞' },
//   { name: 'Atta & Rice', href: '/products?category=atta-rice', emoji: '🌾' },
//   { name: 'Household', href: '/products?category=household', emoji: '🧹' },
//   { name: 'Frozen', href: '/products?category=frozen', emoji: '🧊' },
// ];

// export default function Header() {
//   const router = useRouter();
//   const { totalItems, openCart } = useCart();
//   const { totalWishlist } = useWishlist();
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [megaMenuOpen, setMegaMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const searchRef = useRef(null);
//   const megaMenuRef = useRef(null);
//   const cartMagneticRef = useMagnetic(0.25);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 8);
//     window.addEventListener('scroll', onScroll, { passive: true });
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   useEffect(() => {
//     if (query.trim().length > 1) {
//       const q = query.toLowerCase();
//       setResults(
//         products.filter(p =>
//           p.name.toLowerCase().includes(q) ||
//           p.brand.toLowerCase().includes(q) ||
//           p.category.toLowerCase().includes(q)
//         ).slice(0, 6)
//       );
//       setShowDropdown(true);
//     } else {
//       setResults([]);
//       setShowDropdown(false);
//     }
//   }, [query]);

//   useEffect(() => {
//     const handler = e => {
//       if (searchRef.current && !searchRef.current.contains(e.target)) {
//         setShowDropdown(false);
//       }
//       if (megaMenuRef.current && !megaMenuRef.current.contains(e.target)) {
//         setMegaMenuOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handler);
//     return () => document.removeEventListener('mousedown', handler);
//   }, []);

//   const handleSearch = e => {
//     e.preventDefault();
//     if (query.trim()) {
//       router.push(`/products?search=${encodeURIComponent(query.trim())}`);
//       setShowDropdown(false);
//     }
//   };

//   return (
//     <header className={`sticky top-0 z-40 bg-white transition-shadow duration-200 ${scrolled ? 'shadow-md' : 'shadow-sm border-b border-gray-100'}`}>

//       {/* Main header row */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3 lg:gap-5">

//         {/* Hamburger (mobile) */}
//         <button
//           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           className="lg:hidden p-2 -ml-1 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors flex-shrink-0"
//           aria-label="Menu"
//         >
//           {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
//         </button>

//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-2 flex-shrink-0">
//           <div className="w-8 h-8 sm:w-9 sm:h-9 bg-green-600 rounded-lg flex items-center justify-center shadow-sm">
//             <span className="text-white font-black text-lg leading-none">K</span>
//           </div>
//           <div className="hidden sm:block leading-tight">
//             <div className="text-lg font-black text-gray-900 tracking-tight">Kwikr</div>
//             <div className="text-[10px] text-gray-400 leading-none font-medium">10-min delivery</div>
//           </div>
//         </Link>

//         {/* Location */}
//         <button className="hidden md:flex items-center gap-1.5 border border-gray-200 hover:border-green-400 text-gray-600 hover:text-green-600 rounded-lg px-3 py-2 text-sm transition-colors flex-shrink-0 group">
//           <MapPin size={14} className="text-green-600" />
//           <span className="font-medium">Jaipur</span>
//           <ChevronDown size={11} className="text-gray-400 group-hover:text-green-500" />
//         </button>

//         {/* Search bar */}
//         <div ref={searchRef} className="flex-1 relative">
//           <form onSubmit={handleSearch}>
//             <div className="relative">
//               <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//               <input
//                 type="text"
//                 placeholder="Search from more than 1,000 products..."
//                 value={query}
//                 onChange={e => setQuery(e.target.value)}
//                 onFocus={() => query.length > 1 && setShowDropdown(true)}
//                 className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 hover:border-gray-300 focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100 rounded-lg text-sm outline-none transition-all placeholder-gray-400"
//               />
//             </div>
//           </form>

//           {/* Search dropdown */}
//           {showDropdown && results.length > 0 && (
//             <div className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
//               {results.map(p => (
//                 <Link
//                   key={p.id}
//                   href={`/products/${p.id}`}
//                   className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
//                   onClick={() => { setShowDropdown(false); setQuery(''); }}
//                 >
//                   <div className="w-9 h-9 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
//                     <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-semibold text-gray-800 truncate">{p.name}</p>
//                     <p className="text-xs text-gray-400">{p.weight}{p.unit} · {p.brand}</p>
//                   </div>
//                   <span className="text-sm font-bold text-green-600 flex-shrink-0">₹{p.price}</span>
//                 </Link>
//               ))}
//               <button
//                 type="button"
//                 onClick={() => { router.push(`/products?search=${encodeURIComponent(query)}`); setShowDropdown(false); }}
//                 className="w-full px-4 py-2.5 text-left text-sm text-green-600 font-semibold bg-green-50 hover:bg-green-100 transition-colors"
//               >
//                 See all results for &ldquo;{query}&rdquo; →
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Right actions */}
//         <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
//           {/* Help - desktop only */}
//           <div className="hidden xl:flex items-center gap-1.5 text-xs text-gray-500 border-r border-gray-200 pr-3 mr-1">
//             <Phone size={13} className="text-green-600" />
//             <div className="leading-tight">
//               <div className="text-[10px] text-gray-400">Need Help?</div>
//               <div className="font-semibold text-gray-700">1800-123-4567</div>
//             </div>
//           </div>

//           {/* Orders */}
//           <Link
//             href="/orders"
//             className="hidden lg:flex items-center gap-1.5 text-sm text-gray-600 hover:text-green-600 font-medium px-3 py-2 rounded-lg hover:bg-green-50 transition-colors"
//           >
//             <Package size={15} />
//             <span className="hidden xl:inline">My Orders</span>
//           </Link>

//           {/* Wishlist */}
//           <Link
//             href="/wishlist"
//             className="relative flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-500 font-medium p-2 sm:px-3 sm:py-2 rounded-lg hover:bg-red-50 transition-colors"
//             aria-label="Wishlist"
//           >
//             <Heart size={16} />
//             <span className="hidden xl:inline">Wishlist</span>
//             {totalWishlist > 0 && (
//               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none">
//                 {totalWishlist > 9 ? '9+' : totalWishlist}
//               </span>
//             )}
//           </Link>

//           {/* Account */}
//           <Link
//             href="/profile"
//             className="hidden md:flex items-center gap-1.5 text-sm text-gray-600 hover:text-green-600 font-medium px-3 py-2 rounded-lg hover:bg-green-50 transition-colors"
//           >
//             <User size={15} />
//             <span className="hidden lg:inline">My Account</span>
//           </Link>

//           {/* Cart — id targeted by the fly-to-cart animation; ref gives it a subtle magnetic pull */}
//           <button
//             id="header-cart-icon"
//             ref={cartMagneticRef}
//             onClick={openCart}
//             className="relative flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white pl-3.5 pr-4 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm"
//           >
//             <ShoppingCart size={16} />
//             <span className="hidden sm:inline">My Cart</span>
//             {totalItems > 0 && (
//               <span className="absolute -top-1.5 -right-1.5 bg-orange-400 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center leading-none">
//                 {totalItems > 9 ? '9+' : totalItems}
//               </span>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Category nav bar — desktop */}
//       <div className="hidden lg:block bg-white border-t border-gray-100">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex items-center gap-0.5">
//             {/* All Categories trigger — kept outside the scroll container so its dropdown isn't clipped */}
//             <div ref={megaMenuRef} className="relative flex-shrink-0 py-1">
//               <button
//                 onClick={() => setMegaMenuOpen(o => !o)}
//                 onMouseEnter={() => setMegaMenuOpen(true)}
//                 className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${megaMenuOpen ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-green-50 hover:text-green-700'}`}
//               >
//                 <LayoutGrid size={15} />
//                 All Categories
//                 <ChevronDown size={12} className={`transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />
//               </button>

//               {megaMenuOpen && (
//                 <div
//                   onMouseLeave={() => setMegaMenuOpen(false)}
//                   className="absolute top-[calc(100%+6px)] left-0 bg-white rounded-xl shadow-xl border border-gray-100 z-50 p-5 flex gap-6"
//                   style={{ width: '820px' }}
//                 >
//                   <div className="grid grid-cols-3 gap-1 flex-1">
//                     {categories.map(cat => (
//                       <Link
//                         key={cat.id}
//                         href={`/products?category=${cat.id}`}
//                         onClick={() => setMegaMenuOpen(false)}
//                         className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-green-50 transition-colors group"
//                       >
//                         <span className={`w-9 h-9 rounded-full ${cat.color} flex items-center justify-center text-lg flex-shrink-0`}>{cat.icon}</span>
//                         <div className="min-w-0">
//                           <p className="text-sm font-semibold text-gray-800 group-hover:text-green-700 truncate">{cat.name}</p>
//                           <p className="text-xs text-gray-400">{cat.count}+ items</p>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                   <div className="w-40 flex-shrink-0 bg-gradient-to-br from-green-500 to-green-700 rounded-xl p-4 flex flex-col justify-between text-white">
//                     <div>
//                       <p className="text-xs font-bold uppercase tracking-wide opacity-80">Fresh Deal</p>
//                       <p className="text-lg font-black leading-tight mt-1">Up to 30% OFF on Fruits & Veggies</p>
//                     </div>
//                     <Link
//                       href="/products?category=fruits-vegetables"
//                       onClick={() => setMegaMenuOpen(false)}
//                       className="text-xs font-bold bg-white text-green-700 rounded-lg px-3 py-1.5 text-center mt-3"
//                     >
//                       Shop Now →
//                     </Link>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Scrollable quick-link pills */}
//             <div className="flex items-center overflow-x-auto py-1 gap-0.5 scrollbar-hide">
//               {navCategories.map(cat => (
//                 <Link
//                   key={cat.name}
//                   href={cat.href}
//                   className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-gray-600 font-medium hover:bg-green-50 hover:text-green-700 transition-all whitespace-nowrap flex-shrink-0"
//                 >
//                   <span>{cat.emoji}</span>
//                   {cat.name}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {mobileMenuOpen && (
//         <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
//           <div className="px-4 py-4 space-y-1">
//             <Link
//               href="/profile"
//               onClick={() => setMobileMenuOpen(false)}
//               className="flex items-center gap-3 py-3 px-3 rounded-lg text-gray-700 hover:bg-gray-50"
//             >
//               <User size={16} className="text-green-600" />
//               <span className="font-semibold">My Account</span>
//             </Link>
//             <div className="grid grid-cols-2 gap-2 pb-2 mb-2 border-b border-gray-100">
//               <Link
//                 href="/wishlist"
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="flex items-center gap-2 py-3 px-3 rounded-lg text-gray-700 hover:bg-gray-50"
//               >
//                 <Heart size={16} className="text-red-500" />
//                 <span className="font-semibold text-sm">Wishlist</span>
//               </Link>
//               <Link
//                 href="/orders"
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="flex items-center gap-2 py-3 px-3 rounded-lg text-gray-700 hover:bg-gray-50"
//               >
//                 <Package size={16} className="text-green-600" />
//                 <span className="font-semibold text-sm">My Orders</span>
//               </Link>
//             </div>
//             <div className="grid grid-cols-2 gap-2">
//               {navCategories.map(cat => (
//                 <Link
//                   key={cat.name}
//                   href={cat.href}
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 hover:bg-green-50 hover:text-green-700 rounded-lg text-sm font-medium text-gray-700 transition-colors"
//                 >
//                   <span className="text-base">{cat.emoji}</span>
//                   {cat.name}
//                 </Link>
//               ))}
//             </div>
//             <Link
//               href="/products"
//               onClick={() => setMobileMenuOpen(false)}
//               className="block text-center text-green-600 font-semibold text-sm py-3 border-t border-gray-100 mt-2"
//             >
//               View All Categories →
//             </Link>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }
