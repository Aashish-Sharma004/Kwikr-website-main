import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Kwikr
          </h1>

          <p className="max-w-3xl mx-auto text-lg">
            Kwikr is your trusted online grocery shopping platform,
            delivering fresh fruits, vegetables, dairy products,
            beverages, snacks, household essentials, and much more
            directly to your doorstep with fast and reliable delivery.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6">
          Who We Are
        </h2>

        <p className="text-gray-700 leading-8">
          Kwikr is an online grocery marketplace designed to make
          grocery shopping simple, convenient, and affordable.
          We connect customers with trusted local stores so they can
          order daily essentials anytime, anywhere.
        </p>

        <p className="text-gray-700 leading-8 mt-5">
          Our platform offers thousands of quality products including
          fresh fruits, vegetables, dairy products, bakery items,
          snacks, beverages, personal care products, and household
          essentials.
        </p>
      </section>

      {/* Mission */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold mb-8">
            Our Mission
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">
                Fresh Products
              </h3>

              <p className="text-gray-600">
                Deliver high-quality fresh groceries from trusted
                local stores to every customer.
              </p>
            </div>

            <div className="shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">
                Fast Delivery
              </h3>

              <p className="text-gray-600">
                Ensure quick, safe, and on-time grocery delivery
                right to your doorstep.
              </p>
            </div>

            <div className="shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">
                Affordable Prices
              </h3>

              <p className="text-gray-600">
                Provide competitive prices, exciting offers,
                discounts, and cashback opportunities.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Kwikr?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-bold mb-3">
                Fresh Grocery
              </h3>

              <p className="text-gray-600">
                Fresh fruits, vegetables, dairy, and daily essentials.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-bold mb-3">
                Secure Payments
              </h3>

              <p className="text-gray-600">
                Safe online payments with trusted payment gateways.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-bold mb-3">
                Easy Ordering
              </h3>

              <p className="text-gray-600">
                User-friendly shopping experience with quick checkout.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-bold mb-3">
                Customer Support
              </h3>

              <p className="text-gray-600">
                Dedicated customer support to help whenever you need us.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold mb-8">
            Our Core Values
          </h2>

          <ul className="space-y-4 text-gray-700">
            <li>✔ Customer Satisfaction</li>
            <li>✔ Quality Products</li>
            <li>✔ Fast & Reliable Delivery</li>
            <li>✔ Affordable Pricing</li>
            <li>✔ Secure Shopping Experience</li>
            <li>✔ Transparency & Trust</li>
          </ul>

        </div>
      </section>

      {/* Stats */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-4 gap-8 text-center">

            <div>
              <h2 className="text-4xl font-bold">10K+</h2>
              <p>Happy Customers</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold">5K+</h2>
              <p>Products</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold">100+</h2>
              <p>Partner Stores</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold">24/7</h2>
              <p>Customer Support</p>
            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto text-center px-6">

          <h2 className="text-3xl font-bold mb-5">
            Shop Fresh Groceries Today
          </h2>

          <p className="text-gray-600 mb-8">
            Discover thousands of grocery products at affordable prices
            with quick delivery and secure payments.
          </p>

          <Link href='/products' className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold">
            Start Shopping
          </Link>

        </div>
      </section>

    </main>
  );
}