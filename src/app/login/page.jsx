'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronRight, ArrowLeft } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phone.length === 10) {
      setLoading(true);
      setTimeout(() => { setLoading(false); setStep('otp'); }, 1000);
    }
  };

  const handleOtpChange = (val, i) => {
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    if (val && i < 3) document.getElementById(`otp-${i + 1}`)?.focus();
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      // Set an auth cookie so middleware.js knows this user is logged in.
      // max-age is in seconds (here: 7 days)
      document.cookie = `authToken=${phone}; path=/; max-age=${60 * 60 * 24 * 7}`;

      // Send the user back to whatever page they were trying to reach, or home
      const redirectTo = searchParams.get('redirect') || '/';
      router.push(redirectTo);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center shadow-green mx-auto mb-3">
              <span className="text-white font-black text-3xl">K</span>
            </div>
            <h1 className="text-2xl font-black text-gray-900">Welcome to Kwikr</h1>
            <p className="text-gray-400 text-sm mt-1">India&apos;s fastest grocery delivery</p>
          </div>

          {step === 'phone' ? (
            <form onSubmit={handlePhoneSubmit}>
              <h2 className="font-bold text-gray-800 mb-1">Enter Mobile Number</h2>
              <p className="text-gray-400 text-sm mb-5">We&apos;ll send you a 4-digit OTP to verify</p>
              <div className="relative mb-5">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-gray-500 text-sm border-r border-gray-200 pr-2">
                  🇮🇳 +91
                </div>
                <input
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="w-full pl-20 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 text-lg font-medium"
                  required
                />
              </div>
              <button type="submit" disabled={phone.length !== 10 || loading} className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-lg">
                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <>Get OTP <ChevronRight size={18} /></>}
              </button>
              <p className="text-center text-gray-400 text-sm mt-6">
                New to Kwikr? <Link href="/register" className="text-green-600 font-semibold hover:text-green-700">Create Account</Link>
              </p>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit}>
              <button onClick={() => setStep('phone')} className="flex items-center gap-1 text-gray-500 text-sm mb-5 hover:text-gray-700">
                <ArrowLeft size={14} /> Change number
              </button>
              <h2 className="font-bold text-gray-800 mb-1">Verify OTP</h2>
              <p className="text-gray-400 text-sm mb-5">Sent to +91 {phone.slice(0, 5)}XXXXX</p>
              <div className="flex gap-3 justify-center mb-6">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(e.target.value, i)}
                    onKeyDown={e => e.key === 'Backspace' && !otp[i] && i > 0 && document.getElementById(`otp-${i - 1}`)?.focus()}
                    className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  />
                ))}
              </div>
              <button type="submit" disabled={otp.join('').length < 4 || loading} className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-lg">
                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <>Verify & Login <ChevronRight size={18} /></>}
              </button>
              <p className="text-center text-gray-400 text-sm mt-4">
                Didn&apos;t receive OTP? <button type="button" className="text-green-600 font-semibold hover:text-green-700">Resend</button>
              </p>
            </form>
          )}

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-xs">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <button className="w-full border border-gray-200 rounded-xl py-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors text-gray-700 font-medium">
            <span className="text-xl">🔵</span> Continue with Google
          </button>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          {[{ icon: '⚡', text: '10-Min Delivery' }, { icon: '💰', text: 'Best Prices' }, { icon: '🌿', text: 'Always Fresh' }].map(b => (
            <div key={b.text} className="bg-white rounded-xl p-3 shadow-sm">
              <div className="text-xl mb-1">{b.icon}</div>
              <p className="text-xs text-gray-500 font-medium">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
