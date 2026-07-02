import DonationRequestContainer from '@/component/DonationRequestContainer';
import { PaginationWithEllipsis } from '@/component/Pagination';
import { getDonations } from '@/lib/api/dontion';
import React from 'react';
import { FaHeartbeat } from 'react-icons/fa';

const DonationRequest =async ({searchParams}) => {
  const query=await searchParams
  const data = await getDonations("pending",query.page)
const {result : donations = [], totalData = 0} =data || {}
  const statsData = [
  { title: "Active", value: "124", variant: "default" },
  { title: "Urgent", value: totalData, variant: "urgent" },
  { title: "Districts", value: "64", variant: "default" },
  { title: "Hospitals", value: "450", variant: "default" },
];
  return (  
        <div className="container  mx-auto px-3 md:px-10">
            {/* Header */}
            <div  className="my-8 flex flex-col lg:flex-row justify-between items-center md:gap-4">
              {/* Left section */}
               <div>
          <div className="flex items-center gap-2 mb-1">
          <FaHeartbeat className="text-red-500" size={20} />
          <h1 className="text-2xl md:text-4xl font-extrabold text-default-900 tracking-tight">
            Blood Donation Requests
          </h1>
        </div>
        <p className="text-sm text-default-500">
          Browse all active blood donation requests and help save a life today.
        </p>
      </div>
              {/* Right Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {statsData.map((stats, index) => {
    // Determine if this specific card is the "Urgent" one
    const isUrgent = stats.variant === "urgent";

    return (
      <div 
  key={index} 
  className={`px-5 py-4 rounded-xl border transition-all duration-300 ${
    isUrgent 
      ? "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50" 
      : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
  }`}
>
  <p className={`text-[10px] font-bold tracking-widest uppercase mb-1 ${
    isUrgent 
      ? "text-rose-600 dark:text-rose-400" 
      : "text-slate-500 dark:text-slate-400"
  }`}>
    {stats.title}
  </p>
  <h3 className={`text-2xl font-black ${
    isUrgent 
      ? "text-rose-700 dark:text-rose-300" 
      : "text-slate-900 dark:text-white"
  }`}>
    {stats.value}
  </h3>
</div>
    );
  })}
</div>
            </div>
    {/* Card Container */}
     <div>
      <DonationRequestContainer donations={donations} totalData={totalData}></DonationRequestContainer>
     </div>
     {/* Pagination */}
      <div className='my-3'>
        <PaginationWithEllipsis totalData={totalData} donations={donations}></PaginationWithEllipsis>
       </div>
      </div>
    );
};

export default DonationRequest;