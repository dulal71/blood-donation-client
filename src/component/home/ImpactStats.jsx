'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { FaDroplet, FaUserCheck, FaHospital, FaHeart } from 'react-icons/fa6';

const stats = [
  { id: 1, label: 'Lives Saved', value: '1,240+', icon: FaHeart, color: 'text-red-500' },
  { id: 2, label: 'Active Donors', value: '850', icon: FaUserCheck, color: 'text-emerald-500' },
  { id: 3, label: 'Blood Units', value: '2,100', icon: FaDroplet, color: 'text-blue-500' },
  { id: 4, label: 'Hospitals Joined', value: '45', icon: FaHospital, color: 'text-amber-500' },
];

const ImpactStats = () => {
  return (
    <section className="py-16 px-6 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            Our Global Impact
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Every drop counts. Here is how our community is making a difference.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="p-6 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center hover:border-red-200 dark:hover:border-red-900 transition-all group"
              >
                <div className={`mb-4 p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-sm ${stat.color}`}>
                  <Icon size={28} />
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;