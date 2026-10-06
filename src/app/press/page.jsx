import Link from "next/link";

export const metadata = {
  title: "Press | Kwikr",
  description: "Latest news, media coverage, announcements and press releases from Kwikr.",
};

const pressReleases = [
  {
    title: "Kwikr Launches Fast Grocery Delivery Service",
    date: "15 July 2026",
    category: "Company News",
    description:
      "Kwikr officially launched its online grocery delivery platform with a mission to deliver fresh groceries quickly and conveniently.",
  },
  {
    title: "Kwikr Partners with Local Grocery Stores",
    date: "10 July 2026",
    category: "Partnership",
    description:
      "Kwikr expanded its network by partnering with trusted local grocery stores to offer customers a wider range of products.",
  },
  {
    title: "Introducing Secure Digital Payments",
    date: "01 July 2026",
    category: "Product Update",
    description:
      "Customers can now pay securely using UPI, Credit Cards, Debit Cards, Wallets and Cash on Delivery.",
  },
];

const mediaKit = [
  "Official Company Logo",
  "Brand Guidelines",
  "Company Overview",
  "Press Images",
  "Product Screenshots",
  "Media Contact Information",
];

export default function PressPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 text-white py-20 ">
        <div className="max-w-7xl mx-auto px-4 text-center">

          <h1 className="text-5xl font-bold mb-6">
            Press & Media
          </h1>

          <p className="max-w-3xl mx-auto text-lg leading-8">
            Stay updated with the latest Kwikr news, announcements,
            partnerships, product launches, and media resources.
          </p>

        </div>
      </section>

      {/* About Press */}
      <section className="max-w-7xl mx-auto px-4 py-20">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-4xl font-bold mb-6">
              About Our Press Room
            </h2>

            <p className="text-gray-600 leading-8 mb-5">
              The Kwikr Press Room provides journalists, bloggers,
              partners and media organizations with the latest company
              announcements, press releases, product updates and brand
              resources.
            </p>

            <p className="text-gray-600 leading-8">
              Our media team is available for interviews, press
              inquiries and collaboration opportunities.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-green-600 mb-6">
              Quick Facts
            </h3>

            <ul className="space-y-4 text-gray-700">
              <li>✅ Fast Grocery Delivery</li>
              <li>✅ Trusted Local Store Partners</li>
              <li>✅ Secure Online Payments</li>
              <li>✅ Fresh Grocery Products</li>
              <li>✅ Customer First Approach</li>
              <li>✅ Technology Driven Platform</li>
            </ul>
          </div>

        </div>

      </section>

      {/* Press Releases */}

      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-4xl font-bold text-center mb-14">
            Latest Press Releases
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">

            {pressReleases.map((item) => (

              <div
                key={item.title}
                className="border rounded-xl p-8 hover:shadow-xl transition"
              >

                <span className="inline-block bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full mb-4">
                  {item.category}
                </span>

                <h3 className="text-xl font-bold mb-4">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 mb-4">
                  {item.date}
                </p>

                <p className="text-gray-600 leading-7">
                  {item.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Media Kit */}

      <section className="bg-gray-100 py-20">

        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-4xl font-bold text-center mb-14">
            Media Kit
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {mediaKit.map((item) => (

              <div
                key={item}
                className="bg-white rounded-xl shadow p-6"
              >
                <h3 className="font-semibold text-lg">
                  📁 {item}
                </h3>
              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Contact */}

      <section className="py-20">

        <div className="max-w-5xl mx-auto px-4 text-center">

          <h2 className="text-4xl font-bold mb-6">
            Media Contact
          </h2>

          <p className="text-gray-600 text-lg mb-8">
            For interviews, press inquiries or media partnerships,
            please contact our communications team.
          </p>

          <div className="bg-white shadow rounded-xl p-8 inline-block">

            <p className="mb-3">
              <strong>Email:</strong> support@kwikr.com
            </p>

            <p className="mb-6">
              <strong>Phone:</strong> +91 1800-476-959
            </p>

            <Link
              href="/login"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold"
            >
              Login
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}