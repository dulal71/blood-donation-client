import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    quote: "I never realized how simple it was to save a life until I found Blood Bridge. The process was seamless, and knowing my O-negative blood went to a local hospital within 24 hours is incredibly rewarding.",
    name: "Sarah Jenkins",
    role: "Regular Donor, Seattle",
    color: "bg-red-500/10 text-red-400",
  },
  {
    quote: "As a recipient during a critical surgery, I am living proof of the Bridge. The peace of mind I felt was immense. I am forever grateful to the anonymous donor who took an hour of their day so I could have a lifetime.",
    name: "Michael Rodriguez",
    role: "Recipient, Austin",
    color: "bg-blue-500/10 text-blue-400",
  },
  {
    quote: "The mobile units make it so easy to donate between meetings. Blood Bridge's alerts keep me informed about when my specific type is in high demand. It's community service for the modern age.",
    name: "David Chen",
    role: "Tech Lead, New York",
    color: "bg-sky-500/10 text-sky-400",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">What Our Community Says</h2>
          <p className="text-gray-500 dark:text-gray-400">Real stories from the people who make the Blood Bridge possible.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between transition-colors duration-300">
              <div>
                <FaQuoteLeft className="text-red-500 mb-6 text-2xl" />
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 italic">"{item.quote}"</p>
              </div>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${item.color}`}>
                  {item.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{item.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}