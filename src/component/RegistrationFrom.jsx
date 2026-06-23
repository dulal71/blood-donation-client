"use client";

import React, { useState, useMemo, useRef } from "react";
import { 
  Form, 
  Fieldset, 
  TextField, 
  Label, 
  Input, 
  FieldError, 
  Select, 
  ListBox, 
  Button, 
  Card 
} from "@heroui/react";
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaMapMarkerAlt, 
  FaTint, 
  FaChevronDown, 
  FaEye, 
  FaEyeSlash,
  FaPhone,
  FaCloudUploadAlt
} from "react-icons/fa";

import { districtsData, upazilasData } from "@/data/geoData";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import Logo from "./Logo";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { uploadUserImage } from "@/lib/action/uploadImage";




// style
const textInputClass = "w-full bg-zinc-50 border border-zinc-200 hover:border-zinc-300 text-zinc-800 rounded-xl px-3 py-3 outline-none placeholder:text-zinc-400 focus:border-red-500 focus:ring-1 focus:ring-red-500/20 transition-all duration-200 text-sm shadow-sm";
const selectBoxClass = "w-full flex flex-col gap-1.5";
const triggerClasses = "w-full bg-zinc-50 border border-zinc-200 text-zinc-800 rounded-xl px-3 py-3 flex items-center justify-between outline-none data-[hover=true]:border-zinc-300 text-sm h-[46px] transition-all duration-200 cursor-pointer shadow-sm";
const popoverClasses = "bg-white border border-zinc-200 rounded-xl p-1.5 shadow-xl min-w-[200px] max-h-[280px] overflow-y-auto";
const listItemClasses = "text-zinc-600 px-3 py-2 rounded-lg cursor-pointer hover:bg-zinc-100 hover:text-zinc-900 outline-none data-[focused=true]:bg-zinc-100 data-[focused=true]:text-zinc-900 text-sm list-none transition-colors";
const nativeSelectClass = "w-full h-[46px] rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-700 pl-10 pr-4 outline-none hover:border-zinc-300 focus:border-red-500 focus:ring-1 focus:ring-red-500/20 transition-all appearance-none cursor-pointer text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-sm";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bloodGroup: "",
    district: "", 
    upazila: "",  
    password: "",
    confirm_password: ""
  });

  const [logoUrl, setLogoUrl] = useState(''); // ImgBB থেকে আসা ফাইনাল URL সেভ হবে
  const [isUploading, setIsUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
 const router = useRouter()
 const searchParams=useSearchParams()
 const redirectTo=searchParams.get('redirect') || "/"

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // Cascading Dynamic Filter for Upazilas using District ID 
  const filteredUpazilas = useMemo(() => {
    if (!formData.district) return [];
    return upazilasData.filter(
      (item) => String(item.district_id) === String(formData.district)
    );
  }, [formData.district]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, key) => {
    setFormData((prev) => ({
      ...prev,
      [name]: key,
    }));
  };


  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, logo: "File size exceeds 5MB limit" }));
      return;
    }

    setIsUploading(true);
    setErrors(prev => ({ ...prev, logo: null })); 
