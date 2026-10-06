'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User, Mail, Phone, MapPin, CreditCard, Smartphone, Pencil, Check, Plus, Trash2,
  Package, LogOut, ArrowLeft, Star,
} from 'lucide-react';
import toast from 'react-hot-toast';

const initialProfile = { name: 'Priya Sharma', email: 'priya.sharma@example.com', phone: '+91 98765 43210' };

const initialAddresses = [
  { id: 1, label: 'Home', address: '12, 3rd Cross, Koramangala 5th Block', city: 'Bengaluru', pin: '560095', isDefault: true },
  { id: 2, label: 'Work', address: 'Tech Park, Whitefield Main Road', city: 'Bengaluru', pin: '560066', isDefault: false },
];

const initialPaymentMethods = [
  { id: 1, type: 'card', label: 'Visa •••• 4242', sub: 'Expires 08/27' },
  { id: 2, type: 'upi', label: 'priya@okhdfcbank', sub: 'UPI ID' },
];

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState(initialProfile);
  const [draft, setDraft] = useState(initialProfile);
  const [editing, setEditing] = useState(false);

  const [addresses, setAddresses] = useState(initialAddresses);
  const [showAddAddress, setShowAddAddress] = useState(false);

  const [paymentMethods, setPaymentMethods] = useState(initialPaymentMethods);

  const saveProfile = () => {
    if (!draft.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email)) {
      toast.error('Please enter a valid name and email');
      return;
    }
    setProfile(draft);
    setEditing(false);
    toast.success('Profile updated!');
  };

  const removeAddress = (id) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
    toast.success('Address removed');
  };

  const removePayment = (id) => {
    setPaymentMethods(prev => prev.filter(p => p.id !== id));
    toast.success('Payment method removed');
  };

  const handleLogout = () => {
    toast.success('Logged out successfully');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/" className="p-2 rounded-lg hover:bg-white transition-colors text-gray-600"><ArrowLeft size={20} /></Link>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <User size={22} className="text-green-600" /> My Profile
          </h1>
        </div>

        <div className="space-y-5">
          {/* Profile info */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-green-600 text-white flex items-center justify-center font-black text-xl flex-shrink-0">
                  {profile.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">{profile.name}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1"><Star size={11} className="text-yellow-400 fill-yellow-400" /> Kwikr Member since 2024</p>
                </div>
              </div>
              {!editing && (
                <button
                  onClick={() => { setDraft(profile); setEditing(true); }}
                  className="flex items-center gap-1.5 text-sm font-semibold text-green-600 hover:text-green-700 border border-green-200 hover:bg-green-50 rounded-lg px-3 py-1.5 transition-colors"
                >
                  <Pencil size={14} /> Edit
                </button>
              )}
            </div>

            {editing ? (
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={draft.name}
                    onChange={e => setDraft({ ...draft, name: e.target.value })}
                    placeholder="Full Name"
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                </div>
                <div className="relative">
                  <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={draft.phone}
                    onChange={e => setDraft({ ...draft, phone: e.target.value })}
                    placeholder="Mobile Number"
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                </div>
                <div className="relative sm:col-span-2">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={draft.email}
                    onChange={e => setDraft({ ...draft, email: e.target.value })}
                    placeholder="Email Address"
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                </div>
                <div className="sm:col-span-2 flex gap-2">
                  <button onClick={saveProfile} className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
                    <Check size={14} /> Save Changes
                  </button>
                  <button onClick={() => setEditing(false)} className="text-sm font-semibold text-gray-500 hover:text-gray-700 px-4 py-2">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600"><Mail size={14} className="text-green-600" /> {profile.email}</div>
                <div className="flex items-center gap-2 text-gray-600"><Phone size={14} className="text-green-600" /> {profile.phone}</div>
              </div>
            )}
          </div>

          {/* Quick links */}
          <Link href="/orders" className="flex items-center justify-between bg-white rounded-2xl border border-gray-100 p-4 hover:border-green-200 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center"><Package size={18} /></div>
              <div>
                <p className="font-bold text-gray-900 text-sm">My Orders</p>
                <p className="text-xs text-gray-400">View order history &amp; track deliveries</p>
              </div>
            </div>
            <span className="text-green-600 font-semibold text-sm">View →</span>
          </Link>

          {/* Saved addresses */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 flex items-center gap-2"><MapPin size={17} className="text-green-600" /> Saved Addresses</h2>
            </div>
            <div className="space-y-3">
              {addresses.map(addr => (
                <div key={addr.id} className="flex items-start justify-between gap-3 p-3 rounded-xl border border-gray-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-800 text-sm">{addr.label}</span>
                      {addr.isDefault && <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-semibold">Default</span>}
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">{addr.address}</p>
                    <p className="text-sm text-gray-400">{addr.city} - {addr.pin}</p>
                  </div>
                  <button onClick={() => removeAddress(addr.id)} className="text-gray-300 hover:text-red-400 transition-colors p-1 flex-shrink-0">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {addresses.length === 0 && <p className="text-sm text-gray-400 text-center py-3">No saved addresses.</p>}
            </div>
            {!showAddAddress ? (
              <button onClick={() => setShowAddAddress(true)} className="flex items-center gap-2 text-green-600 text-sm font-semibold hover:text-green-700 mt-3">
                <Plus size={14} /> Add New Address
              </button>
            ) : (
              <div className="mt-4 border border-gray-200 rounded-xl p-4 grid sm:grid-cols-2 gap-3">
                {['Label (e.g. Home)', 'Flat / House No.', 'Area / Colony', 'City', 'PIN Code'].map(field => (
                  <input key={field} type="text" placeholder={field} className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300" />
                ))}
                <div className="sm:col-span-2 flex gap-2">
                  <button
                    onClick={() => { setShowAddAddress(false); toast.success('Address added!'); }}
                    className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-700"
                  >
                    Save Address
                  </button>
                  <button onClick={() => setShowAddAddress(false)} className="text-sm font-semibold text-gray-500 hover:text-gray-700 px-3">Cancel</button>
                </div>
              </div>
            )}
          </div>

          {/* Saved payment methods */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h2 className="font-bold text-gray-900 flex items-center gap-2 mb-4"><CreditCard size={17} className="text-green-600" /> Saved Payment Methods</h2>
            <div className="space-y-3">
              {paymentMethods.map(pm => (
                <div key={pm.id} className="flex items-center justify-between gap-3 p-3 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gray-50 text-green-600 flex items-center justify-center flex-shrink-0">
                      {pm.type === 'card' ? <CreditCard size={16} /> : <Smartphone size={16} />}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{pm.label}</p>
                      <p className="text-xs text-gray-400">{pm.sub}</p>
                    </div>
                  </div>
                  <button onClick={() => removePayment(pm.id)} className="text-gray-300 hover:text-red-400 transition-colors p-1">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {paymentMethods.length === 0 && <p className="text-sm text-gray-400 text-center py-3">No saved payment methods.</p>}
            </div>
            <p className="text-xs text-gray-400 mt-3">New payment methods are saved automatically when you check out.</p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full bg-white border border-red-200 text-red-500 hover:bg-red-50 font-bold py-3 rounded-2xl transition-colors"
          >
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
