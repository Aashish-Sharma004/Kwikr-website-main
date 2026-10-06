import Link from "next/link";

export const metadata = {
  title: "Blog | Kwikr",
  description:
    "Read the latest grocery shopping tips, healthy recipes, food storage guides and updates from Kwikr.",
};

const blogs = [
  {
    id: 1,
    title: "Best Healthy Breakfast Foods",
    category: "Health",
    date: "08 July 2026",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
    description:
      "Start your day with nutritious breakfast ideas for a healthier lifestyle.",
  },
  {
    id: 2,
    title: "Monthly Grocery Budget Planning Guide",
    category: "Budget",
    date: "02 July 2026",
    image:
      "https://images.unsplash.com/photo-1514996937319-344454492b37",
    description:
      "Create a monthly grocery budget and reduce unnecessary expenses.",
  },
  
  {
    id: 3,
    title: "Top Kitchen Essentials Every Home Needs",
    category: "Home",
    date: "20 June 2026",
    image:
      "https://images.unsplash.com/photo-1506617420156-8e4536971650",
    description:
      "Discover essential kitchen products that make everyday cooking easier.",
  },
];

export default function BlogPage() {
  return (
    <main className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">

          <h1 className="text-5xl font-bold mb-5">
            Kwikr Blog
          </h1>

          <p className="max-w-3xl mx-auto text-lg leading-8">
            Explore grocery shopping tips, healthy eating guides,
            recipes, food storage ideas and the latest updates from Kwikr.
          </p>

        </div>
      </section>

      {/* Featured Blog */}

      <section className="max-w-7xl mx-auto px-4 py-20">

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden lg:flex">

          <img
            src={blogs[0].image}
            alt={blogs[0].title}
            className="lg:w-1/2 h-80 object-cover"
          />

          <div className="p-10 flex flex-col justify-center">

            <span className="text-green-600 font-semibold mb-3">
              Featured Article
            </span>

            <h2 className="text-4xl font-bold mb-5">
              {blogs[0].title}
            </h2>

            <p className="text-gray-600 leading-8 mb-6">
              {blogs[0].description}
            </p>

            <Link  href="/" className="w-fit bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg">
              Read More
            </Link>

          </div>

        </div>

      </section>

      {/* Latest Blogs */}

      <section className="pb-20">

        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-4xl font-bold text-center mb-14">
            Latest Articles
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {blogs.map((blog) => (

              <div
                key={blog.id}
                className="bg-white rounded-xl shadow hover:shadow-2xl transition overflow-hidden"
              >

                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-6">

                  <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {blog.category}
                  </span>

                  <h3 className="text-xl font-bold mt-4 mb-3">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-gray-500 mb-4">
                    {blog.date}
                  </p>

                  <p className="text-gray-600 leading-7 mb-6">
                    {blog.description}
                  </p>

                  <button className="text-green-600 font-semibold hover:text-green-700">
                    Read Article →
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Categories */}

      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-4xl font-bold text-center mb-12">
            Popular Categories
          </h2>

          <div className="flex flex-wrap justify-center gap-4">

            {[
              "Shopping Tips",
              "Healthy Living",
              "Recipes",
              "Organic Food",
              "Nutrition",
              "Kitchen",
              "Lifestyle",
              "Budget Planning",
            ].map((item) => (
              <span
                key={item}
                className="bg-green-100 text-green-700 px-5 py-3 rounded-full font-medium"
              >
                {item}
              </span>
            ))}

          </div>

        </div>

      </section>

      {/* Newsletter */}

      <section className="bg-green-600 text-white py-20 mb-10">

        <div className="max-w-3xl mx-auto text-center px-4">

          <h2 className="text-4xl font-bold mb-6">
            Subscribe to Our Newsletter
          </h2>

          <p className="mb-8 text-lg">
            Get grocery tips, healthy recipes and exclusive offers directly in your inbox.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <input
              type="email"
              placeholder="Enter your email"
              className="px-5 py-3 rounded-lg text-black w-full sm:w-96 outline-none"
            />

            <button className="bg-black hover:bg-gray-900 px-6 py-3 rounded-lg">
              Subscribe
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}