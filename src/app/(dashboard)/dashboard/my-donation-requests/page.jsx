import DonationRequestTable from "@/component/DonationRequestTable";
import EmptyMessage from "@/component/EmptyMessage";
import { PaginationWithEllipsis } from "@/component/Pagination";
import StatusFilter from "@/component/StatusFilter";
import { getDonationByUserId } from "@/lib/api/userDonations";
import { getSession } from "@/lib/api/userSession";
import { FaHandHoldingHeart } from "react-icons/fa";


const MyDonationRequest =async ({searchParams}) => {
  const query = await searchParams
  
    const page  = query?.page || 1;
  const status=query.status
    const user = await getSession() 
  
  const data = await getDonationByUserId(user?.id,status,page)
   const {result: donations = [],totalData = 0} =data || {}
   console.log(donations);
   return (
        <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-8">

      {/* ── Title Section / Filter ─────────────────────────────────────────────── */}
      
      <div className="flex justify-between items-center flex-col md:flex-row mb-2">
          <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-100 text-red-500">
            <FaHandHoldingHeart size={18} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            My Donation Requests
          </h1>
        </div>
        <p className="text-sm text-gray-500 ml-13 pl-0.5">
          You have made{" "}
           <span className="font-semibold text-red-500">
            {totalData ?? 0} donation{" "}
            {totalData=== 1 ? "request" : "requests"}
          </span>{" "}
          so far. Track and manage them below.
        </p>
          </div>
          <div>
          <StatusFilter></StatusFilter>
          </div>
      </div>
     

      {/* ── Table / Empty ─────────────────────────────────────────────── */}
    <div>
 {donations.length > 0
        ? <DonationRequestTable donations={donations}  />
        : <EmptyMessage />
      }
    </div>
     <div>
      {
        donations.length > 0 && <PaginationWithEllipsis donations={donations} totalData={totalData}></PaginationWithEllipsis>
      }
      
     </div>

    </div>
    );
};

export default MyDonationRequest;