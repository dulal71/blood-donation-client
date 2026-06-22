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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

        {/* HERO */}
        <div className="bg-[#1a1a2e] rounded-3xl p-6 shadow-xl flex gap-5 items-center">
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-[#e63946] flex items-center justify-center text-white text-xl font-semibold">
              {bloodGroup}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-semibold text-white truncate">
              {recipientName}
            </h1>

            <p className="text-sm text-gray-300 flex items-center gap-2 mt-1">
              <FaHospital size={13} />
              {hospitalName} · {fullAddress}
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.cls}`}>
                <FaCheckCircle className="inline mr-1" />
                {statusInfo.label}
              </span>

              <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-white">
                <FaCalendarAlt className="inline mr-1" />
                {formatDate(donationDate)}
              </span>

              <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-white">
                <FaClock className="inline mr-1" />
                {formatTime(donationTime)}
              </span>
            </div>
          </div>
        </div>

        {/* RECIPIENT */}
        <DividerLabel label="Recipient Details" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoTile icon={<FaMapMarkerAlt />} label="District" value={recipientDistrict} iconBg="bg-red-50" iconColor="text-red-600" />
          <InfoTile icon={<FaMap />} label="Upazila" value={recipientUpazila} iconBg="bg-blue-50" iconColor="text-blue-600" />
          <InfoTile icon={<FaHome />} label="Address" value={fullAddress} iconBg="bg-green-50" iconColor="text-green-600" />
          <InfoTile icon={<FaTint />} label="Blood Group" value={bloodGroup} iconBg="bg-rose-50" iconColor="text-rose-600" />
        </div>

        {/* MESSAGE */}
        {requestMessage && (
          <>
            <DividerLabel label="Message" />
            <div className="bg-white/80 backdrop-blur border border-gray-100 rounded-2xl p-4 shadow-sm">
              <p className="text-xs text-gray-400 flex items-center gap-2 mb-2">
                <FaCommentDots />
                Request message
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                {requestMessage}
              </p>
            </div>
          </>
        )}

        {/* REQUESTER */}
        <DividerLabel label="Requester" />
        <div className="bg-white/80 backdrop-blur border border-gray-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-700">
            {initials(requesterName)}
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900">{requesterName}</p>
            <p className="text-sm text-blue-600 truncate">{requesterEmail}</p>
          </div>

          <div className="text-xs text-gray-400">
            {formatDate(createdAt)}
          </div>
        </div>

        {/* DONOR */}
        <DividerLabel label="Donor" />
        {donorName ? (
          <div className="bg-white/80 border border-gray-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center font-semibold text-green-700">
              {initials(donorName)}
            </div>

            <div>
              <p className="font-medium text-gray-900">{donorName}</p>
              <p className="text-sm text-blue-600">{donorEmail}</p>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-5 flex items-center gap-4">
            <FaQuestionCircle className="text-gray-300 text-2xl" />
            <div>
              <p className="text-gray-500 font-medium">No donor assigned yet</p>
              <p className="text-xs text-gray-400">
                Donor info will appear after acceptance
              </p>
            </div>
          </div>
        )}

      
        

      </div>
    </div>
  );
};

export default MyDonationDetails;