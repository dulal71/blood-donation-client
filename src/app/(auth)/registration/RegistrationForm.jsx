"use client";

import React, { useState, useMemo } from "react";
import { Form,  Button, Card, Input } from "@heroui/react";
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt, FaTint, FaChevronDown, FaEye, FaEyeSlash, FaPhone, FaCloudUploadAlt } from "react-icons/fa";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import Logo from "@/component/Logo";
import TextInput from "@/component/auth/TextInput";
import validateSignup from "@/component/auth/validateSignup";
import userSignup from "@/lib/authService/userSignup";
import { districtsData, upazilasData } from "@/data/geoData";
import useUserSignup from "@/lib/authService/userSignup";

export default function RegistrationForm() {
  const {signup , isLoading}=useUserSignup()
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || "/";

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", bloodGroup: "",
    district: "", upazila: "", password: "", confirm_password: ""
  });

  const [logoUrl, setLogoUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const filteredUpazilas = useMemo(() => {
    return upazilasData.filter((u) => String(u.district_id) === String(formData.district));
  }, [formData.district]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
        ...prev, 
        [name]: value,
        ...(name === 'district' ? { upazila: '' } : {}) 
    }));
    setErrors(prev => ({
   ...prev,
   [name]: ""
}))
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, logo: "File size exceeds 5MB limit" }));
      return;
    }

    setIsUploading(true);
    try {
      const imageUrl = await uploadUserImage(file);
      setLogoUrl(imageUrl);
      toast.success("Image uploaded successfully!");
      setErrors(prev=> ({...prev,logo:''}))
    } catch (err) {
      setErrors(prev => ({ ...prev, logo: "Network error during upload" }));
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     setIsSubmitting(true);
    const errors= validateSignup({
     formData, logoUrl
    })
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const finalSubmittedData = {
      ...formData,
      status:'active',
      district: districtsData.find(d => String(d.id) === String(formData.district))?.name || "",
      upazila: upazilasData.find(u => String(u.id) === String(formData.upazila))?.name || "",
      image: logoUrl 
    };
try{
 await signup({finalSubmittedData,redirectTo})
}catch(error){
 console.log(error.message || "Registration failed!");
}finally{
    setIsSubmitting(false);

}
   
  };

  const inputStyle = "w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 pl-10 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/20 text-sm";

  return (
    <div className="w-full md:max-w-3xl mx-auto my-12 px-4">
      <div className="rounded-2xl border border-zinc-100 bg-white p-8 shadow-xl">
        <div className="flex justify-between items-center mb-6">
           <div>
             <h2 className="text-2xl font-bold">Create an Account</h2>
             <p className="text-sm text-zinc-500">Join our blood donation community</p>
           </div>
           <Logo />
        </div>

        <Form onSubmit={handleSubmit} className=" space-y-5">
           {/* Image Upload */}
           <div className="flex flex-col items-center border-b pb-6">
              <label className="w-20 h-20 border-2 border-dashed border-zinc-300 rounded-full flex items-center justify-center cursor-pointer hover:border-red-400">
                <input type="file" className="hidden" onChange={handleLogoUpload} disabled={isUploading} />
                {logoUrl ? <Image src={logoUrl} width={80} height={80} alt="profile" className="rounded-full w-full h-full object-cover" /> : <FaCloudUploadAlt size={24} />}
              </label>
              {errors.logo && <p className="text-red-500 text-xs mt-2">{errors.logo}</p>}
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput label="Full Name" icon={FaUser} error={errors.name}><Input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className={inputStyle} /></TextInput>
              <TextInput label="Email" icon={FaEnvelope} error={errors.email}><Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className={inputStyle} /></TextInput>
              <TextInput  label="Phone" icon={FaPhone} error={errors.phone}><Input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className={inputStyle} /></TextInput>
              <TextInput  label="Blood Group" icon={FaTint} error={errors.bloodGroup}>
                 <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className={`${inputStyle} appearance-none`}>
                   <option value="">Select Group</option>
                   {bloodGroups.map(g => <option key={g} value={g}>{g}</option>)}
                 </select>
              </TextInput>
              <TextInput  label="District" icon={FaMapMarkerAlt} error={errors.district}>
                 <select name="district" value={formData.district} onChange={handleChange} className={`${inputStyle} appearance-none`}>
                   <option value="">Select District</option>
                   {districtsData.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                 </select>
              </TextInput>
              <TextInput  label="Upazila" icon={FaMapMarkerAlt} error={errors.upazila}>
                 <select name="upazila" value={formData.upazila} disabled={!formData.district} onChange={handleChange} className={`${inputStyle} appearance-none`}>
                   <option value="">Select Upazila</option>
                   {filteredUpazilas.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                 </select>
              </TextInput>
              <TextInput  label="Password" icon={FaLock}>
                 <Input name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} className={inputStyle} />
                 <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 text-zinc-400">{showPassword? <FaEyeSlash/>: <FaEye/>}</button>
              </TextInput>
              <TextInput  label="Confirm Password" icon={FaLock} error={errors.confirm_password}>
                 <Input name="confirm_password" type={showConfirmPassword ? "text" : "password"} value={formData.confirm_password} onChange={handleChange} className={inputStyle} />
              </TextInput>
           </div>

           <Button type="submit"
            isLoading={isLoading}
            isDisabled={isLoading}
            className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl h-12">Complete Registration</Button>
        </Form>
      </div>
    </div>
  );
}