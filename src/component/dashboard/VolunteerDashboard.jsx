import { getDonations } from '@/lib/api/dontion';
import React from 'react';
import { FaDonate, FaTint, FaUsers } from 'react-icons/fa';

const VolunteerDashboard =async ({user}) => {
   
    const {result:donations} = await getDonations();
  
  
    const totalDonations = donations?.length 
    const funding = 10000;
  
    return (
      <div className=" max-w-7xl mx-auto p-6 space-y-6">
  
        {/* Welcome Section */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {user?.name || "Admin"} 
          </h1>
          <p className="text-gray-500 mt-1">
           <span className={`font-bold  ${user.role === 'admin' ?'text-red-600' : 'text-green-600'}`}>{user.role.toUpperCase()}</span> Dashboard Overview.
          </p>
        </div>
  
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Total Users */}
        <div className="bg-blue-50 p-6 rounded-xl shadow flex items-center gap-4">
          <FaUsers className="text-blue-600 text-3xl" />
          <div>
            <p className="text-gray-500">Total Donors</p>
            <h2 className="text-2xl font-bold">100+</h2>
          </div>
        </div>
          
  
          {/* Funding */}
          <div className="bg-green-50 p-6 rounded-xl shadow flex items-center gap-4">
            <FaDonate className="text-amber-600 text-3xl" />
            <div>
              <p className="text-gray-500">Total Funding</p>
              <h2 className="text-2xl font-bold">${funding}</h2>
            </div>
          </div>
  
          {/* Donation Requests */}
          <div className="bg-red-50 p-6 rounded-xl shadow flex items-center gap-4">
            <FaTint className="text-red-600 text-3xl" />
            <div>
              <p className="text-gray-500">Blood Donation Requests</p>
              <h2 className="text-2xl font-bold">{totalDonations}</h2>
            </div>
          </div>
  
        </div>
      </div>
    );
};

export default VolunteerDashboard;