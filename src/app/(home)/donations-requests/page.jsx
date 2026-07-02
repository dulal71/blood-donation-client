
import DonationRequestContainer from '@/component/DonationRequestContainer';
import { PaginationWithEllipsis } from '@/component/Pagination';


import { getDonations } from '@/lib/api/dontion';
import React from 'react';
import { FaHeartbeat } from 'react-icons/fa';

const DonationRequest =async ({searchParams}) => {
   const query=await searchParams
  
  const data = await getDonations("pending",query.page)
const {result : donations = [], totalData = 0} =data || {}
console.log(donations);
    return (
        <div className="container  mx-auto px-3 md:px-10">
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
      <div className='my-3'>
        <PaginationWithEllipsis totalData={totalData} donations={donations}></PaginationWithEllipsis>
       </div>
        </div>
    );
};

export default DonationRequest;