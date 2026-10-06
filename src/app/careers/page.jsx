import Link from "next/link";

export const metadata = {
  title: "Careers | Kwikr",
  description:
    "Join Kwikr and build the future of online grocery delivery.",
};

const jobs = [
  {
    title: "Frontend Developer",
    type: "Full Time",
    location: "Jaipur, Rajasthan",
    experience: "0-2 Years",
    description:
      "Build responsive and user-friendly interfaces using Next.js, React.js and Tailwind CSS.",
  },
  {
    title: "Backend Developer",
    type: "Full Time",
    location: "Jaipur, Rajasthan",
    experience: "1-3 Years",
    description:
      "Develop secure REST APIs using Node.js, Express.js and MongoDB.",
  },
  {
    title: "MERN Stack Developer",
    type: "Full Time",
    location: "Jaipur, Rajasthan",
    experience: "0-2 Years",
    description:
      "Work on complete web applications using MongoDB, Express.js, React.js and Next.js.",
  },
  {
    title: "UI/UX Designer",
    type: "Full Time",
    location: "Remote",
    experience: "1+ Years",
    description:
      "Design modern, responsive and user-friendly interfaces for web and mobile applications.",
  },
  {
    title: "Delivery Partner",
    type: "Part Time / Full Time",
    location: "Multiple Cities",
    experience: "No Experience Required",
    description:
      "Deliver grocery orders quickly and safely to customers.",
  },
  {
    title: "Customer Support Executive",
    type: "Full Time",
    location: "Jaipur",
    experience: "0-1 Year",
    description:
      "Help customers with orders, payments, refunds and delivery support.",
  },
];

const benefits = [
  "Competitive Salary",
  "Flexible Work Environment",
  "Learning & Growth Opportunities",
  "Friendly Team Culture",
  "Performance Bonus",
  "Health Benefits",
  "Paid Leave",
  "Career Development",
];

export default function CareersPage() {
  return (
    <main className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">

          <h1 className="text-5xl font-bold mb-5">
            Careers at Kwikr
          </h1>

          <p className="max-w-3xl mx-auto text-lg leading-8">
            Join our team and help build the future of online grocery
            shopping. We believe in innovation, teamwork and creating
            amazing customer experiences.
          </p>

        </div>
      </section>

      {/* Why Join */}
      <section className="max-w-7xl mx-auto px-4 py-20">

        <h2 className="text-4xl font-bold text-center mb-14">
          Why Join Kwikr?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {benefits.map((item) => (
            <div
              key={item}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition"
            >
              <div className="text-4xl mb-4">✅</div>

              <h3 className="font-semibold text-lg">
                {item}
              </h3>
            </div>
          ))}

        </div>

      </section>

      {/* Open Positions */}
      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-4xl font-bold text-center mb-14">
            Current Open Positions
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">

            {jobs.map((job) => (
              <div
                key={job.title}
                className="border rounded-2xl p-8 hover:border-green-500 hover:shadow-lg transition"
              >
                <h3 className="text-2xl font-bold mb-4">
                  {job.title}
                </h3>

                <div className="space-y-2 text-gray-600 mb-5">

                  <p>
                    <strong>Employment:</strong> {job.type}
                  </p>

                  <p>
                    <strong>Location:</strong> {job.location}
                  </p>

                  <p>
                    <strong>Experience:</strong> {job.experience}
                  </p>

                </div>

                <p className="text-gray-600 leading-7 mb-6">
                  {job.description}
                </p>

                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition">
                  Apply Now
                </button>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* Hiring Process */}
      <section className="bg-gray-100 py-20">

        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-4xl font-bold text-center mb-14">
            Our Hiring Process
          </h2>

          <div className="grid md:grid-cols-4 gap-8">

            <div className="bg-white p-6 rounded-xl shadow text-center">
              <div className="text-5xl mb-4">1️⃣</div>
              <h3 className="font-semibold mb-3">Apply</h3>
              <p className="text-gray-600">
                Submit your application online.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow text-center">
              <div className="text-5xl mb-4">2️⃣</div>
              <h3 className="font-semibold mb-3">Interview</h3>
              <p className="text-gray-600">
                Technical and HR discussion.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow text-center">
              <div className="text-5xl mb-4">3️⃣</div>
              <h3 className="font-semibold mb-3">Selection</h3>
              <p className="text-gray-600">
                Receive your offer letter.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow text-center">
              <div className="text-5xl mb-4">4️⃣</div>
              <h3 className="font-semibold mb-3">Welcome</h3>
              <p className="text-gray-600">
                Start your journey with Kwikr.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="py-20">

        <div className="max-w-5xl mx-auto text-center px-4">

          <h2 className="text-4xl font-bold mb-6">
            Ready to Build the Future With Us?
          </h2>

         <p className="text-gray-600 text-lg mb-8">
          We&#39;re always looking for talented people who are passionate
       about technology, innovation and customer satisfaction.
         </p>

          <Link
            href="/contact"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Contact Recruitment Team
          </Link>

        </div>

      </section>

    </main>
  );
}