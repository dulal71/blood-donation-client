import { getDonationsById } from "@/lib/api/donationById";
import {
  FaHospital, FaMapMarkerAlt, FaMap, FaHome,
  FaTint, FaClock, FaCommentDots,
  FaCheckCircle, FaCalendarAlt, FaQuestionCircle
} from "react-icons/fa";

const statusConfig = {
  pending: {
    label: "Pending",
    cls: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
  },
  inprogress: {
    label: "In Progress",
    cls: "bg-blue-500/10 text-blue-500 border border-blue-500/20"
  },
  done: {
    label: "Done",
    cls: "bg-green-500/10 text-green-500 border border-green-500/20"
  },
};

function DividerLabel({ label }) {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      <span className="text-[11px] font-semibold tracking-widest text-gray-500">
        {label}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
    </div>
  );
}

function InfoTile({ icon, label, value, iconBg, iconColor }) {
  return (
    <div className="flex gap-3 items-center bg-white/70 backdrop-blur-sm border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg} ${iconColor}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] text-gray-400 uppercase tracking-wide">{label}</p>
        <p className="text-[14px] font-medium text-gray-800 truncate">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

const MyDonationDetails = async ({ params }) => {
  const { requestId } = await params;
  const donation = await getDonationsById(requestId);
console.log(donation);
  const {
    recipientName, bloodGroup, hospitalName, fullAddress,
    recipientDistrict, recipientUpazila, donationDate, donationTime,
    requestMessage, requesterName, requesterEmail,
    donorName, donorEmail, status,
    requesterId, _id, createdAt,
  } = donation;

  const statusInfo = statusConfig[status] || {
    label: status,
    cls: "bg-gray-100 text-gray-500 border border-gray-200"
  };

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }) : "—";

  const formatTime = (t) => {
    if (!t) return "—";
    const [h, m] = t.split(":");
    const date = new Date();
    date.setHours(+h, +m);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit"
    });
  };

  const initials = (name) =>
    name
      ? name.trim().split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
      : "?";

 // কার্ডের কমন স্টাইলিংয়ের জন্য একটি ভেরিয়েবল বা ক্লাস তৈরি করে নিতে পারেন
const cardStyle = "bg-white/80 backdrop-blur-md border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-6 transition-all duration-300 hover:shadow-xl";

// --- আপনার মূল রিটার্ন ব্লকের ভেতরে এগুলো পরিবর্তন করুন ---

return (
  <div className="min-h-screen bg-gray-50/50 py-10 px-4">
    <div className="max-w-3xl mx-auto space-y-8">

      {/* HERO SECTION - আধুনিক লুক */}
    <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
  {/* Header: Blood Group & Name */}
  <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
    <div className="w-20 h-20 flex-shrink-0 bg-red-50 rounded-2xl flex items-center justify-center border border-red-100">
      <span className="text-3xl font-bold text-red-600">{bloodGroup}</span>
    </div>
    
    <div className="flex-1">
      <h1 className="text-2xl font-bold text-gray-900">{recipientName}</h1>
      <p className="text-gray-500 mt-1 flex items-center gap-2">
        <FaHospital className="text-gray-400" />
        {hospitalName}
      </p>
    </div>

    {/* Status Badge */}
    <div className="mt-4 sm:mt-0">
      <span className={`px-4 py-1.5 rounded-full text-xs font-semibold ${statusInfo.cls}`}>
        {statusInfo.label}
      </span>
    </div>
  </div>

  {/* Divider */}
  <div className="h-px bg-gray-100 my-8" />

  {/* Info Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Date</p>
      <p className="text-sm font-semibold text-gray-700">{formatDate(donationDate)}</p>
    </div>
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Time</p>
      <p className="text-sm font-semibold text-gray-700">{formatTime(donationTime)}</p>
    </div>
    <div className="col-span-2 sm:col-span-1">
      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Location</p>
      <p className="text-sm font-semibold text-gray-700 truncate">{recipientDistrict}</p>
    </div>
  </div>
</div>

      {/* RECIPIENT DETAILS  */}
      <div className={cardStyle}>
        <h3 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-widest">Recipient Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoTile icon={<FaMapMarkerAlt />} label="District" value={recipientDistrict} iconBg="bg-indigo-50" iconColor="text-indigo-600" />
          <InfoTile icon={<FaMap />} label="Upazila" value={recipientUpazila} iconBg="bg-blue-50" iconColor="text-blue-600" />
          <InfoTile icon={<FaHome />} label="Address" value={fullAddress} iconBg="bg-emerald-50" iconColor="text-emerald-600" />
          <InfoTile icon={<FaTint />} label="Blood Group" value={bloodGroup} iconBg="bg-rose-50" iconColor="text-rose-600" />
        </div>
      </div>

      {/* MESSAGE SECTION */}
      {requestMessage && (
        <div className={`${cardStyle} border-l-4 border-l-[#ff4d4d]`}>
          <p className="text-[10px] font-bold text-[#ff4d4d] uppercase mb-2 flex items-center gap-2">
            <FaCommentDots /> Request Message
          </p>
          <p className="text-gray-600 leading-relaxed italic">"{requestMessage}"</p>
        </div>
      )}

      {/* REQUESTER & DONOR SECTION */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className={cardStyle}>
          <h4 className="text-xs font-bold text-gray-400 mb-4 uppercase">Requester</h4>
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-lg">
               {initials(requesterName)}
             </div>
             <div>
               <p className="font-bold text-gray-800">{requesterName}</p>
               <p className="text-xs text-blue-500">{requesterEmail}</p>
             </div>
          </div>
        </div>

        <div className={cardStyle}>
          <h4 className="text-xs font-bold text-gray-400 mb-4 uppercase">Donor</h4>
          {donorName ? (
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold shadow-lg">
                {initials(donorName)}
              </div>
              <div>
                <p className="font-bold text-gray-800">{donorName}</p>
                <p className="text-xs text-green-600">{donorEmail}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-400 py-3">No donor assigned yet.</p>
          )}
        </div>
      </div>

    </div>
  </div>
);
};

export default MyDonationDetails;