'use client'

import Link from "next/link";
import { FaCalendarAlt, FaTint } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

export default function DonationCard({ request }) {
  const formattedDate = new Date(request.donationDate).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });

  return (
    <div className="group relative bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 transition-all duration-500 hover:border-rose-500/50 hover:shadow-[0_20px_50px_-15px_rgba(225,29,72,0.2)]">
      
      {/* Decorative Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-500 to-orange-500 rounded-3xl opacity-0 group-hover:opacity-10 transition duration-500 blur" />

      <div className="relative">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 dark:text-slate-500">Recipient</span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">{request.recipientName}</h3>
          </div>
          
          {/* Refined Minimalist Badge */}
          <div className="px-4 py-1.5 rounded-xl bg-red-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all group-hover:bg-rose-50 dark:group-hover:bg-rose-950/30 group-hover:border-rose-200">
            <div className="flex items-center gap-2 text-red-600 dark:text-slate-200 font-bold text-sm group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
              <FaTint size={14}  />
              {request.bloodGroup}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
            <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-rose-500">
              <MdLocationOn size={16} />
            </div>
            <p className="text-sm font-medium">{request.recipientUpazila}, {request.recipientDistrict}</p>
          </div>
          
          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
            <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500">
              <FaCalendarAlt size={14} />
            </div>
            <p className="text-sm">{formattedDate} • {request.donationTime}</p>
          </div>
        </div>

        {/* Button */}
        <Link
          href={`/dashboard/${request._id}`}
          className="relative block w-full py-3.5 text-center rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold tracking-wide transition-all duration-300 hover:bg-rose-600 dark:hover:bg-rose-500 hover:text-white active:scale-[0.97]"
        >
          View Full Request
        </Link>
      </div>
    </div>
  );
}