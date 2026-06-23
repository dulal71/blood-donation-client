import AllDonationRequestTable from "./AllDonationRequestTable";
import { PaginationWithEllipsis } from "./Pagination";
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