import React from "react";
import { AiFillAlert } from "react-icons/ai";
import { FaMapMarkerAlt, FaCalendarAlt, FaChevronRight } from "react-icons/fa";
import { FaCalendarCheck, FaTruckMedical } from "react-icons/fa6";
import { MdOutlineEmergency } from "react-icons/md";

const opportunities = [
  {
    tag: "CRITICAL NEED",
    tagColor: "bg-red-100 text-red-600",
    title: "O-Negative Needed",
    info: "Seattle General Hospital",
    icon: FaMapMarkerAlt,
    featuredIcon: MdOutlineEmergency,
    buttonText: "Schedule Now",
    buttonClass: "bg-red-700 text-white w-full",
    progressColor: "bg-red-600",
  },
  {
    tag: "UPCOMING",
    tagColor: "bg-blue-100 text-blue-600",
    title: "NY Blood Bridge Event",
    info: "Starts Tomorrow, 9:00 AM",
    icon: FaCalendarAlt,
    featuredIcon: FaCalendarCheck,
    buttonText: "View Details",
    buttonClass: "border border-blue-600 text-blue-600 w-full",
    progressColor: "bg-blue-600",
  },
  {
    tag: "MOBILE UNIT",
    tagColor: "bg-sky-100 text-sky-600",
    title: "Downtown Austin Unit",
    info: "444 Grand Plaza Parking",
    icon: FaMapMarkerAlt,
    featuredIcon:FaTruckMedical,
    buttonText: "Locate Unit",
    buttonClass: "border border-sky-600 text-sky-600 w-full",
    progressColor: "bg-sky-600",
  },
];

export default function UrgentOpportunities() {
  return (
    <section className="py-12 px-4 bg-gray-50 dark:bg-gray-950 mt-100 md:mt-30">
  <div className="max-w-6xl mx-auto">
    <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 gap-6">
  <div className="space-y-2">
    {/* Small Accent Badge */}
    <span className="inline-block px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider">
      Live Updates
    </span>
    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
      Urgent <span className="text-red-600">Bridges</span>
    </h2>
    <p className="text-gray-500 dark:text-gray-400 text-lg">
      Critical blood requests happening right now in your area.
    </p>
  </div>

  <button className="group flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-gray-200 dark:shadow-none">
    View All Requests
    <FaChevronRight className="group-hover:translate-x-1 transition-transform" size={14} />
  </button>
</div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {opportunities.map((opp, idx) => (
        <div key={idx} className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm group
 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="flex justify-between items-start mb-4">
            <span className={`text-[10px] font-bold px-2 py-1 rounded ${opp.tagColor}`}>
              {opp.tag}
            </span>
            <opp.featuredIcon className="w-6 h-6 text-red-500 bg-gray-100 dark:bg-gray-800 rounded-full" />
          </div>
          
          <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{opp.title}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <opp.icon size={14} />
            <span>{opp.info}</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full mb-5">
            <div className={`${opp.progressColor} h-1.5 rounded-full w-2/3`} />
          </div>
          
         <button
  className={`${opp.buttonClass} flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] active:scale-95`}
>
  {opp.buttonText}
  <FaChevronRight className="text-xs transition-transform group-hover:translate-x-1" />
</button>
        </div>
      ))}
    </div>
  </div>
</section>
  );
}