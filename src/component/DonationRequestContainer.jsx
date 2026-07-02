'use client'
import { useState } from "react";
import DonationCard from "./DonationCard";
import EmptyMessage from "./EmptyMessage";
import { ViewToggle } from "./ViewToggle";
const DonationRequestContainer = ({donations,totalData}) => {
 const [viewMode, setViewMode] = useState('grid'); 
    return (
        <div>
        {/* Header section */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-slate-600 font-medium">{totalData} Request Found</p>
        <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>
        
         {
     donations.length > 0 ?
    <div>
          <div className={`
           ${ viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'
          : "space-y-4 max-w-3xl mx-auto"} `}>
        {
            donations.map(donation => <DonationCard key={donation._id}  request={donation}></DonationCard>)
        }
        </div>
         
    </div>  
:<EmptyMessage></EmptyMessage> 
        }
 </div>
        
    );
};

export default DonationRequestContainer;