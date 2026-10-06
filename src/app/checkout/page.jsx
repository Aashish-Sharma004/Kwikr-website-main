'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Clock, CreditCard, Smartphone, Building2, Wallet, Banknote, ChevronRight, ArrowLeft, Plus, CheckCircle2, Zap } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const savedAddresses = [
  { id: 1, label: 'Home', address: '12, 3rd Cross, Koramangala 5th Block', city: 'Bengaluru', pin: '560095', isDefault: true },
  { id: 2, label: 'Work', address: 'Tech Park, Whitefield Main Road', city: 'Bengaluru', pin: '560066', isDefault: false },
];

const paymentMethods = [
  { id: 'upi', label: 'UPI', icon: <Smartphone size={20} />, desc: 'PhonePe, Google Pay, Paytm & more' },
  { id: 'card', label: 'Credit / Debit Card', icon: <CreditCard size={20} />, desc: 'Visa, Mastercard, RuPay' },
  { id: 'netbanking', label: 'Net Banking', icon: <Building2 size={20} />, desc: 'All major banks supported' },
  { id: 'wallet', label: 'Wallet', icon: <Wallet size={20} />, desc: 'Paytm, Amazon Pay, Freecharge' },
  { id: 'cod', label: 'Cash on Delivery', icon: <Banknote size={20} />, desc: 'Pay when delivered' },
];

const popularBanks = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'];
const walletProviders = ['Paytm', 'Amazon Pay', 'PhonePe Wallet', 'Mobikwik', 'Freecharge'];

