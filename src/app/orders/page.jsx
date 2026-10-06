'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Package, ArrowLeft, RotateCcw, CheckCircle2, Truck, ChevronRight } from 'lucide-react';
import { products } from '@/data/products';
import { orders } from '@/data/orders';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';

const statusStyles = {
  Delivered: { icon: CheckCircle2, color: 'text-green-600 bg-green-50' },
  'Out for Delivery': { icon: Truck, color: 'text-orange-500 bg-orange-50' },
};

export default function OrdersPage() {
  const { addItem } = useCart();

  const reorder = (e, itemIds) => {
    e.preventDefault();
    e.stopPropagation();
    itemIds.forEach(id => {
      const product = products.find(p => p.id === id);
      if (product) addItem(product);
    });
    toast.success('Items added to cart!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/" className="p-2 rounded-lg hover:bg-white transition-colors text-gray-600"><ArrowLeft size={20} /></Link>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <Package size={22} className="text-green-600" /> My Orders
          </h1>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center px-4 py-20 bg-white rounded-2xl border border-gray-100">
            <div className="text-7xl mb-6">📦</div>
            <h2 className="text-xl font-black text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-400 mb-6 max-w-sm">Your order history will show up here once you place your first order.</p>
            <Link href="/products" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => {
              const items = order.itemIds.map(id => products.find(p => p.id === id)).filter(Boolean);
              const StatusIcon = statusStyles[order.status]?.icon || CheckCircle2;
              return (
                <Link key={order.id} href={`/orders/${order.id}`} className="block bg-white rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-card-hover transition-all p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-4 border-b border-dashed border-gray-200">
                    <div>
                      <p className="font-bold text-gray-900">Order #{order.id}</p>
                      <p className="text-xs text-gray-400">Placed on {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                    <span className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${statusStyles[order.status]?.color}`}>
                      <StatusIcon size={13} /> {order.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-4 overflow-x-auto scrollbar-hide">
                    {items.map(item => (
                      <div key={item.id} className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">{items.length} items · <span className="font-bold text-gray-900">₹{order.total}</span></p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => reorder(e, order.itemIds)}
                        className="flex items-center gap-1.5 text-sm font-semibold text-green-600 hover:text-green-700 border border-green-200 hover:bg-green-50 rounded-lg px-3 py-1.5 transition-colors"
                      >
                        <RotateCcw size={14} /> Reorder
                      </button>
                      <span className="flex items-center gap-0.5 text-sm font-semibold text-gray-400">
                        Track <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
