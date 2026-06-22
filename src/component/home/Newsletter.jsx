import Link from 'next/link';
import React from 'react';

const Newsletter = () => {
  return (
    <section className="w-full max-w-5xl mx-auto my-12 px-4">
      <div className="relative bg-black text-white rounded-2xl overflow-hidden shadow-xl">
        {/* Background Image/Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
        
        {/* Background Image Placeholder (You can add your image URL here) */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center z-0" />

        <div className="relative z-20 p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Saving lives starts with a single step
          </h2>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input 
              type="email" 
              placeholder="Enter your Email" 
              className="px-4 py-3 rounded-md text-black w-full md:w-96 outline-none focus:ring-2 focus:ring-red-600"
            />
            <Link
            href={'/registration'}
             className="bg-red-700 hover:bg-red-800 text-white font-semibold px-8 py-3 rounded-md transition duration-300 hover:cursor-pointer">
              Join Our Community
            </Link>
          </div>
          
          <p className="text-xs md:text-sm text-gray-300 max-w-2xl">
            By signing up, you agree that LifeSave Connect and its partners may use 
            your email and general location to send you updates about urgent blood 
            donation needs, local drive schedules, and lifesaving programs in your area.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;