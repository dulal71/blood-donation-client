'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { FaUserPlus, FaSearch, FaHandHoldingMedical, FaHeartbeat } from 'react-icons/fa';

// 1. Animation Variants for Staggered effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between each card animation
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};

const steps = [
  {
    id: '1',
    title: 'Register',
    description: 'Sign up easily as a donor or seeker profile.',
    icon: FaUserPlus,
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: '2',
    title: 'Find/Request Blood',
    description: 'Search our database or post a specific need.',
    icon: FaSearch,
    color: 'from-sky-500 to-blue-500',
  },
  {
    id: '3',
    title: 'Connect',
    description: 'Communicate securely within the platform.',
    icon: FaHandHoldingMedical,
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: '4',
    title: 'Donate & Save',
    description: 'Complete the donation and mark the life saved.',
    icon: FaHeartbeat,
    color: 'from-emerald-500 to-teal-500',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-sm font-semibold uppercase tracking-widest text-red-600 dark:text-red-400 mb-3 block">
            Process
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
            How Blood <span className='text-red-600'>Bridge</span> Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-light">
            We've streamlined the entire process to ensure that connecting donors and recipients is fast, secure, and meaningful. Helping save lives is just a few steps away.
          </p>
        </div>

        {/* 2. Framer Motion Container */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // Animate when scrolled into view
          viewport={{ once: true, amount: 0.3 }} // Trigger once, when 30% visible
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                variants={cardVariants}
                className="relative group"
              >
                {/* The Card (Glassmorphism effect) */}
                <div className="relative h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl shadow-gray-500/5 dark:shadow-black/10 transition-all duration-300 group-hover:-translate-y-2 group-hover:border-red-200 dark:group-hover:border-red-900">
                  
                  {/* Floating Number Badge */}
                  <div className={`absolute -top-5 left-8 w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg ${step.color.replace('from','shadow').replace('-500','-500/40')} shadow-lg`}>
                    <span className="text-2xl font-bold text-white">{step.id}</span>
                  </div>

                  {/* Icon */}
                  <div className="mt-10 mb-6 inline-flex p-4 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Text Content */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                    {step.description}
                  </p>

                  {/* Decorative Hover Line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color} rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;