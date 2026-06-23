"use client";
import { useState } from "react";
import { Card, Button, Separator } from "@heroui/react";
import { useSession } from "@/lib/auth-client";
import {
  FaUser, FaEnvelope, FaHospital, FaMapMarkerAlt,
  FaTint, FaCalendarAlt, FaClock, FaFileAlt, FaPaperPlane,
  FaHandHoldingMedical,
  FaTimes,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { districtsData, upazilasData } from "@/data/geoData";
import { addDonationRequest } from "@/lib/action/donationRequest";


const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

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

//  Input Helper function
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

// select option Helper
function FormSelect({ label, icon: Icon, name, value, onChange, options, placeholder, required, disabled }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold uppercase tracking-widest text-default-400">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative flex items-center">
        {Icon && (
          <span className="absolute left-3 text-default-400 pointer-events-none z-10">
            <Icon size={13} />
          </span>
        )}
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`w-full rounded-xl border border-border bg-surface text-sm px-4 py-2.5 outline-none appearance-none transition-colors
            focus:border-primary focus:ring-2 focus:ring-primary/20
            ${Icon ? "pl-9" : ""}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="absolute right-3 text-default-400 pointer-events-none">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path d="M6 8L1 3h10L6 8z" />
          </svg>
        </span>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function CreateDonationRequest() {
  const { data: session } = useSession();
  const user = session?.user;

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    recipientName: "",
    recipientDistrict: "",   
    recipientUpazila: "",  
    hospitalName: "",
    fullAddress: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
  });

  // ── DistrictOptions form json data ──────────────────────────────────
  const districtOptions = districtsData.map((d) => ({
    value: d.id,
    label: d.name,
  }));
  // ── upazilaOptions form json data ──────────────────────────────────
  const upazilaOptions = form.recipientDistrict
    ? upazilasData
        .filter((u) => u.district_id === form.recipientDistrict)
        .map((u) => ({ value: u.id, label: u.name }))
    : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      // reset upazila when district changes
      ...(name === "recipientDistrict" ? { recipientUpazila: "" } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
     
      const districtName = districtsData.find((d) => d.id === form.recipientDistrict)?.name ?? "";
      const upazilaName  = upazilasData.find((u) => u.id === form.recipientUpazila)?.name  ?? "";

      const payload = {
        ...form,
        recipientDistrict: districtName,
        recipientUpazila:  upazilaName,
        requesterName:  user?.name,
        requesterEmail: user?.email,
        requesterId: user?.id,
        status: "pending",
      };

     const res = await addDonationRequest(payload)
    if(res.insertedId){
       setSubmitted(true);
    }
    } catch (err) {
      console.error("Failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({
      recipientName: "", recipientDistrict: "", recipientUpazila: "",
      hospitalName: "", fullAddress: "", bloodGroup: "",
      donationDate: "", donationTime: "", requestMessage: "",
    });
    setSubmitted(false);
  };

  // ── Success screen ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md text-center shadow-xl rounded-2xl overflow-hidden">
          <div className="h-2 w-full bg-gradient-to-r from-emerald-400 to-green-500" />
          <Card.Content className="px-8 py-10 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
              <FaPaperPlane size={24} className="text-emerald-500" />
            </div>
            <h2 className="text-2xl font-extrabold text-default-900">Request Submitted!</h2>
            <p className="text-sm text-default-500 leading-relaxed">
              Your blood donation request has been submitted. A donor will reach out to you soon.
            </p>
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wide">
              Status: Pending
            </span>
            <Button color="primary" className="mt-2 font-semibold rounded-xl" onPress={resetForm}>
              Create Another Request
            </Button>
          </Card.Content>
        </Card>
      </div>
    );
  }

  // ── Form ──────────────────────────────────────────────────────────────────
 

return (
  <>
    {user?.banned ? (
      <div className="max-w-xl mx-auto py-20 px-4 text-center">
        <div className="bg-red-50 p-8 rounded-3xl border border-red-100 shadow-sm">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 mx-auto mb-4">
            <FaTimes size={30} />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Access Restricted</h2>
          <p className="text-gray-600 mt-2">
            Your account is currently restricted from creating new donation requests due to a violation of our policies.
          </p>
        </div>
      </div>
    ) : (
      <div className="max-w-3xl mx-auto py-10 px-4 space-y-8">
        {/* Title Section */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-600">
            <FaHandHoldingMedical size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Create Donation Request</h1>
            <p className="text-sm text-gray-500 mt-1">Fill out the details to find a donor.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Requester Information */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">Requester Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ReadOnlyField label="Your Name" value={user?.name ?? "—"} icon={FaUser} />
              <ReadOnlyField label="Your Email" value={user?.email ?? "—"} icon={FaEnvelope} />
            </div>
          </div>

          {/* Recipient Information */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">Recipient Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormInput label="Recipient Name" name="recipientName" value={form.recipientName} onChange={handleChange} icon={FaUser} required />
              <FormSelect label="Blood Group" name="bloodGroup" value={form.bloodGroup} onChange={handleChange} options={BLOOD_GROUPS.map((b) => ({ value: b, label: b }))} icon={FaTint} required />
              <FormSelect label="Recipient District" name="recipientDistrict" value={form.recipientDistrict} onChange={handleChange} options={districtOptions} icon={MdLocationOn} required />
              <FormSelect label="Recipient Upazila" name="recipientUpazila" value={form.recipientUpazila} onChange={handleChange} options={upazilaOptions} icon={FaMapMarkerAlt} required disabled={!form.recipientDistrict} />
            </div>
          </div>

          {/* Hospital & Location */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">Hospital & Location</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormInput label="Hospital Name" name="hospitalName" value={form.hospitalName} onChange={handleChange} icon={FaHospital} required />
              <FormInput label="Full Address" name="fullAddress" value={form.fullAddress} onChange={handleChange} icon={FaMapMarkerAlt} required />
            </div>
          </div>

          {/* Donation Schedule */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">Donation Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <FormInput label="Donation Date" name="donationDate" value={form.donationDate} onChange={handleChange} type="date" icon={FaCalendarAlt} required />
              <FormInput label="Donation Time" name="donationTime" value={form.donationTime} onChange={handleChange} type="time" icon={FaClock} required />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">Request Message</label>
              <textarea name="requestMessage" value={form.requestMessage} onChange={handleChange} rows={4} required placeholder="Explain your situation..."
                className="w-full rounded-2xl border border-gray-200 p-4 text-sm outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            isLoading={submitting}
            className="w-full bg-gray-900 text-white font-semibold py-4 rounded-2xl hover:bg-gray-800 transition-all shadow-lg"
          >
            {submitting ? "Submitting..." : "Submit Donation Request"}
          </Button>
        </form>
      </div>
    )}
  </>
);
}