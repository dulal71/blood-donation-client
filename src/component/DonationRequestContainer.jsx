


import DonationCard from "./DonationCard";
import { PaginationWithEllipsis } from "./Pagination";

import EmptyMessage from "./EmptyMessage";


const DonationRequestContainer = ({donations,totalData}) => {
  

    
    return (
        <>
         {
     donations.length > 0 ?
    <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {
            donations.map(donation => <DonationCard key={donation._id}  request={donation}></DonationCard>)
        }
        </div>
       <div className='my-3'>
        <PaginationWithEllipsis totalData={totalData} donations={donations}></PaginationWithEllipsis>
       </div>  
    </div>  
:<EmptyMessage></EmptyMessage> 
        }
 </>
        
    );
};

export default DonationRequestContainer;