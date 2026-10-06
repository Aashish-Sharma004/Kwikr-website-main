"use client";

import { useState } from "react";
import {
  Search,
  Package,
  ShoppingBag,
  CheckCircle,
  Truck,
  Home,
  Phone,
  Mail,
} from "lucide-react";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [showOrder, setShowOrder] = useState(false);

  const handleTrack = () => {
    if (orderId.trim() !== "") {
      setShowOrder(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Hero */}
      <section className="bg-green-600 py-16 text-white">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <Package size={60} className="mx-auto mb-4" />
          <h1 className="text-4xl font-bold">Track Your Order</h1>
          <p className="mt-3 text-lg">
            Enter your Order ID to check your delivery status.
          </p>
        </div>
      </section>

      {/* Search Box */}
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 -mt-10 relative z-10">

        <h2 className="text-2xl font-bold text-center mb-6">
          Order Tracking
        </h2>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter Order ID (Example: GRZ123456)"
            className="w-full border rounded-lg px-4 py-3 outline-none"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />

          <button
            onClick={handleTrack}
            className="bg-green-600 hover:bg-green-700 text-white px-6 rounded-lg flex items-center gap-2"
          >
            <Search size={18} />
            Track
          </button>
        </div>
      </div>

      {showOrder && (

        <div className="max-w-6xl mx-auto px-5 py-12">

          {/* Order Details */}

          <div className="bg-white rounded-xl shadow p-6 mb-8">

            <div className="grid md:grid-cols-3 gap-6">

              <div>
                <h3 className="font-semibold text-gray-500">
                  Order ID
                </h3>
                <p className="font-bold">{orderId}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-500">
                  Estimated Delivery
                </h3>
                <p className="font-bold">Today • 6:30 PM</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-500">
                  Delivery Partner
                </h3>
                <p className="font-bold">Rahul Kumar</p>
              </div>

            </div>

          </div>

          {/* Status */}

          <div className="bg-white rounded-xl shadow p-8">

            <h2 className="text-2xl font-bold mb-8">
              Order Status
            </h2>

            <div className="grid md:grid-cols-4 gap-8 text-center">

              <div>
                <ShoppingBag
                  className="mx-auto text-green-600"
                  size={45}
                />
                <h3 className="font-bold mt-3">
                  Order Placed
                </h3>
                <p className="text-green-600">
                  Completed
                </p>
              </div>

              <div>
                <CheckCircle
                  className="mx-auto text-green-600"
                  size={45}
                />
                <h3 className="font-bold mt-3">
                  Packed
                </h3>
                <p className="text-green-600">
                  Completed
                </p>
              </div>

              <div>
                <Truck
                  className="mx-auto text-yellow-500"
                  size={45}
                />
                <h3 className="font-bold mt-3">
                  Out For Delivery
                </h3>
                <p className="text-yellow-600">
                  In Progress
                </p>
              </div>

              <div>
                <Home
                  className="mx-auto text-gray-400"
                  size={45}
                />
                <h3 className="font-bold mt-3">
                  Delivered
                </h3>
                <p className="text-gray-500">
                  Pending
                </p>
              </div>

            </div>

          </div>

          {/* Delivery Address */}

          <div className="bg-white rounded-xl shadow p-6 mt-8">

            <h2 className="text-2xl font-bold mb-5">
              Delivery Address
            </h2>

            <p>
              Arvind Kumar
            </p>

            <p className="text-gray-600">
              House No. 120, Jagatpura,
              Jaipur, Rajasthan - 302017
            </p>

          </div>

          {/* Customer Support */}

          <div className="bg-green-600 text-white rounded-xl p-8 mt-8">

            <h2 className="text-3xl font-bold text-center mb-6">
              Need Help?
            </h2>

            <div className="grid md:grid-cols-2 gap-8 text-center">

              <div>
                <Phone
                  className="mx-auto mb-3"
                  size={35}
                />
                <h3 className="font-bold">
                  Call Support
                </h3>
                <p>+91 9876543210</p>
              </div>

              <div>
                <Mail
                  className="mx-auto mb-3"
                  size={35}
                />
                <h3 className="font-bold">
                  Email Support
                </h3>
                <p>support@kwikr.com</p>
              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}