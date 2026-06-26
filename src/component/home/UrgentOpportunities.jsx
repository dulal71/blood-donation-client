import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaChevronRight } from "react-icons/fa";

const opportunities = [
  {
    tag: "CRITICAL NEED",
    tagColor: "bg-red-100 text-red-600",
    title: "O-Negative Needed",
    info: "Seattle General Hospital",
    icon: FaMapMarkerAlt,
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
    buttonText: "Locate Unit",
    buttonClass: "border border-sky-600 text-sky-600 w-full",
    progressColor: "bg-sky-600",
  },
];

export default function UrgentOpportunities() {
  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Urgent  <span className="text-red-700">Bridges,</span> Opportunities</h2>
            <p className="text-gray-500 text-sm">Real-time alerts for critical blood types in your area</p>
          </div>
          <button className="text-sm font-medium text-gray-700 flex items-center gap-1 hover:underline">
            View All Bridge Points <FaChevronRight size={12} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {opportunities.map((opp, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <span className={`text-[10px] font-bold px-2 py-1 rounded ${opp.tagColor}`}>
                  {opp.tag}
                </span>
                {/* Placeholder icon */}
                <div className="w-6 h-6 bg-gray-100 rounded-full" />
              </div>
              
              <h3 className="font-bold text-lg mb-2">{opp.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <opp.icon size={14} />
                <span>{opp.info}</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-100 h-1.5 rounded-full mb-5">
                <div className={`${opp.progressColor} h-1.5 rounded-full w-2/3`} />
              </div>
              
              <button className={`py-2 rounded-md font-semibold text-sm transition ${opp.buttonClass}`}>
                {opp.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}