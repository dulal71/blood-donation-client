"use client";
import { useState, useEffect, useRef } from "react";
import { Card, Input, TextField, Label, Button, Separator, Chip } from "@heroui/react";
import {
  FaSave, FaUser, FaEnvelope,
  FaMapMarkerAlt, FaTint, FaPhone, FaTimes, FaCamera,
} from "react-icons/fa";
import { authClient, useSession } from "@/lib/auth-client";
import { BiEditAlt } from "react-icons/bi";
import { MdBloodtype, MdLocationOn, MdPhone } from "react-icons/md";
import Image from "next/image";
import { uploadUserImage } from "@/lib/action/uploadImage";

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
      setFormData((prev) => ({ ...prev, image: imageUrl }));
      setImageFile(null);
      setImagePreview(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Save failed:", error);
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
  <Card className="w-full max-w-xl shadow-xl overflow-hidden rounded-2xl">

    {/* ── Gradient banner ──────────────────────────────────────── */}
   {/* ── Gradient banner ──────────────────────────────────────── */}
<div className={`h-36 w-full bg-gradient-to-br ${roleBg} relative`}>

  {/* mesh pattern */}
  <div
    className="absolute inset-0 opacity-15"
    style={{
      backgroundImage: `
        radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
        radial-gradient(circle at 80% 20%, white 1px, transparent 1px),
        radial-gradient(circle at 60% 80%, white 1px, transparent 1px)
      `,
      backgroundSize: "30px 30px, 25px 25px, 20px 20px",
    }}
  />

  {/* bottom fade */}
  <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white/20 to-transparent" />

  {/*  Banner text — bottom left */}
  <div className="absolute top-4 left-6">
    <h1 className="text-white font-extrabold text-xl tracking-tight drop-shadow-md leading-tight flex items-center gap-1">
     <FaTint className="text-red-500"></FaTint>  Blood Donation
    </h1>
    <p className="text-white/70 text-xs font-medium tracking-wide mt-0.5">
      Save lives · Give blood · Be a hero
    </p>
  </div>

  {/* Edit / Save / Cancel — top right */}
  <div className="absolute top-3 right-3 flex gap-2">
    {!isEditing ? (
      <Button
        size="sm"
        onPress={() => setIsEditing(true)}
        className="bg-white/25 hover:bg-white/40 backdrop-blur-md text-white font-semibold border border-white/40 shadow-sm px-3 rounded-lg"
        startContent={<BiEditAlt size={14} />}
      >
        Edit Profile
      </Button>
    ) : (
      <>
        <Button
          size="sm"
          onPress={handleCancel}
          isDisabled={saving}
          className="bg-white/25 hover:bg-white/40 backdrop-blur-md text-white border border-white/40 rounded-lg"
          startContent={<FaTimes size={11} />}
        >
          Cancel
        </Button>
        <Button
          size="sm"
          onPress={handleSave}
          isLoading={saving}
          className="bg-white text-gray-900 font-bold shadow-md rounded-lg hover:bg-white/90"
          startContent={!saving && <FaSave size={11} />}
        >
          {imageUploading ? "Uploading..." : saving ? "Saving..." : "Save Changes"}
        </Button>
      </>
    )}
  </div>
</div>

    {/* ── Avatar + name block ───────────────────────────────────── */}
    <div className="px-6">
      <div className="flex items-end justify-between -mt-14 mb-4">

        {/* Avatar */}
        <div className="relative">
          <div className="w-28 h-28 rounded-full p-1 bg-white shadow-xl">
            <Image
              width={104}
              height={104}
              src={displayImage}
              alt={formData.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          {isEditing && (
            <>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-1 flex flex-col items-center justify-center rounded-full bg-black/55 text-white opacity-0 hover:opacity-100 transition-all duration-200 cursor-pointer"
              >
                <FaCamera size={18} />
                <span className="text-[10px] mt-1 font-semibold tracking-wide">Change</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImagePick}
              />
            </>
          )}

          {imagePreview && (
            <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center shadow-md">
              <FaCamera size={9} className="text-white" />
            </span>
          )}
        </div>

        {/* Member since — floats to the right, bottom-aligned with avatar */}
        <div className="mb-1 text-right">
          <p className="text-[10px] uppercase tracking-widest text-default-400 font-semibold">Member since</p>
          <p className="text-sm font-bold text-default-700">
            {new Date(user?.createdAt).toLocaleDateString("en-GB", {
              day: "numeric", month: "short", year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Name / email / chips */}
      <div className="mb-4">
        <h2 className="text-2xl font-extrabold text-default-900 leading-tight tracking-tight">
          {formData.name}
        </h2>
        <p className="text-sm text-default-500 mt-0.5 mb-3">{formData.email}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <Chip
            size="sm"
            variant="flat"
            color={roleColor}
            className="capitalize font-semibold px-2"
          >
            {formData.role}
          </Chip>
          <Chip
            size="sm"
            variant="dot"
            color="success"
            className="capitalize"
          >
            {formData.status ?? "active"}
          </Chip>
          {isEditing && (
            <span className="text-[11px] text-default-400 italic">
              Hover over photo to change it
            </span>
          )}
        </div>
      </div>

      <Separator />
    </div>

    {/* ── Body ─────────────────────────────────────────────────── */}
    <Card.Content className="px-6 pt-5 pb-6">
      {!isEditing ? (
        // ── Read-only info tiles ────────────────────────────────
        <div className="grid grid-cols-2 gap-3">

          {/* Blood group gets a special large tile spanning full width at top */}
          <div className="col-span-2 flex items-center gap-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-2xl px-5 py-4">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <MdBloodtype size={20} className="text-red-500" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-red-400 font-bold">Blood Group</p>
              <p className="text-2xl font-extrabold text-red-600 leading-tight">{formData.bloodGroup || "—"}</p>
            </div>
          </div>

          <InfoTile icon={FaPhone}      label="Phone"    value={formData.phone}    iconColor="text-blue-500"    bgColor="bg-blue-50"    borderColor="border-blue-100" />
          <InfoTile icon={FaEnvelope}   label="Email"    value={formData.email}    iconColor="text-purple-500"  bgColor="bg-purple-50"  borderColor="border-purple-100" />
          <InfoTile icon={MdLocationOn} label="District" value={formData.district} iconColor="text-emerald-500" bgColor="bg-emerald-50" borderColor="border-emerald-100" />
          <InfoTile icon={MdLocationOn} label="Upazila"  value={formData.upazila}  iconColor="text-teal-500"    bgColor="bg-teal-50"    borderColor="border-teal-100" />

        </div>
      ) : (
        // ── Edit form ───────────────────────────────────────────
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ProfileField label="Full Name"   icon={FaUser}         name="name"       value={formData.name}             onChange={handleChange} disabled={!isEditing} />
          <ProfileField label="Email"       icon={FaEnvelope}     name="email"      value={formData.email}            readOnly description="Email cannot be changed" />
          <ProfileField label="Phone"       icon={FaPhone}        name="phone"      value={formData.phone ?? ""}      onChange={handleChange} disabled={!isEditing} />
          <ProfileField label="Blood Group" icon={FaTint}         name="bloodGroup" value={formData.bloodGroup ?? ""} onChange={handleChange} disabled={!isEditing} />
          <ProfileField label="District"    icon={FaMapMarkerAlt} name="district"   value={formData.district ?? ""}   onChange={handleChange} disabled={!isEditing} />
          <ProfileField label="Upazila"     icon={FaMapMarkerAlt} name="upazila"    value={formData.upazila ?? ""}    onChange={handleChange} disabled={!isEditing} />
        </div>
      )}
    </Card.Content>

  </Card>
</div>
  );
}