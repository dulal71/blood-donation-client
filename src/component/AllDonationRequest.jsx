import { getDonations } from "@/lib/api/dontion";
import { MdBloodtype } from "react-icons/md";

import AllDonationRequestTable from "./AllDonationRequestTable";
import { PaginationWithEllipsis } from "./Pagination";
import StatusFilter from "./StatusFilter";


const AllDonationRequest =async ({donations, totalData}) => {
     
    return (
        <div className="bg-gray-50 min-h-screen p-5">
            
       {/* Table       */}
    <div>
          <AllDonationRequestTable donations={donations} total={totalData}></AllDonationRequestTable> 
    </div>
    {/* Pagination */}
    <div>
     <PaginationWithEllipsis totalData={totalData}></PaginationWithEllipsis>   
    </div>

        </div>
    );
};

export default AllDonationRequest;