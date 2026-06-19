"use client";
import { useState } from "react";
import { Card, Button, Separator } from "@heroui/react";
import { useSession } from "@/lib/auth-client";
import {
  FaUser, FaEnvelope, FaHospital, FaMapMarkerAlt,
  FaTint, FaCalendarAlt, FaClock, FaFileAlt, FaPaperPlane,
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
              <FaTint></FaTint>  Blood Donation Request
            </h1>
            <p className="text-white/70 text-xs font-medium mt-0.5">
              Fill in the details below to find a donor
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Card.Content className="px-6 py-6 flex flex-col gap-6">

            {/* Requester Info */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-default-400 mb-3">
                Requester Information
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ReadOnlyField label="Your Name"  value={user?.name  ?? "—"} icon={FaUser} />
                <ReadOnlyField label="Your Email" value={user?.email ?? "—"} icon={FaEnvelope} />
              </div>
            </div>

            <Separator />

            {/* Recipient Info */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-default-400 mb-3">
                Recipient Information
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="Recipient Name" name="recipientName" value={form.recipientName}
                  onChange={handleChange} placeholder="Recipient's full name"
                  icon={FaUser} required
                />
                <FormSelect
                  label="Blood Group" name="bloodGroup" value={form.bloodGroup}
                  onChange={handleChange} placeholder="Select blood group"
                  options={BLOOD_GROUPS.map((b) => ({ value: b, label: b }))}
                  icon={FaTint} required
                />

                {/*  District from your JSON */}
                <FormSelect
                  label="Recipient District" name="recipientDistrict" value={form.recipientDistrict}
                  onChange={handleChange} placeholder="Select district"
                  options={districtOptions}
                  icon={MdLocationOn} required
                />

                {/*  Upazila filtered by selected district_id */}
                <FormSelect
                  label="Recipient Upazila" name="recipientUpazila" value={form.recipientUpazila}
                  onChange={handleChange} placeholder={form.recipientDistrict ? "Select upazila" : "Select district first"}
                  options={upazilaOptions}
                  icon={FaMapMarkerAlt} required
                  disabled={!form.recipientDistrict}
                />
              </div>
            </div>

            <Separator />

            {/* Hospital */}
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

            {/* Schedule */}
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

            <Separator />

            {/* Message */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-widest text-default-400">
                Request Message <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <FaFileAlt size={13} className="absolute top-3 left-3 text-default-400 pointer-events-none" />
                <textarea
                  name="requestMessage"
                  value={form.requestMessage}
                  onChange={handleChange}
                  rows={4}
                  required
                  placeholder="Explain why you need blood (e.g. surgery, accident, medical condition)..."
                  className="w-full rounded-xl border border-border bg-surface text-sm pl-9 pr-4 py-2.5 resize-none outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <p className="text-xs text-default-400">Describe the medical situation in detail to help donors understand urgency.</p>
            </div>

            {/* Status note */}
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
              <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
              <p className="text-xs text-amber-700 font-medium">
                Your request will be created with a <strong>Pending</strong> status and visible to donors immediately.
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
              {submitting ? "Submitting Request..." : "Submit Donation Request"}
            </Button>
          </Card.Footer>
        </form>

      </Card>
    </div>
  );
}