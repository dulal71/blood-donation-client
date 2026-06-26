import FundingCheckoutModal from "@/component/FundingCheckoutModal";
import { PaginationWithEllipsis } from "@/component/Pagination";
import { fundingData } from "@/lib/api/fundingData";
import { getSession } from "@/lib/api/userSession";
import React from "react";

function getInitials(name = "") {
  return name.split(" ").map((w) => w[0]).join("").substring(0, 2).toUpperCase();
}

const Funding = async ({ searchParams }) => {
  const query = await searchParams;
  const page = query.page || 1;
  const { result: funding, totalFunding } = await fundingData(page);

  return (
 
<div className="w-full min-h-screen px-4 md:px-6 py-4 md:py-6">
  <div className="max-w-6xl mx-auto">

    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b pb-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Blood Donation Funding</h1>
        <p className="text-gray-500 max-w-lg">Every contribution saves lives. View our recent donor records and join the mission.</p>
      </div>
      <div className="flex-shrink-0">
        <FundingCheckoutModal />
      </div>
    </div>

    {/* Table Container */}
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-700">Donor Name</th>
              <th className="p-4 text-sm font-semibold text-gray-700">Amount</th>
              <th className="p-4 text-sm font-semibold text-gray-700">Date</th>
              <th className="p-4 text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {funding.map((fund) => (
              <tr key={fund._id} className="hover:bg-gray-50 transition">
                <td className="p-4 flex items-center gap-3 whitespace-nowrap">
                  <div className="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                    {getInitials(fund.name)}
                  </div>
                  <span className="font-medium text-gray-700">{fund.name}</span>
                </td>
                <td className="p-4 font-bold text-gray-900 text-sm whitespace-nowrap">${fund.amount}</td>
                <td className="p-4 text-gray-500 text-sm whitespace-nowrap">{fund.date}</td>
                <td className="p-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded text-xs font-semibold inline-block ${
                    fund.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {fund.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination — table card-এর ভেতরে রাখুন */}
      <div className="p-4 border-t flex justify-center items-center">
        <PaginationWithEllipsis totalData={totalFunding} />
      </div>
    </div>

  </div>
</div>
  );
};

export default Funding;