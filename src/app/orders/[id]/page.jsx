'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, CreditCard, CheckCircle, Package, Truck, Home, RotateCcw } from 'lucide-react';
import { products } from '@/data/products';
import { getOrderById, trackingSteps, getStepIndex } from '@/data/orders';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';

const stepIcons = [CheckCircle, Package, Truck, Home];

export default function OrderDetailPage({ params }) {
  const order = getOrderById(params.id);
  const { addItem } = useCart();

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order not found</h1>
          <Link href="/orders" className="text-green-600 font-semibold hover:underline">← Back to Orders</Link>
        </div>
      </div>
    );
  }

  const items = order.itemIds.map(id => products.find(p => p.id === id)).filter(Boolean);
  const currentStep = getStepIndex(order.status);
  const progressPercent = (currentStep / (trackingSteps.length - 1)) * 100;
  const deliveryCharge = order.total < 199 ? 25 : 0;
  const itemsTotal = order.total - deliveryCharge;

  const reorder = () => {
    order.itemIds.forEach(id => {
      const product = products.find(p => p.id === id);
      if (product) addItem(product);
    });
    toast.success('Items added to cart!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/orders" className="p-2 rounded-lg hover:bg-white transition-colors text-gray-600"><ArrowLeft size={20} /></Link>
          <div>
            <h1 className="text-xl font-black text-gray-900">Order #{order.id}</h1>
            <p className="text-xs text-gray-400">Placed on {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
          </div>
        </div>

        {/* Tracking */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 mb-5">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold mb-6 ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-600'}`}>
            {order.status === 'Delivered' ? '✅ Delivered' : '🚚 Out for Delivery — arriving soon'}
          </div>

          <div className="relative mb-2">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 mx-10" />
            <div
              className="absolute top-5 left-0 h-0.5 bg-green-500 mx-10 transition-all"
              style={{ width: `calc(${progressPercent}% - ${progressPercent === 100 ? '0px' : '20px'})` }}
            />
            <div className="flex justify-between relative">
              {trackingSteps.map((label, i) => {
                const Icon = stepIcons[i];
                const done = i <= currentStep;
                return (
                  <div key={label} className="flex flex-col items-center gap-2 flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${done ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                      <Icon size={18} />
                    </div>
                    <p className={`text-xs font-bold text-center ${done ? 'text-green-600' : 'text-gray-400'}`}>{label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Delivery + Payment info */}
        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-1"><MapPin size={14} className="text-green-600" /> Delivery Address</p>
            <p className="text-sm text-gray-500">{order.address}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-1"><CreditCard size={14} className="text-green-600" /> Payment Method</p>
            <p className="text-sm text-gray-500">{order.paymentMethod}</p>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-5">
          <h2 className="font-bold text-gray-900 mb-4">Items in this Order</h2>
          <div className="space-y-3">
            {items.map(item => (
              <div key={item.id} className="flex items-center gap-3">
                <Link href={`/products/${item.id}`} className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${item.id}`}><p className="text-sm font-semibold text-gray-800 hover:text-green-600 transition-colors truncate">{item.name}</p></Link>
                  <p className="text-xs text-gray-400">{item.weight}{item.unit} · {item.brand}</p>
                </div>
                <p className="text-sm font-bold text-gray-900 flex-shrink-0">₹{item.price}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-dashed border-gray-200 mt-4 pt-4 space-y-1.5 text-sm">
            <div className="flex justify-between text-gray-600"><span>Item Total</span><span>₹{itemsTotal}</span></div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery</span>
              <span className={deliveryCharge === 0 ? 'text-green-600 font-semibold' : ''}>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span>
            </div>
            <div className="flex justify-between font-black text-gray-900 text-base border-t border-gray-100 pt-2 mt-2">
              <span>Total Paid</span><span>₹{order.total}</span>
            </div>
          </div>
        </div>

        <button
          onClick={reorder}
          className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-2xl transition-colors"
        >
          <RotateCcw size={16} /> Reorder These Items
        </button>
      </div>
    </div>
  );
}
