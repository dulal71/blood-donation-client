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

const SearchDonation = ({query}) => {
 
  const [search, setSearch] = useState(query.search);
  const [bloodGroup, setBloodGroup] = useState(query.bloodGroup);
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
  
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (districtName) params.set('district', districtName);
    if (upazilaName) params.set('upazila', upazilaName);
    if (bloodGroup) params.set('bloodGroup', bloodGroup);
    const path = `?${params.toString()}` 
    router.push(path)
};

  return (
  <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 max-w-6xl mx-auto">
  <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Potential Donors</h2>
  
  {/* Grid layout: 1 column on mobile/tablet, and switches to 5 columns on large desktop screens to fit the button in the same line */}
  <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-end">
    
    {/* Search Input (takes 1 column on desktop) */}
    <div className="flex flex-col gap-1.5">
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

    {/* Dropdown filters (take 1 column each on desktop) */}
    <FormSelect 
      label="District" 
      placeholder="Select District" 
      value={district} 
      onChange={(e) => { setDistrict(e.target.value); setUpazila(''); }} 
      options={districtOptions} 
      icon={MdLocationOn} 
    />
    <FormSelect 
      label="Upazila" 
      placeholder="Select Upazila" 
      value={upazila} 
      onChange={(e) => setUpazila(e.target.value)} 
      options={upazilOptions} 
      icon={FaMapMarkerAlt} 
    />
    <FormSelect 
      label="Blood Group" 
      placeholder="Blood Group" 
      value={bloodGroup} 
      onChange={(e) => setBloodGroup(e.target.value)} 
      options={BLOOD_GROUPS.map((b) => ({ value: b, label: b }))} 
      icon={FaTint} 
    />

    {/* Search Button (takes 1 column on desktop and aligns perfectly with inputs) */}
    <button
      onClick={handleSearch}
      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-red-200 h-[46px] cursor-pointer"
    >
      Search
    </button>
  </div>

</div>
  );
};

export default SearchDonation;