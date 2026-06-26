"use client"
import { editDonation } from '@/lib/action/editDonation';
import { Button, Card, Separator } from '@heroui/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaClock, FaHospital, FaMapMarkerAlt, FaPaperPlane, FaTint, FaUser, FaEnvelopeOpen, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'sonner';

// ── Read Only Info Item ───────────────────────────────────────────────────────
function InfoItem({ label, value, icon: Icon }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-default-400 font-medium">{label}</span>
      <div className="flex items-center gap-2">
        {Icon && <Icon size={12} className="text-default-400 shrink-0" />}
        <span className="text-sm  text-default-700">{value ?? "—"}</span>
      </div>
    </div>
  );
}

// ── Editable Input ────────────────────────────────────────────────────────────
function FormInput({ label, icon: Icon, name, value, onChange, placeholder, type = "text", required }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold uppercase tracking-widest text-default-400">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative flex items-center">
        {Icon && (
          <span className="absolute left-3 text-default-400 pointer-events-none">
            <Icon size={13} />
          </span>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full rounded-xl border border-border bg-surface text-sm px-4 py-2.5 outline-none transition-colors
            focus:border-primary focus:ring-2 focus:ring-primary/20
            ${Icon ? "pl-9" : ""}
          `}
        />
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
const DonationEditForm = ({ donation, user }) => {
  const [submitting, setSubmitting] = useState(false);
 const [form, setForm] = useState({
    hospitalName: "",
    fullAddress: "",
    donationDate: "",
    donationTime: "",
  });

  useEffect(() => {
    if (donation) {
      setForm({
        hospitalName: donation.hospitalName ?? "",
        fullAddress:  donation.fullAddress  ?? "",
        donationDate: donation.donationDate ?? "",
        donationTime: donation.donationTime ?? "",
      });
    }
  }, [donation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await editDonation(donation._id, form);
      if (res.modifiedCount > 0) 
        toast.success("Update Request Successfully")
        
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

 

  // ── Form ──────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-7xl mx-auto py-10 p-2 md:px-4">
  <Card className="w-full shadow-lg rounded-3xl border border-gray-100 overflow-hidden">
    
    {/* Clean Header */}
    <div className="bg-white p-2 md:px-8 pt-8 pb-4 border-b border-gray-100">
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Edit Request</h1>
      <p className="text-sm text-gray-500 mt-1">Update hospital & schedule details below</p>
    </div>

    <form onSubmit={handleSubmit}>
      <div className=" p-4 md:p-8 space-y-8 bg-gray-50/50">
        
        {/* Section: Requester Info */}
        <div className="bg-white p-2 md:p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">Requester Information</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InfoItem label="Your Name" value={user?.name} icon={FaUser} />
            <InfoItem label="Your Email" value={user?.email} icon={FaEnvelopeOpen} />
          </div>
        </div>

        {/* Section: Recipient Info */}
        <div className="bg-white p-2 md:p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">Recipient Information</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InfoItem label="Recipient Name" value={donation?.recipientName} icon={FaUser} />
            <InfoItem label="Blood Group" value={donation?.bloodGroup} icon={FaTint} />
            <InfoItem label="District" value={donation?.recipientDistrict} icon={FaMapMarkerAlt} />
            <InfoItem label="Upazila" value={donation?.recipientUpazila} icon={FaMapMarkerAlt} />
          </div>
        </div>

        {/* Section: Editable Fields */}
        <div className="bg-white p-2 md:p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">Update Details</p>
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormInput label="Hospital Name" name="hospitalName" value={form.hospitalName} onChange={handleChange} icon={FaHospital} required />
              <FormInput label="Full Address" name="fullAddress" value={form.fullAddress} onChange={handleChange} icon={FaMapMarkerAlt} required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormInput label="Donation Date" name="donationDate" value={form.donationDate} onChange={handleChange} type="date" icon={FaCalendarAlt} required />
              <FormInput label="Donation Time" name="donationTime" value={form.donationTime} onChange={handleChange} type="time" icon={FaClock} required />
            </div>
          </div>
        </div>

        {/* Info Note */}
        <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-2xl p-4">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">i</div>
          <p className="text-sm text-blue-800">Only Hospital, Address, Date & Time can be updated.</p>
        </div>

      </div>

      {/* Footer Button */}
      <div className="p-8 bg-white border-t border-gray-100">
        <Button
          type="submit"
          isLoading={submitting}
          className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-all shadow-lg"
        >
          {submitting ? "Updating..." : "Save Changes"}
        </Button>
      </div>
    </form>
  </Card>
</div>
  );
};

export default DonationEditForm;