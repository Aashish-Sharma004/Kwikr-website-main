import {
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  Phone,
  Mail,
} from "lucide-react";

export default function ReturnPolicy() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <RotateCcw size={60} className="mx-auto mb-4" />

          <h1 className="text-4xl font-bold">
            Return Policy
          </h1>

         <p className="mt-4 text-lg max-w-3xl mx-auto">
        At Kwikr, we are committed to delivering fresh and quality
         grocery products. If you receive a damaged, expired, incorrect,
        or missing item, we&apos;re here to help.
        </p>      
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 py-14">

        {/* Return Eligibility */}

        <div className="bg-white rounded-xl shadow p-8 mb-8">

          <h2 className="text-3xl font-bold mb-6">
            Eligible for Return
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="flex gap-4">
              <CheckCircle className="text-green-600" size={30} />
              <div>
                <h3 className="font-semibold">
                  Damaged Product
                </h3>
                <p className="text-gray-600">
                  Product received in damaged or broken condition.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle className="text-green-600" size={30} />
              <div>
                <h3 className="font-semibold">
                  Wrong Item Delivered
                </h3>
                <p className="text-gray-600">
                  Item delivered does not match your order.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle className="text-green-600" size={30} />
              <div>
                <h3 className="font-semibold">
                  Expired Product
                </h3>
                <p className="text-gray-600">
                  Received product past its expiry date.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle className="text-green-600" size={30} />
              <div>
                <h3 className="font-semibold">
                  Missing Item
                </h3>
                <p className="text-gray-600">
                  One or more products are missing from your order.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Not Eligible */}

        <div className="bg-white rounded-xl shadow p-8 mb-8">

          <h2 className="text-3xl font-bold mb-6">
            Not Eligible for Return
          </h2>

          <div className="space-y-5">

            <div className="flex gap-4">
              <XCircle className="text-red-500" size={28} />
              <p>Opened or partially consumed food products.</p>
            </div>

            <div className="flex gap-4">
              <XCircle className="text-red-500" size={28} />
              <p>Products damaged after delivery due to customer handling.</p>
            </div>

            <div className="flex gap-4">
              <XCircle className="text-red-500" size={28} />
              <p>Return request made after 24 hours of delivery.</p>
            </div>

            <div className="flex gap-4">
              <XCircle className="text-red-500" size={28} />
              <p>Perishable products that were stored improperly after delivery.</p>
            </div>

          </div>

        </div>

        {/* Return Process */}

        <div className="bg-white rounded-xl shadow p-8 mb-8">

          <h2 className="text-3xl font-bold mb-8">
            Return Process
          </h2>

          <div className="grid md:grid-cols-4 gap-6 text-center">

            <div>
              <Package className="mx-auto text-green-600 mb-3" size={45} />
              <h3 className="font-semibold">
                1. Raise Request
              </h3>
              <p className="text-gray-600 mt-2">
                Contact our support team through phone or email.
              </p>
            </div>

            <div>
              <CheckCircle className="mx-auto text-green-600 mb-3" size={45} />
              <h3 className="font-semibold">
                2. Verification
              </h3>
              <p className="text-gray-600 mt-2">
                Our team verifies your request with order details.
              </p>
            </div>

            <div>
              <RotateCcw className="mx-auto text-green-600 mb-3" size={45} />
              <h3 className="font-semibold">
                3. Return Approved
              </h3>
              <p className="text-gray-600 mt-2">
                Eligible products are approved for replacement or refund.
              </p>
            </div>

            <div>
              <Clock className="mx-auto text-green-600 mb-3" size={45} />
              <h3 className="font-semibold">
                4. Refund
              </h3>
              <p className="text-gray-600 mt-2">
                Refund is processed within 5–7 business days.
              </p>
            </div>

          </div>

        </div>

        {/* Contact */}

        <div className="bg-green-600 text-white rounded-xl p-8">

          <h2 className="text-3xl font-bold text-center mb-8">
            Need Help?
          </h2>

          <div className="grid md:grid-cols-2 gap-8 text-center">

            <div>
              <Phone className="mx-auto mb-3" size={35} />
              <h3 className="font-semibold">Customer Support</h3>
              <p>+91 98765 43210</p>
            </div>

            <div>
              <Mail className="mx-auto mb-3" size={35} />
              <h3 className="font-semibold">Email Support</h3>
              <p>support@kwikr.com</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
