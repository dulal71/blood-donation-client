import Link from 'next/link';
import React from 'react';


const DonationDashboard = () => {


  const stats = [
    { title: "Total Users", value: "12,450", description: "Active members this month" },
    { title: "Total Funding", value: "$45,200", description: "Raised for the cause" },
    { title: "Total Donation", value: "37,350", description: "Donations documented" },
  ];

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Banner Text Section */}
        <div className="flex flex-col items-center">
          <span className="inline-block bg-red-50 text-red-600 text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
            Urgent Need for O-
          </span>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Every Drop is a <span className="text-red-600">Hero's Gift</span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-10 max-w-2xl leading-relaxed">
            Join the thousands saving lives every day. Find a donation center near you and become a lifeline for someone in need.
          </p>
          
          {/* Action Buttons with Navigation */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
             href={'/registration'}
              className="bg-red-600 hover:bg-red-700 shadow-lg shadow-red-200 transition-all text-white font-semibold py-3 px-8 rounded-lg"
            >
              Join as a donor
            </Link>
            <Link
            href={'/search-donation'}
             
              className="shimmer-btn"
            >
              Search Donors
            </Link>
          </div>
        </div>

        {/* Stats Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow text-center">
              <h3 className="text-gray-500 font-medium mb-1">{stat.title}</h3>
              <p className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.description}</p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default DonationDashboard;