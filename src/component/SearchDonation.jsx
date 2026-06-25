'use client'

import { districtsData, upazilasData } from "@/data/geoData";
import { useEffect, useMemo, useState } from "react";
import { FaMapMarkerAlt, FaTint } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { FiSearch } from "react-icons/fi"; // একটি নতুন সার্চ আইকন যুক্ত করলাম
import { useRouter } from "next/navigation";


const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function FormSelect({ label, icon: Icon, name, value, onChange, options, placeholder, required }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</label>
      <div className="relative flex items-center">
        {Icon && <span className="absolute left-3 text-gray-400"><Icon size={16} /></span>}
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm appearance-none"
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

const SearchDonation = () => {
  const [search, setSearch] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
 const router = useRouter()
 const districtOptions = useMemo(() => 
    districtsData.map((d) => ({ value: d.id, label: d.name })), 
  []);
 
  const upazilOptions = useMemo(() => 
    district ? upazilasData.filter((u) => u.district_id === district).map((u) => ({ value: u.id, label: u.name })) : [], 
  [district]);
  const districtName = districtsData.find(d => d.id === district)?.name;
const upazilaName = upazilasData.find(u => u.id === upazila)?.name;
const handleSearch = () => {
  console.log(districtName);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (districtName) params.set('district', districtName);
    if (upazilaName) params.set('upazila', upazilaName);
    if (bloodGroup) params.set('bloodGroup', bloodGroup);
    
    router.push(`?${params.toString()}`, { scroll: false }); // scroll: false দিলে পেজ লাফাবে না
};

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Potential Donors</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Search Input */}
        <div className="lg:col-span-1 flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Search</label>
          <div className="relative flex items-center">
            <FiSearch className="absolute left-3 text-gray-400" size={16} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Donor name..." 
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm"
            />
          </div>
        </div>

        <FormSelect label="District" placeholder="Select District" value={district} onChange={(e) => { setDistrict(e.target.value); setUpazila(''); }} options={districtOptions} icon={MdLocationOn} />
        <FormSelect label="Upazila" placeholder="Select Upazila" value={upazila} onChange={(e) => setUpazila(e.target.value)} options={upazilOptions} icon={FaMapMarkerAlt} />
        <FormSelect label="Blood Group" placeholder="Blood Group" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} options={BLOOD_GROUPS.map((b) => ({ value: b, label: b }))} icon={FaTint} />
      </div>

      <button
      onClick={handleSearch}
       className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-red-200">
        Search Donors Now
      </button>
    </div>
  );
};

export default SearchDonation;