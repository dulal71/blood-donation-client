import FundingCheckoutModal from "@/component/FundingCheckoutModal";
import { PaginationWithEllipsis } from "@/component/Pagination";
import { fundingData } from "@/lib/api/fundingData";

import { getSession } from "@/lib/api/userSession";
import { Button, Modal } from "@heroui/react";
import { redirect } from "next/navigation";
import React from "react";
import { BiRocket } from "react-icons/bi";

function getInitials(name = "") {
  return name.split(" ").map((w) => w[0]).join("").substring(0, 2).toUpperCase();
}

const Funding =async ({searchParams}) => {
  const query = await searchParams;
  const page = query.page
  const {result:funding , totalFunding} = await fundingData(page)
  console.log(funding);
  const user = await getSession()
 
  return (
    <div className="max-w-6xl min-h-screen mx-auto p-6">
      {/* Header */}
     <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b pb-6">
  {/* Left Side: Title & Description */}
  <div className="space-y-1">
    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
      Blood Donation Funding
    </h1>
    <p className="text-gray-500 max-w-lg">
      Every contribution saves lives. View our recent donor records and join the mission to help those in need.
    </p>
  </div>

  {/* Right Side: Action Button */}
  <div className="flex-shrink-0">
    <div className="inline-flex items-center p-1 bg-gray-100 rounded-xl">
      <FundingCheckoutModal />
    </div>
  </div>
</div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
      <table className="w-full text-left border-collapse">
        <tbody>
          {funding.map((fund) => (
            <tr key={fund._id} className="border-b last:border-none hover:bg-gray-50 transition">
              {/* Name Column */}
              <td className="p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
               {  getInitials(fund.name)}
                </div>
                <span className="font-medium text-gray-700">{fund.name}</span>
              </td>

              {/* Amount Column */}
              <td className="p-4 font-bold text-gray-900">${fund.amount}</td>

              {/* Date Column */}
              <td className="p-4 text-gray-500">{fund.date}</td>

              {/* Status Column */}
              <td className="p-4">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  fund.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                  'bg-purple-100 text-purple-700'
                }`}>
                  {fund.status}
                </span>
              </td>

              {/* Options Column */}
              <td className="p-4 text-right text-gray-400">
                <button>⋮</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Footer */}
      <div className="p-4 border-t flex justify-between items-center text-sm text-gray-500">
        <PaginationWithEllipsis totalData={totalFunding}></PaginationWithEllipsis>
      </div>
    </div>
    </div>
  );
};

export default Funding;