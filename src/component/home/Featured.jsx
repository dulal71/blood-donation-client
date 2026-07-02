'use client'
import React from "react";
import { FaShieldAlt, FaHandHoldingHeart, FaDonate, FaRobot } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: FaShieldAlt,
    title: "Professional Standards",
    description: "Partnering with verified clinical centers to ensure your safety and comfort.",
  },
  {
    icon: FaHandHoldingHeart,
    title: "Donor to Patient",
    description: "Your donation forms a direct, impactful bridge to neighbors in your local community.",
  },
  {
    icon: FaDonate,
    title: "Always Free",
    description: "A non-profit mission to eliminate barriers and connect donors to recipients without cost.",
  },
  {
    icon: FaRobot,
    title: "Smart Matching",
    description: "Intelligent platform routing that directs you where your specific blood type is most needed.",
  },
];

export default function Features() {
  return (
    <section className="bg-white dark:bg-gray-950 py-24 px-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            Building <span className="text-red-600">Bridges,</span> Saving Lives
          </h2>
          <div className="h-1 w-20 bg-red-600 mx-auto rounded-full"></div>
        </div>

        {/* Feature List (Clean Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-5"
              >
                {/* Icon (No Box) */}
                <div className="flex-shrink-0 pt-1">
                  <Icon className="text-red-600 dark:text-red-500" size={32} />
                </div>
                
                {/* Text Content */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}