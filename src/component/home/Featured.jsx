import React from "react";
import { FaShieldAlt, FaHandHoldingHeart, FaDonate, FaRobot } from "react-icons/fa";

const features = [
  {
    icon: <FaShieldAlt className="text-blue-600" size={24} />,
    title: "Professional Standards",
    description: "We partner with FDA-cleared clinical centers to ensure your safety and comfort.",
  },
  {
    icon: <FaHandHoldingHeart className="text-blue-600" size={24} />,
    title: "Donor to Patient",
    description: "Your donation forms a direct bridge to a neighbor in need within your local community.",
  },
  {
    icon: <FaDonate className="text-blue-600" size={24} />,
    title: "Always Free",
    description: "A non-profit mission to eliminate barriers and connect donors to recipients without cost.",
  },
  {
    icon: <FaRobot className="text-blue-600" size={24} />,
    title: "Smart Matching",
    description: "Our intelligent platform directs you to the centers where your specific blood type is most needed.",
  },
];

export default function Features() {
  return (
    <section className="bg-gray-50 py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Building Bridges, Saving Lives</h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-16">
          Blood Bridge is a 100% free platform dedicated to making blood donation accessible, safe, and community-focused.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Icon Container */}
              <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-6 border border-gray-100">
                {feature.icon}
              </div>
              {/* Text */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[250px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}