try {
      const imageUrl =await uploadUserImage(file)
      setLogoUrl(imageUrl); 
    toast.success("Image uploaded successfully!");
    } catch (err) {
      setErrors(prev => ({ ...prev, logo: "Network error during upload" }));
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit =async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name) newErrors.name = "Full name is required";
    if (!formData.email) newErrors.email = "Email address is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.bloodGroup) newErrors.bloodGroup = "Blood group is required";
    if (!formData.district) newErrors.district = "District is required";
    if (!formData.upazila) newErrors.upazila = "Upazila is required";
    if (!logoUrl) newErrors.logo = "Profile image is required"; // লোগো লিঙ্ক চেক
    
    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const selectedDistrictObj = districtsData.find(
      (d) => String(d.id) === String(formData.district)
    );
    const selectedUpazilaObj = upazilasData.find(
      (u) => String(u.id) === String(formData.upazila)
    );

    const finalSubmittedData = {
      ...formData,
      
      
      district: selectedDistrictObj ? selectedDistrictObj.name : "",
      upazila: selectedUpazilaObj ? selectedUpazilaObj.name : "",
      image: logoUrl 
    };
    setErrors({});
    console.log(finalSubmittedData);
    try{
const { data, error } = await authClient.signUp.email({
 ...finalSubmittedData,
 status:'active'
 
    })
    if(error){
      toast.error(error.message || "Something went wrong!");
    }else{
      toast.success("Registration successful:");
      router.push(redirectTo)
    }
    }catch(error){
console.error("Unexpected error:", error);
    }finally{

    }
  } 


  return (
    <div className="max-w-4xl mx-auto my-12 px-4">
      <Card className="rounded-2xl border border-zinc-100 bg-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        
        <Card.Content className="space-y-3">
          {/* form header */}
         
          <div  className="flex justify-between items-center">
            <div className="">
             <h2 className="text-2xl font-bold text-zinc-900 tracking-tight sm:text-3xl">
              Create an Account
            </h2>
            <p className="text-sm text-zinc-500 mt-1.5">
              Join our blood donation community today
            </p>
            </div>
            <div>
              <Logo></Logo>
            </div>
          </div>


 {/* main form */}
          <Form onSubmit={handleSubmit} className="space-y-2" validationErrors={errors} validationBehavior="aria">
            <Fieldset className="space-y-5 w-full">
              
              {/* NEW IMAGE UPLOAD FLOW */}
             <div className="flex flex-col items-center justify-center w-full pb-4 border-b border-zinc-100">
          <span className="text-zinc-500 font-semibold text-xs tracking-wide uppercase mb-3 self-start sm:self-center">
            Profile Image
          </span>
  
      <div className="flex flex-col items-center text-center gap-3">
    <label className="w-20 h-20 border-2 border-dashed border-zinc-300 hover:border-red-400 bg-zinc-50/50 rounded-full flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden shadow-sm">
      <input 
        type="file" 
        accept="image/png, image/jpeg" 
        onChange={handleLogoUpload} 
        className="hidden" 
        disabled={isUploading}
      />
      {logoUrl ? (
        <Image
        width={80}
        height={80}
          src={logoUrl} 
          alt="Logo Preview" 
          className={`w-full h-full object-cover rounded-full ${isUploading ? 'opacity-40' : ''}`} 
        />
      ) : (
        <FaCloudUploadAlt size={22} className="text-zinc-400 group-hover:text-red-500 transition-colors" />
      )}
    </label>
    
    <div className="flex flex-col items-center">
      <span className="text-sm font-medium text-zinc-700">
        {isUploading ? 'Uploading file...' : logoUrl ? 'Change image' : 'Upload image'}
      </span>
      <span className="text-xs text-zinc-400 mt-0.5">PNG, JPG up to 5MB</span>
      {errors.logo && <span className="text-xs text-red-500 font-medium mt-1">{errors.logo}</span>}
    </div>
  </div>
</div>
{/* Name , Email */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
 <TextField name="name" isInvalid={!!errors.name} className="flex flex-col gap-1.5 w-full">
                  <Label className="text-zinc-500 font-semibold text-xs tracking-wide uppercase">Full Name</Label>
                  <div className="relative flex items-center">
                    <FaUser size={13} className="absolute left-3 text-zinc-400 pointer-events-none z-10" />
                    <Input type="text" placeholder="Enter your full name" value={formData.name} onChange={handleChange} className={`${textInputClass} pl-10`} />
                  </div>
                  {errors.name && <FieldError className="text-xs text-red-500 font-medium mt-1">{errors.name}</FieldError>}
                </TextField>
 <TextField name="email" isInvalid={!!errors.email} className="flex flex-col gap-1.5 w-full">
                  <Label className="text-zinc-500 font-semibold text-xs tracking-wide uppercase">Email Address</Label>
                  <div className="relative flex items-center">
                    <FaEnvelope size={13} className="absolute left-3 text-zinc-400 pointer-events-none z-10" />
                    <Input type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} className={`${textInputClass} pl-10`} />
                  </div>
                  {errors.email && <FieldError className="text-xs text-red-500 font-medium mt-1">{errors.email}</FieldError>}
                </TextField>
</div>
   
   {/* phone and blood group           */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <TextField name="phone" isInvalid={!!errors.phone} className="flex flex-col gap-1.5 w-full">
                  <Label className="text-zinc-500 font-semibold text-xs tracking-wide uppercase">Phone Number</Label>
                  <div className="relative flex items-center">
                    <FaPhone size={13} className="absolute left-3 text-zinc-400 pointer-events-none z-10" />
                    <Input type="number" placeholder="Enter phone number" value={formData.phone} onChange={handleChange} className={`${textInputClass} pl-10`} />
                  </div>
                  {errors.phone && <FieldError className="text-xs text-red-500 font-medium mt-1">{errors.phone}</FieldError>}
                </TextField>
                <div className={selectBoxClass}>
  <div className="flex flex-col gap-1.5 w-full">
  <label className="text-zinc-500 font-semibold text-xs tracking-wide uppercase">Blood Group</label>
  <div className="relative flex items-center "> 
    <FaTint size={13} className="absolute left-3 text-red-500 pointer-events-none z-10" />
    <select
      name="bloodGroup"
      value={formData.bloodGroup}
      onChange={(e) => setFormData((prev) => ({ ...prev, bloodGroup: e.target.value }))}
      className={`${textInputClass} pl-10 appearance-none w-full h-full`} // textInputClass ব্যবহার করা হয়েছে
    >
      <option value="" disabled>Select Blood Group</option>
      {bloodGroups.map((group) => (
        <option key={group} value={group}>{group}</option>
      ))}
    </select>
    <FaChevronDown size={12} className="absolute right-3 text-zinc-400 pointer-events-none" />
  </div>
</div>
</div>
      </div>         
   {/* district   and upazila        */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
 <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-500 tracking-wide uppercase">District</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 z-10 pointer-events-none" />
                    <select
                      value={formData.district}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          district: e.target.value,
                          upazila: "", 
                        }))
                      }
                      className={nativeSelectClass}
                    >
                      <option value="">Select District</option>
                      {districtsData.map((district) => (
                        <option key={district.id} value={district.id}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                    <FaChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                  </div>
                </div>
       <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-500 tracking-wide uppercase">Upazila</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 z-10 pointer-events-none" />
                    <select
                      value={formData.upazila}
                      disabled={!formData.district}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          upazila: e.target.value,
                        }))
                      }
                      className={nativeSelectClass}
                    >
                      <option value="">Select Upazila</option>
                      {filteredUpazilas.map((upazila) => (
                        <option key={upazila.id} value={upazila.id}>
                          {upazila.name}
                        </option>
                      ))}
                    </select>
                    <FaChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                  </div>
                </div>         
