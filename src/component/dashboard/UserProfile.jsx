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
   <div className="flex items-center justify-center p-4">
  <Card className="w-full max-w-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden rounded-3xl border border-gray-100">
    
    {/* ── Gradient banner ──────────────────────────────────────── */}
    <div className="h-32 w-full bg-white border-b border-gray-100 flex items-center justify-between px-8 relative">
  <div>
    <h1 className="text-xl font-bold text-gray-900 tracking-tight">User Profile</h1>
    <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mt-0.5">Manage your personal information</p>
  </div>

  <div className="flex gap-2">
    {!isEditing ? (
      <Button 
        size="sm" 
        onPress={() => setIsEditing(true)} 
        variant="flat" 
        className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl"
      >
        <BiEditAlt /> Edit Profile
      </Button>
    ) : (
      <>
        <Button size="sm" onPress={handleCancel} variant="light" className="text-gray-500 rounded-xl">Cancel</Button>
        <Button size="sm" onPress={handleSave} isLoading={saving} className="bg-gray-900 text-white font-bold rounded-xl shadow-lg">
          Save Changes
        </Button>
      </>
    )}
  </div>
</div>

    {/* ── Avatar + Name Block ───────────────────────────────────── */}
    <div className="px-8 -mt-12">
      <div className="relative w-28 h-28 rounded-full p-1 bg-white shadow-md">
        <Image width={112} height={112} src={displayImage} alt={formData.name} className="w-full h-full rounded-full object-cover" />
        {isEditing && (
          <button onClick={() => fileInputRef.current?.click()} className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 text-white opacity-0 hover:opacity-100 transition-opacity">
            <FaCamera size={20} />
          </button>
        )}
      </div>
      
      <div className="mt-4">
        <h2 className="text-2xl font-bold text-gray-900">{formData.name}</h2>
        <p className="text-gray-500 text-sm">{formData.email}</p>
        <div className="flex gap-2 mt-3">
          <Chip color={roleColor} variant="flat" className="font-medium">{formData.role}</Chip>
          <Chip color={formData.status} variant="dot">{formData.status }</Chip>
        </div>
      </div>
    </div>

    {/* ── Body ─────────────────────────────────────────────────── */}
    <Card.Content className="px-8 pt-8 pb-8">
      {!isEditing ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-1 sm:col-span-2 flex items-center gap-4 bg-red-50 p-4 rounded-2xl border border-red-100">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-red-500 text-xl font-bold shadow-sm">{formData.bloodGroup}</div>
            <div>
              <p className="text-[10px] uppercase font-bold text-red-400 tracking-wider">Blood Group</p>
              <p className="font-semibold text-gray-800">Your Blood Type</p>
            </div>
          </div>
          <InfoTile icon={FaPhone} label="Phone" value={formData.phone} iconColor="text-blue-500" bgColor="bg-blue-50/50" />
          <InfoTile icon={FaEnvelope} label="Email" value={formData.email} iconColor="text-purple-500" bgColor="bg-purple-50/50" />
          <InfoTile icon={MdLocationOn} label="District" value={formData.district} iconColor="text-emerald-500" bgColor="bg-emerald-50/50" />
          <InfoTile icon={MdLocationOn} label="Upazila" value={formData.upazila} iconColor="text-teal-500" bgColor="bg-teal-50/50" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ProfileField label="Full Name" icon={FaUser} name="name" value={formData.name} onChange={handleChange} />
          <ProfileField label="Email" icon={FaEnvelope} name="email" value={formData.email} readOnly />
          <ProfileField label="Phone" icon={FaPhone} name="phone" value={formData.phone || ""} onChange={handleChange} />
          <ProfileField label="Blood Group" icon={FaTint} name="bloodGroup" value={formData.bloodGroup || ""} onChange={handleChange} />
          <ProfileField label="District" icon={FaMapMarkerAlt} name="district" value={formData.district || ""} onChange={handleChange} />
          <ProfileField label="Upazila" icon={FaMapMarkerAlt} name="upazila" value={formData.upazila || ""} onChange={handleChange} />
        </div>
      )}
    </Card.Content>
  </Card>
</div>
  );
}