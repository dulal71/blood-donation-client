"use client";
import { useState, useEffect, useRef } from "react";
import { Card, Input, TextField, Label, Button, Separator, Chip } from "@heroui/react";
import {
  FaSave, FaUser, FaEnvelope,
  FaMapMarkerAlt, FaTint, FaPhone, FaTimes, FaCamera,
} from "react-icons/fa";
import { authClient, useSession } from "@/lib/auth-client";
import { BiEditAlt } from "react-icons/bi";
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

  // ── Pick image locally and preview it ────────────────────────────────────
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

  // ── Upload to ImgBB and return the URL ───────────────────────────────────
  const uploadToImgBB = async (file) => {
    const url = await uploadUserImage(file);
    return url;
  };

  // ── Save everything ───────────────────────────────────────────────────────
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

  // ── Cancel ────────────────────────────────────────────────────────────────
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

  const displayImage = imagePreview || formData.image;

  return (
    <div className="bg-default-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl shadow-md">

        {/* ── Header ─────────────────────────────────────────────── */}
        <Card.Header className="relative px-6 pt-6 pb-2">
          <div>
            <p className="text-lg font-bold text-default-900">My Profile</p>
            <p className="text-sm text-default-400">View and manage your personal information</p>
          </div>

          <div className="absolute top-4 right-4 flex gap-2">
            {!isEditing ? (
              <Button
                size="sm"
                color="primary"
                variant="shadow"
                onPress={() => setIsEditing(true)}
                className="font-semibold tracking-wide text-white bg-amber-700 px-4"
                startContent={<BiEditAlt size={14} />}
              >
                Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="bordered"
                  onPress={handleCancel}
                  className="font-medium bg-red-700 text-white"
                  startContent={<FaTimes size={12} />}
                  isDisabled={saving}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  color="success"
                  variant="shadow"
                  onPress={handleSave}
                  isLoading={saving}
                  className="font-semibold bg-blue-700 tracking-wide text-white"
                  startContent={!saving && <FaSave size={12} />}
                >
                  {imageUploading ? "Uploading..." : saving ? "Saving..." : "Save Changes"}
                </Button>
              </>
            )}
          </div>
        </Card.Header>

        {/* ── Content ────────────────────────────────────────────── */}
        <Card.Content className="flex flex-col gap-5 px-6 py-4">

          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 shrink-0">
              <Image
                width={64}
                height={64}
                src={displayImage}
                alt={formData.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-offset-2 ring-default-200"
              />

              {isEditing && (
                <>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-black/50 text-white opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <FaCamera size={14} />
                    <span className="text-[9px] mt-0.5 font-medium">Change</span>
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
                <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center">
                  <FaCamera size={7} className="text-white" />
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-base font-semibold text-default-900">{formData.name}</p>
              <p className="text-sm text-default-500">{formData.email}</p>
              <Chip size="sm" variant="flat" color={roleColor} className="capitalize w-fit">
                {formData.role}
              </Chip>
              {isEditing && (
                <p className="text-[11px] text-default-400 mt-0.5">
                  Hover over the photo to change it
                </p>
              )}
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ProfileField label="Full Name" icon={FaUser} name="name" value={formData.name} onChange={handleChange} disabled={!isEditing} />
            <ProfileField label="Email" icon={FaEnvelope} name="email" value={formData.email} readOnly description="Email cannot be changed" />
            <ProfileField label="Phone" icon={FaPhone} name="phone" value={formData.phone ?? ""} onChange={handleChange} disabled={!isEditing} />
            <ProfileField label="Blood Group" icon={FaTint} name="bloodGroup" value={formData.bloodGroup ?? ""} onChange={handleChange} disabled={!isEditing} />
            <ProfileField label="District" icon={FaMapMarkerAlt} name="district" value={formData.district ?? ""} onChange={handleChange} disabled={!isEditing} />
            <ProfileField label="Upazila" icon={FaMapMarkerAlt} name="upazila" value={formData.upazila ?? ""} onChange={handleChange} disabled={!isEditing} />
          </div>
        </Card.Content>

        {/* ── Footer ─────────────────────────────────────────────── */}
        <Card.Footer className="px-6 pb-5 pt-0">
          <p className="text-xs text-default-400">
            Member since{" "}
            {new Date(user?.createdAt).toLocaleDateString("en-GB", {
              day: "numeric", month: "long", year: "numeric",
            })}
          </p>
        </Card.Footer>

      </Card>
    </div>
  );
}