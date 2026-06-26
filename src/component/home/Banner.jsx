import { getDonations } from '@/lib/api/dontion';
import { fundingData } from '@/lib/api/fundingData';
import Link from 'next/link';
import React from 'react';

const DonationDashboard = async () => {
  const { totalData = 0 } = await getDonations();
  const { totalAmount } = await fundingData();

  const stats = [
    { title: "Active Donors", value: "12,450", description: "Community members this month" },
    { title: "Funding Raised", value: `$${totalAmount}`, description: "Raised for the cause" },
    { title: "Total Donations", value: totalData, description: "Donations documented" },
  ];

  return (
    <section className="relative w-full py-20 px-6 bg-gray-900">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/banner-image.png')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-start text-white">
        
        {/* Banner Content */}
        <div className="max-w-2xl">
          <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
            Urgent Need for O-
          </span>
          
          <h1 className="text-3xl md:text-6xl font-extrabold mb-6 leading-tight">
            The Bridge Between <span className="text-red-500">Hope and Life</span>
          </h1>
          
          <p className="text-lg text-gray-200 mb-10 leading-relaxed">
            Blood Bridge connects generous donors with those in critical need. As a local, community-driven platform, we ensure every drop becomes a lifeline for your neighbors.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link
              href={'/registration'}
              className="bg-red-600 hover:bg-red-700 transition-all text-white font-semibold py-3 px-8 rounded-lg"
            >
              JOIN AS A DONOR
            </Link>
            <Link
              href={'/search-donation'}
              className="shimmer-btn"
            >
              SEARCH DONORS
            </Link>
          </div>
        </div>

        {/* Stats Cards Section - Positioned relative to banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center text-gray-900">
              <h3 className="text-gray-500 font-medium mb-1 uppercase text-xs tracking-widest">{stat.title}</h3>
              <p className="text-4xl font-bold mb-2">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonationDashboard;