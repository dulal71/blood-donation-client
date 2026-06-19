'use client'

import { useEffect, useState } from "react";
import DonationCard from "./DonationCard";
import { PaginationWithEllipsis } from "./Pagination";
import { useRouter } from "next/navigation";
import EmptyMessage from "./EmptyMessage";


const DonationRequestContainer = ({donations}) => {
    const [page,setPage]=useState(1)
const router = useRouter()

    useEffect(()=>{
     const params = new URLSearchParams()
     if(page){
        params.set('page',page)
     }
     const path= `?${params.toString()}`
     router.push(path)
    },[page])
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
        <PaginationWithEllipsis page={page} setPage={setPage} donations={donations}></PaginationWithEllipsis>
       </div>  
    </div>  
:<EmptyMessage></EmptyMessage> 
        }
 </>
        
    );
};

export default DonationRequestContainer;