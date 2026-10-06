'use client';

import { X, ShoppingBag, Trash2, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import QuantityCounter from './QuantityCounter';

export default function CartDrawer() {
  const { state, closeCart, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  const deliveryCharge = totalPrice > 0 && totalPrice < 199 ? 25 : 0;
  const finalTotal = totalPrice + deliveryCharge;

  return (
    <>
      {state.isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={closeCart} />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          state.isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-green-600">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-white" size={20} />
            <h2 className="font-bold text-white text-lg">My Cart</h2>
            {totalItems > 0 && (
              <span className="bg-white text-green-600 text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button onClick={closeCart} className="text-white hover:text-green-200 transition-colors">
            <X size={22} />
          </button>
        </div>

        {totalItems > 0 && (
          <div className="bg-green-50 px-4 py-2 border-b border-green-100">
            <p className="text-xs text-green-700 font-medium">
              🚀 Delivery in <span className="font-bold">10 minutes</span>
              {deliveryCharge === 0
                ? <span className="ml-1 text-green-600">• FREE Delivery!</span>
                : <span className="ml-1 text-gray-500">• Add ₹{199 - totalPrice} more for free delivery</span>
              }
            </p>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="font-semibold text-gray-700 mb-1">Your cart is empty</h3>
              <p className="text-gray-400 text-sm mb-6">Add items to get started</p>
              <button
                onClick={closeCart}
                className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            state.items.map(item => (
              <div key={item.id} className="flex gap-3 bg-gray-50 rounded-xl p-3">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 text-sm leading-tight line-clamp-1">{item.name}</h4>
                  <p className="text-gray-400 text-xs mt-0.5">{item.weight}{item.unit}</p>
                  <div className="flex items-center justify-between mt-2">
                    <QuantityCounter
                      quantity={item.quantity}
                      onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                      onDecrease={() => {
                        if (item.quantity === 1) removeItem(item.id);
                        else updateQuantity(item.id, item.quantity - 1);
                      }}
                      size="sm"
                    />
                    <div className="text-right">
                      <p className="font-bold text-gray-900 text-sm">₹{item.price * item.quantity}</p>
                      {item.discount > 0 && (
                        <p className="text-xs text-gray-400 line-through">₹{item.mrp * item.quantity}</p>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-300 hover:text-red-400 transition-colors self-start mt-1"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t border-gray-100 p-4 space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({totalItems} items)</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className={deliveryCharge === 0 ? 'text-green-600 font-semibold' : ''}>
                  {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-base border-t pt-2">
                <span>Total</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors"
            >
              Proceed to Checkout
              <ChevronRight size={18} />
            </Link>
            <Link
              href="/cart"
              onClick={closeCart}
              className="block text-center text-green-600 font-semibold text-sm hover:text-green-700"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
