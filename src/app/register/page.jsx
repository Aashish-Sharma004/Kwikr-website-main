'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, Phone, Mail, Lock, Eye, EyeOff, ChevronRight, CheckCircle } from 'lucide-react';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '' });

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      // Set an auth cookie so middleware.js knows this user is logged in.
      // max-age is in seconds (here: 7 days)
      document.cookie = `authToken=${form.phone}; path=/; max-age=${60 * 60 * 24 * 7}`;

      const redirectTo = searchParams.get('redirect') || '/';
      router.push(redirectTo);
    }, 1500);
  };

  const isValid = form.name && form.phone.length === 10 && form.email.includes('@') && form.password.length >= 6;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center shadow-green mx-auto mb-3">
              <span className="text-white font-black text-2xl">K</span>
            </div>
            <h1 className="text-2xl font-black text-gray-900">Create Account</h1>
            <p className="text-gray-400 text-sm mt-1">Join 50,000+ happy Kwikr customers</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Full Name" value={form.name} onChange={e => update('name', e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 text-sm" required />
            </div>
            <div className="relative">
              <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <div className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400 text-sm border-r border-gray-200 pr-2">+91</div>
              <input type="tel" placeholder="Mobile Number" value={form.phone} onChange={e => update('phone', e.target.value.replace(/\D/g, '').slice(0, 10))} className="w-full pl-20 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 text-sm" required />
            </div>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="email" placeholder="Email Address" value={form.email} onChange={e => update('email', e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 text-sm" required />
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type={showPass ? 'text' : 'password'} placeholder="Password (min. 6 characters)" value={form.password} onChange={e => update('password', e.target.value)} className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 text-sm" required />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {form.password && (
              <div className="flex gap-1">
                {[1, 2, 3].map(level => (
                  <div key={level} className={`h-1 flex-1 rounded-full ${form.password.length >= level * 3 ? level === 1 ? 'bg-red-400' : level === 2 ? 'bg-yellow-400' : 'bg-green-500' : 'bg-gray-200'}`} />
                ))}
              </div>
            )}
            <p className="text-xs text-gray-400">
              By creating an account, you agree to our <Link href="/terms" className="text-green-600 font-semibold">Terms</Link> and <Link href="/privacy" className="text-green-600 font-semibold">Privacy Policy</Link>.
            </p>
            <button type="submit" disabled={!isValid || loading} className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-lg">
              {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <>Create Account <ChevronRight size={18} /></>}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-5">
            Already have an account? <Link href="/login" className="text-green-600 font-semibold hover:text-green-700">Log In</Link>
          </p>

          <div className="mt-6 pt-5 border-t border-gray-100 space-y-2">
            {['🎁 ₹100 off on your first order', '⚡ 10-minute grocery delivery', '🌿 Fresh farm products daily'].map(b => (
              <div key={b} className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle size={14} className="text-green-500 flex-shrink-0" />{b}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}
