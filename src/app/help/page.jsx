import Link from "next/link";
import {
  HelpCircle,
  ShoppingBag,
  Truck,
  CreditCard,
  RotateCcw,
  Phone,
  Mail,
  MessageCircle,
  Clock,
} from "lucide-react";

export default function HelpCenter() {
  const helpTopics = [
    {
      icon: <ShoppingBag size={28} className="text-green-600" />,
      title: "Order Support",
      description:
        "Track your order, modify orders, cancel orders, and report missing items.",
      link: "/contact",
    },
    {
      icon: <Truck size={28} className="text-green-600" />,
      title: "Delivery Information",
      description:
        "Learn about delivery charges, estimated delivery time, and service areas.",
      link: "/shipping-policy",
    },
    {
      icon: <RotateCcw size={28} className="text-green-600" />,
      title: "Returns & Refunds",
      description:
        "Find information about refund eligibility and return process.",
      link: "/refund-policy",
    },
    {
      icon: <CreditCard size={28} className="text-green-600" />,
      title: "Payments",
      description:
        "Know about available payment methods and payment-related issues.",
      link: "/payment-methods",
    },
  ];

  const faqs = [
    {
      question: "How can I track my order?",
      answer:
        "Go to My Orders from your account dashboard to check the live delivery status.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "Yes, orders can be cancelled before they are packed or dispatched.",
    },
    {
      question: "When will I receive my refund?",
      answer:
        "Approved refunds are generally processed within 5-7 business days.",
    },
    {
      question: "Which payment methods are accepted?",
      answer:
        "We accept UPI, Debit Card, Credit Card, Net Banking and Cash on Delivery.",
    },
    {
      question: "What if I receive a damaged product?",
      answer:
        "Contact our support team within 24 hours with photos of the damaged product.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <HelpCircle size={55} className="mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">
            Kwikr Help Center
          </h1>
         <p className="text-lg max-w-2xl mx-auto">
        Need assistance? We&apos;re here to help with your orders, payments,
        delivery, refunds, and account-related questions.
        </p>
        </div>
      </section>

      {/* Help Topics */}
      <section className="max-w-7xl mx-auto px-5 py-14">
        <h2 className="text-3xl font-bold text-center mb-10">
          How Can We Help You?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {helpTopics.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="mb-4">{item.icon}</div>

              <h3 className="font-bold text-xl mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 mb-5">
                {item.description}
              </p>

              <Link
                href={item.link}
                className="text-green-600 font-semibold hover:underline"
              >
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white py-14">
        <div className="max-w-4xl mx-auto px-5">
          <h2 className="text-3xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-5">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border rounded-lg p-5"
              >
                <h3 className="font-semibold text-lg">
                  {faq.question}
                </h3>

                <p className="text-gray-600 mt-2">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-5">
          <div className="bg-green-600 text-white rounded-xl p-10">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Still Need Help?
            </h2>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <Phone className="mx-auto mb-3" />
                <h3 className="font-bold">Call Us</h3>
                <p>+91 98765 43210</p>
              </div>

              <div>
                <Mail className="mx-auto mb-3" />
                <h3 className="font-bold">Email</h3>
                <p>support@kwikr.com</p>
              </div>

              <div>
                <MessageCircle className="mx-auto mb-3" />
                <h3 className="font-bold">Live Chat</h3>
                <p>Available 24/7</p>
              </div>
            </div>

            <div className="flex justify-center items-center gap-2 mt-8">
              <Clock />
              <span>Customer Support Hours: 8:00 AM - 10:00 PM</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