</div>

   {/* PASSWORD ROW */}

<div className="grid grid-cols-1 md:grid-cols-2 gap-3">


<TextField name="password" className="flex flex-col gap-1.5 w-full">
                  <Label className="text-zinc-500 font-semibold text-xs tracking-wide uppercase">Password</Label>
                  <div className="relative flex items-center">
                    <FaLock size={13} className="absolute left-3 text-zinc-400 pointer-events-none z-10" />
                    <Input type={showPassword ? "text" : "password"} name="password" placeholder="Enter password" value={formData.password} onChange={handleChange} className={`${textInputClass} pl-10 pr-10`} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 text-zinc-400 hover:text-zinc-600 transition-colors z-10">
                      {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                    </button>
                  </div>
                </TextField>
     <TextField name="confirm_password" isInvalid={!!errors.confirm_password} className="flex flex-col gap-1.5 w-full">
                  <Label className="text-zinc-500 font-semibold text-xs tracking-wide uppercase">Confirm Password</Label>
                  <div className="relative flex items-center">
                    <FaLock size={13} className="absolute left-3 text-zinc-400 pointer-events-none z-10" />
                    <Input type={showConfirmPassword ? "text" : "password"} name="confirm_password" placeholder="Confirm password" value={formData.confirm_password} onChange={handleChange} className={`${textInputClass} pl-10 pr-10`} />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 text-zinc-400 hover:text-zinc-600 transition-colors z-10">
                      {showConfirmPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                    </button>
                  </div>
                  {errors.confirm_password && <FieldError className="text-xs text-red-500 font-medium mt-1">{errors.confirm_password}</FieldError>}
                </TextField>            
</div>
               
 </Fieldset>

            <Button type="submit" className="w-full bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-semibold rounded-xl h-12 transition-all duration-200 shadow-md shadow-red-500/20 mt-4 text-sm">
              Complete Registration
            </Button>
          </Form>
        </Card.Content>
      </Card>
    </div>
  );
}