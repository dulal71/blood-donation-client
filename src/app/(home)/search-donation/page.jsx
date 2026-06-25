

import SearchDonation from '@/component/SearchDonation';
import { getDonations } from '@/lib/api/dontion';

import DonationRequestContainer from '@/component/DonationRequestContainer';



const SearchPage =async ({searchParams}) => {
  const query = await searchParams
 
  const page = query.page
  const search = query.search;
  const district = query.district;
  const upazila=query.upazila;
  const  bloodGroup=query.bloodGroup
 const {result:donations =[] ,totalData = 0} =await getDonations('pending',page,search,district,upazila,bloodGroup)
console.log(bloodGroup);
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Find a Donation  Nearby</h1>
          <p className="text-gray-600">Filter by location and blood group to find donors instantly.</p>
        </div>

        {/* Search & Filter Section */}
       <SearchDonation query={query}></SearchDonation>
      <div className='mt-10'>
       <DonationRequestContainer donations={donations} totalData={totalData}></DonationRequestContainer>
      </div>
      </div>
    </div>
  );
};

export default SearchPage;