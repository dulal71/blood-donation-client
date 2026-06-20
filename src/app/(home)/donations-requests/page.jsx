
import DonationRequestContainer from '@/component/DonationRequestContainer';


import { getDonations } from '@/lib/api/dontion';
import React from 'react';
import { FaHeartbeat } from 'react-icons/fa';

const DonationRequest =async ({searchParams}) => {
   const query=await searchParams
  
  const data = await getDonations("pending",query.page)
const {result : donations = [], totalData = 0} =data || {}
console.log(donations);
    return (
        <div className="w-8/12 mx-auto">
           <div className="my-8">
        <div className="flex items-center gap-2 mb-1">
          <FaHeartbeat className="text-red-500" size={20} />
          <h1 className="text-2xl md:text-4xl font-extrabold text-default-900 tracking-tight">
            Pending Donation Requests
          </h1>
        </div>
        <p className="text-sm text-default-500">
          Browse all active blood donation requests and help save a life today.
        </p>
      </div>
     
     <div>
      <DonationRequestContainer donations={donations} totalData={totalData}></DonationRequestContainer>
     </div>
      
        </div>
    );
};

export default DonationRequest;