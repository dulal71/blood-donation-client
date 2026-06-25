import React from "react";
import Link from "next/link";
import { 
  FaHeart, FaHospital, FaClock, FaInfoCircle, FaArrowRight 
} from "react-icons/fa";

const stats = [
  { icon: <FaHeart className="text-red-500" />, number: "4.5M", label: "Lives saved yearly" },
  { icon: <FaHospital className="text-blue-500" />, number: "1 in 7", label: "Hospital patients need blood" },
  { icon: <FaClock className="text-amber-500" />, number: "Every 2s", label: "Someone needs blood" },
];

export default function Featured() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      {/* Heading with subtle fade-in */}
      <div className="mb-12 text-center md:text-left animate-in fade-in duration-1000">
        <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider animate-pulse">
          <FaHeart /> Why it matters
        </span>
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Every drop saves a life</h2>
        <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
          BloodBridge connects willing donors with people in urgent need — making the process safe, fast, and transparent.
        </p>
      </div>

      {/* Stats Grid with hover scale effect */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center"
          >
            <div className="text-3xl mb-3 flex justify-center">{stat.icon}</div>
            <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
            <div className="text-sm text-gray-500 mt-1 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Urgency Alert with pulse animation */}
      <div className="group bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 mb-16 shadow-lg shadow-red-200 transition-all duration-500 hover:scale-[1.01]">
        <div className="bg-white/20 p-4 rounded-full text-white text-2xl animate-bounce">
          <FaInfoCircle />
        </div>
        <div className="text-white text-center md:text-left">
          <p className="font-bold text-lg">Critical Shortage Alert</p>
          <p className="opacity-90 text-sm">O- and AB+ blood types are in urgent demand in your area.</p>
        </div>
        <Link 
          href="/search"
          className="ml-auto bg-white text-red-700 font-bold px-6 py-2 rounded-lg text-sm transition-transform duration-300 group-hover:translate-x-2 flex items-center gap-2"
        >
          Check Requests <FaArrowRight />
        </Link>
      </div>
    </section>
  );
}