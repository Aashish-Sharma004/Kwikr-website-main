'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ShoppingBag, ArrowLeft, ChevronRight, Zap, ShieldCheck, RotateCcw } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import QuantityCounter from '@/components/ui/QuantityCounter';
import { products } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard';

export default function CartPage() {
  const { state, removeItem, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const { items } = state;

  const deliveryCharge = totalPrice > 0 && totalPrice < 199 ? 25 : 0;
  const discount = items.reduce((sum, item) => sum + (item.mrp - item.price) * item.quantity, 0);
  const finalTotal = totalPrice + deliveryCharge;

  const suggestedProducts = products.filter(p => !items.find(i => i.id === p.id)).slice(0, 4);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
          <div className="text-8xl mb-6">🛒</div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-400 mb-8 max-w-sm">Looks like you haven&apos;t added anything to your cart yet.</p>
          <Link href="/products" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold transition-colors flex items-center gap-2">
            <ShoppingBag size={18} /> Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/products" className="p-2 rounded-lg hover:bg-white transition-colors text-gray-600"><ArrowLeft size={20} /></Link>
          <h1 className="text-2xl font-black text-gray-900">My Cart</h1>
          <span className="bg-green-100 text-green-700 text-sm font-bold px-2.5 py-0.5 rounded-full">{totalItems} items</span>
        </div>

        <div className="bg-green-600 text-white rounded-xl px-4 py-3 mb-6 flex items-center gap-2">
          <Zap size={16} />
          <p className="text-sm font-semibold">
            🚀 Your order will be delivered in <strong>10 minutes</strong>!{' '}
            {deliveryCharge === 0 ? 'Free delivery on this order.' : `Add ₹${199 - totalPrice} more for free delivery.`}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-green-100 transition-colors">
                <div className="flex gap-4">
                  <Link href={`/products/${item.id}`} className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-gray-400">{item.brand}</p>
                        <Link href={`/products/${item.id}`}><h3 className="font-semibold text-gray-800 hover:text-green-600 transition-colors">{item.name}</h3></Link>
                        <p className="text-xs text-gray-400">{item.weight}{item.unit}</p>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-400 transition-colors p-1 ml-2"><Trash2 size={16} /></button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <QuantityCounter
                        quantity={item.quantity}
                        onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                        onDecrease={() => item.quantity === 1 ? removeItem(item.id) : updateQuantity(item.id, item.quantity - 1)}
                      />
                      <div className="text-right">
                        <p className="font-bold text-gray-900">₹{item.price * item.quantity}</p>
                        {item.discount > 0 && <p className="text-xs text-gray-400 line-through">₹{item.mrp * item.quantity}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button onClick={clearCart} className="text-red-400 text-sm font-medium hover:text-red-500 transition-colors mt-2">Clear cart</button>

            {suggestedProducts.length > 0 && (
              <div className="bg-white rounded-2xl p-4 border border-gray-100 mt-6">
                <h3 className="font-bold text-gray-900 mb-4">You might also like</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {suggestedProducts.map(p => <ProductCard key={p.id} product={p} size="sm" />)}
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 sticky top-24">
              <h2 className="font-bold text-gray-900 mb-4 text-lg">Order Summary</h2>
              <div className="space-y-3 text-sm mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Price ({totalItems} items)</span><span>₹{totalPrice + discount}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Product Discount</span><span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charges</span>
                  <span className={deliveryCharge === 0 ? 'text-green-600 font-semibold' : ''}>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span>
                </div>
                <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between font-black text-gray-900 text-lg">
                  <span>Total Amount</span><span>₹{finalTotal}</span>
                </div>
                {(discount > 0 || deliveryCharge === 0) && (
                  <div className="bg-green-50 rounded-lg px-3 py-2 text-green-700 text-xs font-semibold">
                    🎉 You&apos;re saving ₹{discount + (deliveryCharge === 0 && totalPrice > 0 ? 25 : 0)} on this order!
                  </div>
                )}
              </div>
              <Link href="/checkout" className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition-colors mb-3">
                Proceed to Checkout <ChevronRight size={18} />
              </Link>
              <Link href="/products" className="block text-center text-green-600 font-semibold text-sm hover:text-green-700">← Continue Shopping</Link>
              <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-2 text-center">
                {[
                  { icon: <ShieldCheck size={16} className="text-green-500" />, text: 'Secure Payment' },
                  { icon: <RotateCcw size={16} className="text-green-500" />, text: 'Easy Returns' },
                ].map((b, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    {b.icon}
                    <span className="text-xs text-gray-400">{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
