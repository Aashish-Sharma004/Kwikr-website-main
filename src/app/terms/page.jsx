import {
  FileText,
  UserCheck,
  ShoppingCart,
  CreditCard,
  Truck,
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
  Mail,
  Phone,
} from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-5 text-center">

          <FileText size={60} className="mx-auto mb-4" />

          <h1 className="text-4xl font-bold">
            Terms of Service
          </h1>

          <p className="mt-4 text-lg max-w-3xl mx-auto">
            These Terms of Service govern your use of the Kwikr website,
            mobile application, and related services. By using our platform,
            you agree to comply with these terms.
          </p>

          <p className="mt-4 text-sm">
            Last Updated: July 2026
          </p>

        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 py-12 space-y-8">

        {/* Account */}

        <div className="bg-white rounded-xl shadow p-8">

          <div className="flex items-center gap-3 mb-5">
            <UserCheck className="text-green-600" size={35} />
            <h2 className="text-2xl font-bold">
              User Account
            </h2>
          </div>

          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Create an account using accurate information.</li>
            <li>Keep your login credentials secure.</li>
            <li>You are responsible for all activities under your account.</li>
          </ul>

        </div>

        {/* Orders */}

        <div className="bg-white rounded-xl shadow p-8">

          <div className="flex items-center gap-3 mb-5">
            <ShoppingCart className="text-green-600" size={35} />
            <h2 className="text-2xl font-bold">
              Orders
            </h2>
          </div>

          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>All orders are subject to product availability.</li>
            <li>Prices may change without prior notice.</li>
            <li>Kwikr reserves the right to cancel fraudulent orders.</li>
          </ul>

        </div>

        {/* Payments */}

        <div className="bg-white rounded-xl shadow p-8">

          <div className="flex items-center gap-3 mb-5">
            <CreditCard className="text-green-600" size={35} />
            <h2 className="text-2xl font-bold">
              Payments
            </h2>
          </div>

          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Payments are processed through secure payment gateways.</li>
            <li>Cash on Delivery is available in selected locations.</li>
            <li>Customers must ensure sufficient payment balance.</li>
          </ul>

        </div>

        {/* Delivery */}

        <div className="bg-white rounded-xl shadow p-8">

          <div className="flex items-center gap-3 mb-5">
            <Truck className="text-green-600" size={35} />
            <h2 className="text-2xl font-bold">
              Delivery
            </h2>
          </div>

          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Delivery times are estimated and may vary.</li>
            <li>Customers must provide a valid delivery address.</li>
            <li>Delivery charges may apply depending on location.</li>
          </ul>

        </div>

        {/* Returns */}

        <div className="bg-white rounded-xl shadow p-8">

          <div className="flex items-center gap-3 mb-5">
            <RotateCcw className="text-green-600" size={35} />
            <h2 className="text-2xl font-bold">
              Returns & Refunds
            </h2>
          </div>

          <p className="text-gray-700">
            Returns and refunds are governed by our Return Policy and Refund
            Policy. Eligible refund requests are processed within 5–7 business
            days after approval.
          </p>

        </div>

        {/* Privacy */}

        <div className="bg-white rounded-xl shadow p-8">

          <div className="flex items-center gap-3 mb-5">
            <ShieldCheck className="text-green-600" size={35} />
            <h2 className="text-2xl font-bold">
              Privacy & Security
            </h2>
          </div>

          <p className="text-gray-700">
            Your personal information is handled according to our Privacy
            Policy. We use secure technologies to protect customer data and
            payment information.
          </p>

        </div>

        {/* Limitation */}

        <div className="bg-white rounded-xl shadow p-8">

          <div className="flex items-center gap-3 mb-5">
            <AlertTriangle className="text-yellow-500" size={35} />
            <h2 className="text-2xl font-bold">
              Limitation of Liability
            </h2>
          </div>

          <p className="text-gray-700 leading-7">
            Kwikr shall not be liable for delays caused by weather,
            transportation issues, technical failures, natural disasters,
            or events beyond our reasonable control.
          </p>

        </div>

        {/* Contact */}

        <section className="bg-green-600 text-white rounded-xl p-10">

          <h2 className="text-3xl font-bold text-center mb-8">
            Contact Us
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

        </section>

      </div>

    </div>
  );
}