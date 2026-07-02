import { getDonations } from '@/lib/api/dontion';
import { fundingData } from '@/lib/api/fundingData';
import Link from 'next/link';
import React from 'react';
import { FaHeart } from 'react-icons/fa6';
import { MdBloodtype } from 'react-icons/md';
import { PiHandCoinsFill } from 'react-icons/pi';

const DonationDashboard = async () => {
  const { totalData = 0 } = await getDonations();
  const { totalAmount = 0 } = await fundingData();

  const stats = [
    { title: "Active Donors", icon:FaHeart, value: "12,450", description: "Community members this month" },
    { title: "Funding Raised",icon:PiHandCoinsFill, value: `$${totalAmount}`, description: "Raised for the cause" },
    { title: "Total Donations", icon:MdBloodtype, value: totalData, description: "Donations documented" },
  ];

  return (
    <section className="relative w-full py-20 px-3 md:px-6 bg-gray-900">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/banner-image.png')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-white">
        
        {/* Banner Content */}
        {/* Left Section */}
           <div className="max-w-3xl text-center">
          
          <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
            When Every Second Matters
          </span>
          
          <h1 className="text-3xl md:text-6xl font-extrabold mb-6 leading-tight">
           Find Blood Donors When<span className="text-red-500"> Every Second Matters</span>
          </h1>
          
          <p className="text-md  md:text-lg text-gray-200 mb-10 leading-relaxed">
            Blood Bridge connects generous donors with those in critical need. As a local, community-driven platform, we ensure every drop becomes a lifeline for your neighbors.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-20">
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
         <div className="absolute left-0 right-0 -bottom-[480px] md:-bottom-40 px-6 z-20">
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-6  w-full">
  {stats.map((stat, index) => {
    const Icon = stat.icon;
    return (
      <div key={index} className="card">
        <div className="blob"></div>
        <div className="bg">
          <h3 className="text-gray-500 dark:text-gray-300 font-medium mb-1 uppercase text-xs tracking-widest">
            {stat.title}
          </h3>
          <div className='flex items-center  gap-4'>
            <Icon size={30} color='red' />
          <p className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">{stat.value}</p>
          </div>
          
          <p className="text-sm text-gray-400 dark:text-gray-300">{stat.description}</p>
        </div>
      </div>
    );
  })}
</div>
</div>
      </div>
    </section>
  );
};

export default DonationDashboard;