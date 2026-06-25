"use client";

import React, { useState, useMemo } from "react";
import { Form, Fieldset, Button, Card, Label, Input, FieldError } from "@heroui/react";
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt, FaTint, FaChevronDown, FaEye, FaEyeSlash, FaPhone, FaCloudUploadAlt } from "react-icons/fa";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { districtsData, upazilasData } from "@/data/geoData";
import { authClient } from "@/lib/auth-client";
import { uploadUserImage } from "@/lib/action/uploadImage";
import Logo from "./Logo";


const FormField = ({ label, icon: Icon, children, error, required }) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-xs font-semibold text-zinc-500 tracking-wide uppercase">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative flex items-center">
      {Icon && <span className="absolute left-3 text-zinc-400 pointer-events-none z-10"><Icon size={13} /></span>}
      {children}
    </div>
    {error && <FieldError className="text-xs text-red-500 font-medium">{error}</FieldError>}
  </div>
);

export default function RegistrationForm() {
  const router = useRouter();
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
    } catch (err) {
      setErrors(prev => ({ ...prev, logo: "Network error during upload" }));
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.bloodGroup) newErrors.bloodGroup = "Blood group is required";
    if (!formData.district) newErrors.district = "District is required";
    if (!formData.upazila) newErrors.upazila = "Upazila is required";
    if (!logoUrl) newErrors.logo = "Profile image is required";
    if (formData.password !== formData.confirm_password) newErrors.confirm_password = "Passwords do not match!";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const finalSubmittedData = {
      ...formData,
      status:'active',
      district: districtsData.find(d => String(d.id) === String(formData.district))?.name || "",
      upazila: upazilasData.find(u => String(u.id) === String(formData.upazila))?.name || "",
      image: logoUrl 
    };

    try {
      const { data, error } = await authClient.signUp.email({ ...finalSubmittedData, status: 'active' });
      if (error) {
        toast.error(error.message || "Registration failed!");
      } else {
        toast.success("Registration successful!");
        router.push(redirectTo);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const inputStyle = "w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 pl-10 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/20 text-sm";

  return (
    <div className="max-w-4xl mx-auto my-12 px-4">
      <Card className="rounded-2xl border border-zinc-100 bg-white p-8 shadow-xl">
        <div className="flex justify-between items-center mb-6">
           <div>
             <h2 className="text-2xl font-bold">Create an Account</h2>
             <p className="text-sm text-zinc-500">Join our blood donation community</p>
           </div>
           <Logo />
        </div>

        <Form onSubmit={handleSubmit} className="space-y-5">
           {/* Image Upload */}
           <div className="flex flex-col items-center border-b pb-6">
              <label className="w-20 h-20 border-2 border-dashed border-zinc-300 rounded-full flex items-center justify-center cursor-pointer hover:border-red-400">
                <input type="file" className="hidden" onChange={handleLogoUpload} disabled={isUploading} />
                {logoUrl ? <Image src={logoUrl} width={80} height={80} alt="profile" className="rounded-full w-full h-full object-cover" /> : <FaCloudUploadAlt size={24} />}
              </label>
              {errors.logo && <p className="text-red-500 text-xs mt-2">{errors.logo}</p>}
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Full Name" icon={FaUser} error={errors.name}><Input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className={inputStyle} /></FormField>
              <FormField label="Email" icon={FaEnvelope} error={errors.email}><Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className={inputStyle} /></FormField>
              <FormField label="Phone" icon={FaPhone} error={errors.phone}><Input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className={inputStyle} /></FormField>
              <FormField label="Blood Group" icon={FaTint} error={errors.bloodGroup}>
                 <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className={`${inputStyle} appearance-none`}>
                   <option value="">Select Group</option>
                   {bloodGroups.map(g => <option key={g} value={g}>{g}</option>)}
                 </select>
              </FormField>
              <FormField label="District" icon={FaMapMarkerAlt} error={errors.district}>
                 <select name="district" value={formData.district} onChange={handleChange} className={`${inputStyle} appearance-none`}>
                   <option value="">Select District</option>
                   {districtsData.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                 </select>
              </FormField>
              <FormField label="Upazila" icon={FaMapMarkerAlt} error={errors.upazila}>
                 <select name="upazila" value={formData.upazila} disabled={!formData.district} onChange={handleChange} className={`${inputStyle} appearance-none`}>
                   <option value="">Select Upazila</option>
                   {filteredUpazilas.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                 </select>
              </FormField>
              <FormField label="Password" icon={FaLock}>
                 <Input name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} className={inputStyle} />
                 <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 text-zinc-400"><FaEyeSlash /></button>
              </FormField>
              <FormField label="Confirm Password" icon={FaLock} error={errors.confirm_password}>
                 <Input name="confirm_password" type={showConfirmPassword ? "text" : "password"} value={formData.confirm_password} onChange={handleChange} className={inputStyle} />
              </FormField>
           </div>

           <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl h-12">Complete Registration</Button>
        </Form>
      </Card>
    </div>
  );
}