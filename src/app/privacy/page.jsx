import {
  ShieldCheck,
  User,
  MapPin,
  CreditCard,
  Lock,
  Cookie,
  Mail,
  Phone,
} from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <ShieldCheck size={60} className="mx-auto mb-4" />

          <h1 className="text-4xl font-bold">
            Privacy Policy
          </h1>

          <p className="mt-4 text-lg max-w-3xl mx-auto">
            Your privacy is important to us. This Privacy Policy explains how
            Kwikr collects, uses, stores, and protects your personal
            information when you use our website and services.
          </p>

          <p className="mt-4 text-sm">
            Last Updated: July 2026
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 py-14 space-y-8">

        {/* Information We Collect */}

        <section className="bg-white shadow rounded-xl p-8">

          <h2 className="text-3xl font-bold mb-6">
            Information We Collect
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="flex gap-4">
              <User className="text-green-600" />
              <div>
                <h3 className="font-semibold">
                  Personal Information
                </h3>

                <p className="text-gray-600">
                  Name, Email Address, Phone Number,
                  Delivery Address and Account Details.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <MapPin className="text-green-600" />
              <div>
                <h3 className="font-semibold">
                  Location Information
                </h3>

                <p className="text-gray-600">
                  With your permission, we use your location
                  to find nearby stores and provide accurate delivery.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <CreditCard className="text-green-600" />
              <div>
                <h3 className="font-semibold">
                  Payment Information
                </h3>

                <p className="text-gray-600">
                  Payments are securely processed through
                  trusted payment gateways. We do not store
                  your debit or credit card details.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Cookie className="text-green-600" />
              <div>
                <h3 className="font-semibold">
                  Cookies & Analytics
                </h3>

                <p className="text-gray-600">
                  We use cookies to improve website
                  performance, remember preferences,
                  and analyze user activity.
                </p>
              </div>
            </div>

          </div>

        </section>

        {/* How We Use Information */}

        <section className="bg-white shadow rounded-xl p-8">

          <h2 className="text-3xl font-bold mb-6">
            How We Use Your Information
          </h2>

          <ul className="space-y-3 list-disc list-inside text-gray-700">

            <li>Process and deliver your grocery orders.</li>

            <li>Provide customer support.</li>

            <li>Send order confirmations and delivery updates.</li>

            <li>Improve website performance and user experience.</li>

            <li>Prevent fraud and unauthorized activity.</li>

            <li>Offer promotions, discounts and special offers.</li>

          </ul>

        </section>

        {/* Data Security */}

        <section className="bg-white shadow rounded-xl p-8">

          <div className="flex items-center gap-3 mb-6">
            <Lock className="text-green-600" size={35} />
            <h2 className="text-3xl font-bold">
              Data Security
            </h2>
          </div>

          <p className="text-gray-700 leading-8">
            We use industry-standard security measures including
            encrypted connections (HTTPS), secure authentication,
            and trusted payment gateways to protect your personal
            information from unauthorized access.
          </p>

        </section>

        {/* Third Party */}

        <section className="bg-white shadow rounded-xl p-8">

          <h2 className="text-3xl font-bold mb-6">
            Third-Party Services
          </h2>

          <p className="text-gray-700 leading-8">

            Kwikr may use trusted third-party services such as:

          </p>

          <ul className="mt-5 list-disc list-inside space-y-2 text-gray-700">

            <li>Google Maps API (Address & Location Services)</li>

            <li>Payment Gateway (Stripe / Razorpay)</li>

            <li>Email Notification Services</li>

            <li>Analytics Services</li>

          </ul>

        </section>

        {/* User Rights */}

        <section className="bg-white shadow rounded-xl p-8">

          <h2 className="text-3xl font-bold mb-6">
            Your Rights
          </h2>

          <ul className="space-y-3 list-disc list-inside text-gray-700">

            <li>Access your account information.</li>

            <li>Update your profile details.</li>

            <li>Delete your account.</li>

            <li>Request data correction.</li>

            <li>Opt out of promotional emails.</li>

          </ul>

        </section>

        {/* Contact */}

        <section className="bg-green-600 rounded-xl p-10 text-white">

          <h2 className="text-3xl font-bold text-center mb-8">
            Contact Us
          </h2>

          <div className="grid md:grid-cols-2 gap-8 text-center">

            <div>

              <Phone className="mx-auto mb-3" size={35} />

              <h3 className="font-semibold">
                Customer Support
              </h3>

              <p>+91 98765 43210</p>

            </div>

            <div>

              <Mail className="mx-auto mb-3" size={35} />

              <h3 className="font-semibold">
                Email Support
              </h3>

              <p>support@kwikr.com</p>

            </div>

          </div>

        </section>

      </div>

    </div>
  );
}