function formatCardNumber(value) {
  return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function CheckoutPage() {
  const { state, totalPrice, totalItems, clearCart } = useCart();
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [deliveryType, setDeliveryType] = useState('express');
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');
  const [walletMobile, setWalletMobile] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');

  const deliveryCharge = totalPrice < 199 ? 25 : 0;
  const couponDiscount = appliedCoupon ? Math.round(totalPrice * 0.1) : 0;
  const finalTotal = totalPrice + deliveryCharge - couponDiscount;

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'KWIKR10') {
      setAppliedCoupon(couponCode);
      toast.success('Coupon applied! 10% off.');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const validatePayment = () => {
    if (selectedPayment === 'upi') {
      if (!/^[\w.-]+@[\w.-]+$/.test(upiId)) {
        toast.error('Enter a valid UPI ID (e.g. name@upi)');
        return false;
      }
    } else if (selectedPayment === 'card') {
      if (cardNumber.replace(/\s/g, '').length !== 16) {
        toast.error('Enter a valid 16-digit card number');
        return false;
      }
      if (!cardName.trim()) {
        toast.error('Enter the name on your card');
        return false;
      }
      if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        toast.error('Enter a valid expiry date (MM/YY)');
        return false;
      }
      if (!/^\d{3,4}$/.test(cardCvv)) {
        toast.error('Enter a valid CVV');
        return false;
      }
    } else if (selectedPayment === 'netbanking') {
      if (!selectedBank) {
        toast.error('Please select your bank');
        return false;
      }
    } else if (selectedPayment === 'wallet') {
      if (!selectedWallet) {
        toast.error('Please select a wallet');
        return false;
      }
      if (!/^\d{10}$/.test(walletMobile)) {
        toast.error('Enter a valid 10-digit mobile number');
        return false;
      }
    }
    return true;
  };

  const placeOrder = () => {
    if (!validatePayment()) return;
    setIsPlacingOrder(true);
    setTimeout(() => { clearCart(); router.push('/order-success'); }, 2000);
  };

  if (totalItems === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">Cart is empty</h1>
          <Link href="/products" className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 inline-block mt-4">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/cart" className="p-2 rounded-lg hover:bg-white transition-colors text-gray-600"><ArrowLeft size={20} /></Link>
          <h1 className="text-2xl font-black text-gray-900">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            {/* Address */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                <h2 className="font-bold text-gray-900 text-lg">Delivery Address</h2>
              </div>
              <div className="space-y-3 mb-4">
                {savedAddresses.map(addr => (
                  <label key={addr.id} className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${selectedAddress === addr.id ? 'border-green-500 bg-green-50' : 'border-gray-100 hover:border-green-200'}`}>
                    <input type="radio" name="address" checked={selectedAddress === addr.id} onChange={() => setSelectedAddress(addr.id)} className="mt-1 accent-green-600" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-green-600" />
                        <span className="font-bold text-gray-800">{addr.label}</span>
                        {addr.isDefault && <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-semibold">Default</span>}
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">{addr.address}</p>
                      <p className="text-sm text-gray-400">{addr.city} - {addr.pin}</p>
                    </div>
                  </label>
                ))}
              </div>
              <button onClick={() => setShowAddAddress(!showAddAddress)} className="flex items-center gap-2 text-green-600 text-sm font-semibold hover:text-green-700">
                <Plus size={14} /> Add New Address
              </button>
              {showAddAddress && (
                <div className="mt-4 border border-gray-200 rounded-xl p-4 grid sm:grid-cols-2 gap-3">
                  {['Full Name', 'Mobile Number', 'Flat / House No.', 'Area / Colony', 'City', 'PIN Code'].map(field => (
                    <input key={field} type="text" placeholder={field} className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300" />
                  ))}
                  <div className="sm:col-span-2">
                    <button className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-700">Save Address</button>
                  </div>
                </div>
              )}
            </div>

            {/* Delivery Slot */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                <h2 className="font-bold text-gray-900 text-lg">Delivery Option</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <label className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${deliveryType === 'express' ? 'border-green-500 bg-green-50' : 'border-gray-100 hover:border-green-200'}`}>
                  <input type="radio" name="delivery" checked={deliveryType === 'express'} onChange={() => setDeliveryType('express')} className="hidden" />
                  <div className="flex items-center gap-3">
                    <Zap size={24} className="text-green-600" />
                    <div>
                      <p className="font-bold text-gray-900">Express Delivery</p>
                      <p className="text-sm text-green-600 font-semibold">In 10 Minutes ⚡</p>
                      <p className="text-xs text-gray-400">{deliveryCharge === 0 ? 'FREE delivery' : `₹${deliveryCharge} delivery`}</p>
                    </div>
                  </div>
                </label>
                <label className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${deliveryType === 'scheduled' ? 'border-green-500 bg-green-50' : 'border-gray-100 hover:border-green-200'}`}>
                  <input type="radio" name="delivery" checked={deliveryType === 'scheduled'} onChange={() => setDeliveryType('scheduled')} className="hidden" />
                  <div className="flex items-center gap-3">
                    <Clock size={24} className="text-blue-500" />
                    <div>
                      <p className="font-bold text-gray-900">Scheduled Delivery</p>
                      <p className="text-sm text-blue-500 font-semibold">Pick a time slot</p>
                      <p className="text-xs text-gray-400">Same day / Next day</p>
                    </div>
                  </div>
                </label>
              </div>
              {deliveryType === 'scheduled' && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {['Today 2–4 PM', 'Today 4–6 PM', 'Today 6–8 PM', 'Tomorrow 8–10 AM', 'Tomorrow 10–12 PM', 'Tomorrow 12–2 PM'].map(slot => (
                    <button key={slot} className="text-xs border border-gray-200 rounded-lg p-2 hover:border-green-400 hover:bg-green-50 hover:text-green-700 transition-all text-gray-600">{slot}</button>
                  ))}
                </div>
              )}
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                <h2 className="font-bold text-gray-900 text-lg">Payment Method</h2>
              </div>
              <div className="space-y-2">
                {paymentMethods.map(method => (
                  <label key={method.id} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedPayment === method.id ? 'border-green-500 bg-green-50' : 'border-gray-100 hover:border-green-200'}`}>
                    <input type="radio" name="payment" checked={selectedPayment === method.id} onChange={() => setSelectedPayment(method.id)} className="accent-green-600" />
                    <span className="text-green-600">{method.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{method.label}</p>
                      <p className="text-xs text-gray-400">{method.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
              {selectedPayment === 'upi' && (
                <div className="mt-4 flex gap-2">
                  <input type="text" placeholder="Enter UPI ID (e.g. name@upi)" value={upiId} onChange={e => setUpiId(e.target.value)} className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300" />
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700">Verify</button>
                </div>
              )}

              {selectedPayment === 'card' && (
                <div className="mt-4 border border-gray-200 rounded-xl p-4 grid sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Card Number"
                    value={cardNumber}
                    onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                    maxLength={19}
                    className="sm:col-span-2 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                  <input
                    type="text"
                    placeholder="Name on Card"
                    value={cardName}
                    onChange={e => setCardName(e.target.value)}
                    className="sm:col-span-2 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={e => setCardExpiry(formatExpiry(e.target.value))}
                    maxLength={5}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                  <input
                    type="password"
                    inputMode="numeric"
                    placeholder="CVV"
                    value={cardCvv}
                    onChange={e => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    maxLength={4}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                  <p className="sm:col-span-2 text-xs text-gray-400 flex items-center gap-1">🔒 Your card details are encrypted and never stored.</p>
                </div>
              )}

              {selectedPayment === 'netbanking' && (
                <div className="mt-4 border border-gray-200 rounded-xl p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                    {popularBanks.map(bank => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => setSelectedBank(bank)}
                        className={`text-xs font-semibold rounded-lg px-3 py-2.5 border-2 transition-all text-left ${selectedBank === bank ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:border-green-300'}`}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>
                  <select
                    value={popularBanks.includes(selectedBank) ? '' : selectedBank}
                    onChange={e => setSelectedBank(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 text-gray-600"
                  >
                    <option value="">Select another bank...</option>
                    {['Yes Bank', 'IDFC First Bank', 'IndusInd Bank', 'Bank of Baroda', 'Canara Bank', 'Union Bank of India'].map(bank => (
                      <option key={bank} value={bank}>{bank}</option>
                    ))}
                  </select>
                </div>
              )}

              {selectedPayment === 'wallet' && (
                <div className="mt-4 border border-gray-200 rounded-xl p-4 space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {walletProviders.map(wallet => (
                      <button
                        key={wallet}
                        type="button"
                        onClick={() => setSelectedWallet(wallet)}
                        className={`text-xs font-semibold rounded-lg px-3 py-2.5 border-2 transition-all ${selectedWallet === wallet ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:border-green-300'}`}
                      >
                        {wallet}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Registered mobile number"
                    value={walletMobile}
                    onChange={e => setWalletMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    maxLength={10}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 sticky top-24 space-y-4">
              <h2 className="font-bold text-gray-900 text-lg">Order Summary</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {state.items.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-400">×{item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
              <div className="border border-dashed border-gray-200 rounded-xl p-3">
                <div className="flex gap-2">
                  <input type="text" placeholder="Enter coupon code" value={couponCode} onChange={e => setCouponCode(e.target.value)} className="flex-1 text-sm focus:outline-none" />
                  <button onClick={applyCoupon} className="text-green-600 font-semibold text-sm hover:text-green-700">Apply</button>
                </div>
                {appliedCoupon && <p className="text-green-600 text-xs font-semibold mt-1">✓ KWIKR10 applied — 10% off!</p>}
                <p className="text-xs text-gray-400 mt-1">Try: KWIKR10</p>
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600"><span>Item Total</span><span>₹{totalPrice}</span></div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className={deliveryCharge === 0 ? 'text-green-600 font-semibold' : ''}>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold"><span>Coupon Discount</span><span>-₹{couponDiscount}</span></div>
                )}
                <div className="flex justify-between font-black text-gray-900 text-lg border-t pt-3"><span>Grand Total</span><span>₹{finalTotal}</span></div>
              </div>
              <button onClick={placeOrder} disabled={isPlacingOrder} className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-lg">
                {isPlacingOrder ? (
                  <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />Placing Order...</>
                ) : (
                  <><CheckCircle2 size={20} />Place Order · ₹{finalTotal}</>
                )}
              </button>
              <p className="text-xs text-center text-gray-400">🔒 Secure & encrypted payment.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
