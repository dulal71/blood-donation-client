"use client";
import { useState, useEffect, useRef } from "react";
import { Card, Input, TextField, Label, Button, Separator, Chip, } from "@heroui/react";
import {
  FaSave, FaUser, FaEnvelope,
  FaMapMarkerAlt, FaTint, FaPhone, FaTimes, FaCamera,
} from "react-icons/fa";
import { authClient, useSession } from "@/lib/auth-client";
import { BiEditAlt } from "react-icons/bi";
import { MdBloodtype, MdLocationOn, MdPhone } from "react-icons/md";
import Image from "next/image";
import { uploadUserImage } from "@/lib/action/uploadImage";
import { toast } from "sonner";

function ProfileField({ label, icon: Icon, name, value, onChange, disabled = false, readOnly = false, description }) {
  return (
    <TextField
      name={name}
      value={value}
      onChange={(val) => onChange?.({ target: { name, value: val } })}
      isDisabled={disabled}
      isReadOnly={readOnly}
      className="flex flex-col gap-1"
    >
      <Label className="text-xs font-medium text-default-500">{label}</Label>
      <div className="relative flex items-center">
        {Icon && (
          <span className="absolute left-3 text-default-400 pointer-events-none">
            <Icon size={13} />
          </span>
        )}
        <Input
          className={`w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm transition-colors
            ${Icon ? "pl-9" : ""}
            ${disabled || readOnly
              ? "opacity-50 cursor-not-allowed bg-default-100"
              : "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"}
          `}
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      </div>
      {description && <p className="text-xs text-default-400">{description}</p>}
    </TextField>
  );
}

// ── Small info tile used in the read-only profile view ───────────────────────
function InfoTile({ icon: Icon, label, value, iconColor, bgColor = "bg-default-50", borderColor = "border-default-200" }) {
  return (
    <div className={`flex items-center gap-3 ${bgColor} border ${borderColor} rounded-2xl px-4 py-3`}>
      <span className={`${iconColor} shrink-0`}>
        <Icon size={16} />
      </span>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-widest text-default-400 font-semibold">{label}</p>
        <p className="text-sm font-semibold text-default-800 truncate">{value || "—"}</p>
      </div>
    </div>
  );
}

export default function UserProfile() {
  const { data: session } = useSession();
  const user = session?.user;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagePick = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadToImgBB = async (file) => {
    const url = await uploadUserImage(file);
    return url;
  };

  const handleSave = async () => {
  setSaving(true);
  try {
    let imageUrl = formData.image;
    if (imageFile) {
      setImageUploading(true);
      imageUrl = await uploadToImgBB(imageFile);
      setImageUploading(false);
    }
    
    await authClient.updateUser({
      name: formData.name,
      phone: formData.phone,
      bloodGroup: formData.bloodGroup,
      district: formData.district,
      upazila: formData.upazila,
      image: imageUrl,
    });

   
    toast.success("Profile updated successfully!"); 

    setFormData((prev) => ({ ...prev, image: imageUrl }));
    setImageFile(null);
    setImagePreview(null);
    setIsEditing(false);
  } catch (error) {
    console.error("Save failed:", error);
   
    toast.error("Failed to update profile. Please try again."); 
  } finally {
    setSaving(false);
    setImageUploading(false);
  }
};

  const handleCancel = () => {
    setFormData(user);
    setImageFile(null);
    setImagePreview(null);
    setIsEditing(false);
  };

  if (!formData) {
    return <p className="text-center py-10 text-default-400">Loading profile...</p>;
  }

  const roleColor =
    formData.role === "admin" ? "danger" :
    formData.role === "donor" ? "success" : "warning";

  const roleBg =
    formData.role === "admin" ? "from-red-500 to-rose-600" :
    formData.role === "donor" ? "from-emerald-500 to-green-600" :
    "from-amber-500 to-orange-500";

  const displayImage = imagePreview || formData.image;

  return (
   <div className="max-w-4xl mx-auto p-8 bg-white min-h-screen">
      {/* ── Header Section ── */}
      <div className="flex justify-between flex-col md:flex-row items-start mb-10">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
            PROFILES / {formData.name?.toUpperCase()}
          </p>
          <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
        </div>

        {/* Edit Button */}
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)} 
            className="text-blue-600 font-medium flex items-center gap-2 hover:underline cursor-pointer"
          >
            <BiEditAlt /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button onClick={handleCancel} className="text-gray-500 font-medium px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">Cancel</button>
            <button onClick={handleSave} className="bg-gray-900 text-white font-bold px-6 py-2 rounded-lg shadow-lg cursor-pointer">Save Changes</button>
          </div>
        )}
      </div>

      {/* ── Avatar + Name Block ── */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
        <div className="relative w-28 h-28 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <Image width={112} height={112} src={displayImage} alt={formData.name} className="w-full h-full object-cover" />
          {isEditing && (
            <button onClick={() => fileInputRef.current?.click()} className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
              <FaCamera size={20} />
            </button>
          )}
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{formData.name}</h2>
          <p className="text-gray-600 font-medium mb-2">{formData.role || "Senior Strategy Consultant"}</p>
          <div className="flex gap-3 items-center">
            <Chip color={formData.status === 'active' ? 'success' : 'danger'} variant="flat" size="sm">{formData.status}</Chip>
            <span className="text-sm text-gray-500">Joined Oct 2021</span>
          </div>
        </div>
      </div>

      {/* ── Body Content ── */}
      {!isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Contact Information</h3>
            <div>
              <p className="text-xs text-gray-400">Email</p>
              <p className="text-sm font-semibold text-gray-900">{formData.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Phone</p>
              <p className="text-sm font-semibold text-gray-900">{formData.phone}</p>
            </div>
          </div>

          {/* Professional Details */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Professional Details</h3>
            <div>
              <p className="text-xs text-gray-400">Address</p>
              <p className="text-sm font-semibold text-gray-900">{formData.district}, {formData.upazila}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Blood Group</p>
              <p className="text-sm font-bold text-red-600">{formData.bloodGroup}</p>
            </div>
          </div>
        </div>
      ) : (
        /* Edit Form */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <ProfileField label="Full Name" name="name" value={formData.name} onChange={handleChange} />
          <ProfileField label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
          <ProfileField label="District" name="district" value={formData.district} onChange={handleChange} />
          <ProfileField label="Upazila" name="upazila" value={formData.upazila} onChange={handleChange} />
          <ProfileField label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} />
        </div>
      )}
    </div>
  );
}