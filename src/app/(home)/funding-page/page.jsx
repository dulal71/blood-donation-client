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
    <div className="max-w-6xl min-h-screen mx-auto p-4 md:p-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b pb-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Blood Donation Funding
          </h1>
          <p className="text-gray-500 max-w-lg">
            Every contribution saves lives. View our recent donor records and join the mission.
          </p>
        </div>
        <div className="flex-shrink-0">
          <FundingCheckoutModal />
        </div>
      </div>

      {/* Table Container - overflow-hidden নিশ্চিত করবে যেন কিছু বাইরে না যায় */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        {/* table-fixed ব্যবহার করা হয়েছে যেন টেবিল কন্টেইনারের বাইরে না যায় */}
        <table className="w-full table-fixed text-left border-collapse">
          <tbody className="divide-y divide-gray-100">
            {funding.map((fund) => (
              <tr key={fund._id} className="hover:bg-gray-50 transition">
                {/* Name: ফ্লেক্সিবল উইডথ কিন্তু truncate করা */}
                <td className="p-3 md:p-4 truncate flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                    {getInitials(fund.name)}
                  </div>
                  <span className="font-medium text-gray-700 truncate">{fund.name}</span>
                </td>

                {/* Amount: ছোট উইডথ */}
                <td className="p-3 md:p-4 font-bold text-gray-900 text-sm truncate">
                  ${fund.amount}
                </td>

                {/* Date: লুকানো মোবাইল ভিউতে বা ছোট রাখা */}
                <td className="p-3 md:p-4 text-gray-500 text-xs md:text-sm hidden md:table-cell">
                  {fund.date}
                </td>

                {/* Status: ছোট রাখা */}
                <td className="p-3 md:p-4">
                  <span className={`px-2 py-1 rounded text-[10px] md:text-xs font-semibold truncate block w-fit ${
                    fund.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {fund.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Footer */}
        <div className="p-4 border-t flex justify-center items-center">
          <PaginationWithEllipsis totalData={totalFunding} />
        </div>
      </div>
    </div>
  );
};

export default Funding;