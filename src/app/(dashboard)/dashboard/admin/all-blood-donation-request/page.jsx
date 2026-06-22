import AllDonationRequestTable from "@/component/AllDonationRequestTable";
import StatusFilter from "@/component/StatusFilter";
import { getDonations } from "@/lib/api/dontion";
import { MdBloodtype } from "react-icons/md";


const AllDonationRequest =async () => {
      const {result:donations , total} = await getDonations();
    return (
        <div className="bg-gray-50 min-h-screen p-5">
            {/* title */}
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
<div className="mb-6">
      <div className="flex items-center gap-2">
        <MdBloodtype className="text-red-500 text-2xl" />
        <h1 className="text-2xl font-bold text-gray-900">
          Donation Requests Dashboard
        </h1>
      </div>

      <p className="text-sm text-gray-500 mt-1">
        View, manage and track all donation requests in one place.
      </p>
    </div>
                </div>

                {/* filter */}
                <div>
               <StatusFilter></StatusFilter>
                </div>
           
            </div>
             
    <div>
          <AllDonationRequestTable donations={donations} total={total}></AllDonationRequestTable> 
    </div>

        </div>
    );
};

export default AllDonationRequest;