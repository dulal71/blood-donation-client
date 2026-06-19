import DonationCard from '@/component/DonationCard';
import { getDonations } from '@/lib/api/dontion';
import React from 'react';
import { FaHeartbeat } from 'react-icons/fa';

const DonationRequest =async () => {
    const donations = await getDonations("pending")
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
     
     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {
            donations.map(donation => <DonationCard key={donation._id}  request={donation}></DonationCard>)
        }
        </div>   
        </div>
    );
};

export default DonationRequest;