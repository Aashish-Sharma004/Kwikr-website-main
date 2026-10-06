import Link from "next/link";

export const metadata = {
  title: "Partner With Us | Kwikr",
  description:
    "Partner with Kwikr as a grocery seller, delivery partner or business partner and grow your business.",
};

const partnerTypes = [
  {
    title: "Become a Grocery Seller",
    icon: "🛒",
    description:
      "Sell your grocery products on Kwikr and reach thousands of customers every day.",
    benefits: [
      "Increase Sales",
      "Large Customer Base",
      "Easy Product Management",
      "Fast Payments",
    ],
  },
  {
    title: "Become a Delivery Partner",
    icon: "🚚",
    description:
      "Earn money by delivering grocery orders with flexible working hours.",
    benefits: [
      "Weekly Earnings",
      "Flexible Schedule",
      "Performance Incentives",
      "Support Team",
    ],
  },
  {
    title: "Business Partnership",
    icon: "🤝",
    description:
      "Partner with Kwikr for technology, logistics, marketing or strategic business collaborations.",
    benefits: [
      "Business Growth",
      "Long-Term Partnership",
      "Brand Visibility",
      "Professional Support",
    ],
  },
];

const steps = [
  {
    step: "1",
    title: "Register",
    desc: "Fill out the partnership application form with your details.",
  },
  {
    step: "2",
    title: "Verification",
    desc: "Our team reviews your information and verifies your documents.",
  },
  {
    step: "3",
    title: "Approval",
    desc: "After successful verification, your partnership gets approved.",
  },
  {
    step: "4",
    title: "Start Growing",
    desc: "Start selling, delivering or collaborating with Kwikr.",
  },
];

export default function PartnerPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">

          <h1 className="text-5xl font-bold mb-6">
            Partner With Kwikr
          </h1>

        <p className="max-w-3xl mx-auto text-lg leading-8">
         Join Kwikr and become part of one of the fastest-growing
         online grocery platforms. Whether you&apos;re a seller,
        delivery partner, or business partner, let&apos;s grow together.
        </p>

        </div>
      </section>

      {/* Partner Types */}

      <section className="max-w-7xl mx-auto px-4 py-20">

        <h2 className="text-4xl font-bold text-center mb-14">
          Partnership Opportunities
        </h2>

        <div className="grid lg:grid-cols-3 gap-8">

          {partnerTypes.map((partner) => (

            <div
              key={partner.title}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition"
            >

              <div className="text-6xl mb-5">
                {partner.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {partner.title}
              </h3>

              <p className="text-gray-600 leading-7 mb-6">
                {partner.description}
              </p>

              <ul className="space-y-3">

                {partner.benefits.map((item) => (

                  <li
                    key={item}
                    className="flex items-center gap-2"
                  >
                    <span className="text-green-600">✔</span>
                    {item}
                  </li>

                ))}

              </ul>

            </div>

          ))}

        </div>

      </section>

      {/* Why Partner */}

      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-4xl font-bold text-center mb-14">
            Why Partner With Kwikr?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="text-center bg-gray-50 rounded-xl p-8 shadow">
              <div className="text-5xl mb-4">📈</div>
              <h3 className="font-bold text-xl mb-3">Business Growth</h3>
              <p className="text-gray-600">
                Reach more customers and grow your revenue.
              </p>
            </div>

            <div className="text-center bg-gray-50 rounded-xl p-8 shadow">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="font-bold text-xl mb-3">Wide Reach</h3>
              <p className="text-gray-600">
                Expand your business across multiple locations.
              </p>
            </div>

            <div className="text-center bg-gray-50 rounded-xl p-8 shadow">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="font-bold text-xl mb-3">Higher Earnings</h3>
              <p className="text-gray-600">
                Increase profits with a growing customer base.
              </p>
            </div>

            <div className="text-center bg-gray-50 rounded-xl p-8 shadow">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="font-bold text-xl mb-3">Dedicated Support</h3>
              <p className="text-gray-600">
                Our support team helps you at every stage.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* Process */}

      <section className="bg-gray-100 py-20">

        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-4xl font-bold text-center mb-14">
            How It Works
          </h2>

          <div className="grid md:grid-cols-4 gap-8">

            {steps.map((step) => (

              <div
                key={step.step}
                className="bg-white rounded-xl shadow p-8 text-center"
              >

                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-5">
                  {step.step}
                </div>

                <h3 className="text-xl font-bold mb-3">
                  {step.title}
                </h3>

                <p className="text-gray-600">
                  {step.desc}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Statistics */}

      <section className="py-20 bg-green-600 text-white">

        <div className="max-w-7xl mx-auto px-4">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">

            <div>
              <h2 className="text-5xl font-bold">10K+</h2>
              <p className="mt-3">Happy Customers</p>
            </div>

            <div>
              <h2 className="text-5xl font-bold">500+</h2>
              <p className="mt-3">Partner Stores</p>
            </div>

            <div>
              <h2 className="text-5xl font-bold">100+</h2>
              <p className="mt-3">Delivery Partners</p>
            </div>

            <div>
              <h2 className="text-5xl font-bold">20+</h2>
              <p className="mt-3">Cities Served</p>
            </div>

          </div>

        </div>

      </section>

      {/* Contact */}

      <section className="py-20">

        <div className="max-w-4xl mx-auto px-4">

          <div className="bg-white rounded-2xl shadow-xl p-10 text-center">

            <h2 className="text-4xl font-bold mb-5">
              Ready to Partner With Us?
            </h2>

        <p className="text-gray-600 text-lg mb-8">
       Whether you&apos;re a grocery store owner, delivery partner,
       wholesaler, or business organization, we&apos;d love to work
        with you.
        </p>

            <div className="space-y-3 mb-8 text-gray-700">
              <p><strong>Email:</strong> support@kwikr.com</p>
              <p><strong>Phone:</strong> +91 1800-476-959</p>
              <p><strong>Support:</strong> Monday - Saturday (9 AM - 7 PM)</p>
            </div>

            <Link
              href="/"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Become a Partner
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}
