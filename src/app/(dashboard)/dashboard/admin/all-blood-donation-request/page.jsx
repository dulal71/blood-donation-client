import AllDonationRequest from "@/component/AllDonationRequest";
import StatusFilter from "@/component/StatusFilter";
import { getDonations, getDonationsForAdmin } from "@/lib/api/dontion";
import { MdBloodtype } from "react-icons/md";


const DonationRequest =async ({searchParams}) => {
     const query = await searchParams
  
    const page  = query?.page || 1;
  const status=query.status

    const {result:donations , totalData} = await getDonationsForAdmin(status,page);
    return (
      <div>
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

        </div>
<AllDonationRequest donations={donations} totalData={totalData}></AllDonationRequest>
      </div>  
    );
};

export default DonationRequest;