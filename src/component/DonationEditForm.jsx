"use client"
import { editDonation } from '@/lib/action/editDonation';
import { Button, Card, Separator } from '@heroui/react';
import { success } from 'better-auth';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaClock, FaHospital, FaMapMarkerAlt, FaPaperPlane, FaTint, FaUser, FaEnvelopeOpen, FaCheckCircle } from 'react-icons/fa';

// ── Helpers ───────────────────────────────────────────────────────────────────
function ReadOnlyField({ label, value, icon: Icon }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold uppercase tracking-widest text-default-400">{label}</label>
      <div className="flex items-center gap-2 bg-default-100 border border-default-200 rounded-xl px-4 py-2.5 opacity-70 cursor-not-allowed">
        {Icon && <Icon size={13} className="text-default-400 shrink-0" />}
        <span className="text-sm text-default-700 font-medium truncate">{value}</span>
      </div>
    </div>
  );
}

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
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    hospitalName: "",
    fullAddress: "",
    donationDate: "",
    donationTime: "",
  });

  // ── Initial Data Populate ─────────────────────────────────────────────────
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

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await editDonation(donation._id,form)
        
      if (res.modifiedCount > 0) {
       setSuccess(true)
      }
    } catch (err) {
      alert("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };
// ── Success screen ────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
  <Card className="w-full max-w-md text-center shadow-xl rounded-2xl overflow-hidden">
    
    {/* Top bar */}
    <div className="h-2 w-full bg-blue-500" />

    <Card.Content className="px-8 py-10 flex flex-col items-center gap-4">

      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
        <FaCheckCircle size={28} className="text-blue-500" />
      </div>

      {/* Title & Message */}
      <div>
        <h2 className="text-2xl font-extrabold text-default-900 mb-1">
          Request Updated!
        </h2>
        <p className="text-sm text-default-500 leading-relaxed">
          Your donation request has been successfully updated.
          Changes are now visible to donors.
        </p>
      </div>

      {/* Status Badge */}
      <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wide">
        Status: Pending
      </span>

      {/* Buttons */}
      <div className="flex gap-3 w-full mt-2">
        <Link
           href={'/dashboard/my-donation-requests'}
          className="flex-1 font-semibold rounded-xl"
         
        >
          My Requests
        </Link>
        <Link
         href={`/dashboard/my-donation-requests/${donation._id}/edit`}
          color="primary"
          className="flex-1 font-semibold rounded-xl"
         
        >
          Edit Again
        </Link>
      </div>

    </Card.Content>
  </Card>
</div>
    );
  }

  // ── UI ────────────────────────────────────────────────────────────────────
  return (
    <div className="flex items-center justify-center p-4 py-10">
      <Card className="w-full max-w-2xl shadow-xl rounded-2xl overflow-hidden">

        {/* Banner */}
        <div className="h-28 w-full bg-gradient-to-br from-red-500 to-rose-600 relative">
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
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white/20 to-transparent" />
          <div className="absolute bottom-4 left-6">
            <h1 className="text-white font-extrabold text-xl tracking-tight drop-shadow-md flex items-center gap-2">
              <FaTint /> Edit Donation Request
            </h1>
            <p className="text-white/70 text-xs font-medium mt-0.5">
              Update hospital & schedule details below
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Card.Content className="px-6 py-6 flex flex-col gap-6">

            {/* Requester Info — Read Only */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-default-400 mb-3">
                Requester Information
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ReadOnlyField label="Your Name"  value={user?.name  ?? "—"} icon={FaUser} />
                <ReadOnlyField label="Your Email" value={user?.email ?? "—"} icon={FaEnvelopeOpen} />
              </div>
            </div>

            <Separator />

            {/* Recipient Info — Read Only */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-default-400 mb-3">
                Recipient Information
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ReadOnlyField label="Recipient Name"     value={donation?.recipientName     ?? "—"} icon={FaUser} />
                <ReadOnlyField label="Blood Group"        value={donation?.bloodGroup        ?? "—"} icon={FaTint} />
                <ReadOnlyField label="Recipient District" value={donation?.recipientDistrict ?? "—"} icon={FaMapMarkerAlt} />
                <ReadOnlyField label="Recipient Upazila"  value={donation?.recipientUpazila  ?? "—"} icon={FaMapMarkerAlt} />
              </div>
            </div>

            <Separator />

            {/* Hospital — Editable ✏️ */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-default-400 mb-3">
                Hospital & Location
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="Hospital Name" name="hospitalName" value={form.hospitalName}
                  onChange={handleChange} placeholder="e.g. Dhaka Medical College Hospital"
                  icon={FaHospital} required
                />
                <FormInput
                  label="Full Address" name="fullAddress" value={form.fullAddress}
                  onChange={handleChange} placeholder="e.g. Zahir Raihan Rd, Dhaka"
                  icon={FaMapMarkerAlt} required
                />
              </div>
            </div>

            <Separator />

            {/* Schedule — Editable ✏️ */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-default-400 mb-3">
                Donation Schedule
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="Donation Date" name="donationDate" value={form.donationDate}
                  onChange={handleChange} type="date" icon={FaCalendarAlt} required
                />
                <FormInput
                  label="Donation Time" name="donationTime" value={form.donationTime}
                  onChange={handleChange} type="time" icon={FaClock} required
                />
              </div>
            </div>

            {/* Status note */}
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
              <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
              <p className="text-xs text-amber-700 font-medium">
                Only <strong>Hospital, Address, Date & Time</strong> can be updated.
              </p>
            </div>

          </Card.Content>

          {/* Submit */}
          <Card.Footer className="px-6 pb-6 pt-2">
            <Button
              type="submit"
              isLoading={submitting}
              className="w-full bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold text-sm py-3 rounded-xl shadow-md hover:opacity-90 transition-opacity"
              startContent={!submitting && <FaPaperPlane size={14} />}
            >
              {submitting ? "Updating Request..." : "Update Donation Request"}
            </Button>
          </Card.Footer>
        </form>

      </Card>
    </div>
  );
};

export default DonationEditForm;