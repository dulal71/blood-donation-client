 'use client'

import { Button } from "@heroui/react";
import { useState } from "react";
import { FaCalendarAlt, FaClock, FaEye, FaTint } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

 // ── Blood group color map ─────────────────────────────────────────────────────
 const bloodColor = {
   "A+": "bg-red-100 text-red-600 border-red-200",
   "A-": "bg-red-100 text-red-600 border-red-200",
   "B+": "bg-orange-100 text-orange-600 border-orange-200",
   "B-": "bg-orange-100 text-orange-600 border-orange-200",
   "AB+": "bg-purple-100 text-purple-600 border-purple-200",
   "AB-": "bg-purple-100 text-purple-600 border-purple-200",
   "O+": "bg-emerald-100 text-emerald-600 border-emerald-200",
   "O-": "bg-emerald-100 text-emerald-600 border-emerald-200",
 };
 
 export default function DonationCard({ request }) {
      const [requests, setRequests]   = useState([]);
      const [loading, setLoading]     = useState(true);
      const [search, setSearch]       = useState("");
      const [filterBlood, setFilterBlood] = useState("");
  const formattedDate = new Date(request.donationDate).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });

  const formattedTime = new Date(`2000-01-01T${request.donationTime}`).toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit", hour12: true,
  });

  return (
  <div className="group relative bg-white rounded-3xl p-6 border border-slate-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden">
  
  
  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-red-500 to-rose-400" />

  <div className="flex flex-col gap-6">
    
    {/* Header Section */}
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <h3 className="text-xl font-black text-slate-900 tracking-tight">
          {request.recipientName}
        </h3>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest italic">
          Recipient
        </p>
      </div>
      
      {/* Blood Badge with soft glow */}
      <div className={`px-4 py-2 rounded-xl text-sm font-black shadow-lg shadow-rose-500/10 ${bloodColor[request.bloodGroup] || 'bg-rose-100 text-rose-600'}`}>
        {request.bloodGroup}
      </div>
    </div>

    {/* Location & Time - Icon-List style */}
    <div className="space-y-2.5">
      <div className="flex items-center gap-3 group/item">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-50 text-rose-500">
          <MdLocationOn size={16} />
        </div>
        <span className="text-sm font-bold text-slate-700">{request.recipientUpazila}, {request.recipientDistrict}</span>
      </div>
      
      <div className="flex items-center gap-3 group/item">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-500">
          <FaCalendarAlt size={14} />
        </div>
        <span className="text-sm font-medium text-slate-500">{formattedDate} • {formattedTime}</span>
      </div>
    </div>

    {/* Footer Section */}
    <div className="flex items-center justify-between pt-4 border-t border-dashed border-slate-200">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
        </span>
        <span className="text-[10px] font-black uppercase tracking-[0.15em] text-amber-700">Pending</span>
      </div>

      <Button
        size="md"
        onPress={() => onView(request._id)}
        className="bg-slate-900 text-white font-bold rounded-2xl px-6 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-200"
        endContent={<FaEye size={14} />}
      >
        View
      </Button>
    </div>
  </div>
</div>
  );
}