import { getDonationsById } from "@/lib/api/donationById";
import {
  FaHospital, FaMapMarkerAlt, FaMap, FaHome,
  FaTint, FaClock, FaCommentDots, FaUserAlt,
  FaCheckCircle, FaCalendarAlt, FaQuestionCircle
} from "react-icons/fa";

const statusConfig = {
  pending:    { label: "Pending",     cls: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" },
  inprogress: { label: "In Progress", cls: "bg-blue-500/10 text-blue-400 border border-blue-500/20" },
  done:       { label: "Done",        cls: "bg-green-500/10 text-green-400 border border-green-500/20" },
};

function DividerLabel({ label }) {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-gray-200" />
      <span className="text-[11px] font-medium uppercase tracking-widest text-gray-400 whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}

function InfoTile({ icon, label, value, iconBg, iconColor }) {
  return (
    <div className="flex gap-3 items-start bg-white border border-gray-100 rounded-xl p-3.5">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg} ${iconColor}`}>
        {icon}
      </div>
      <div>
        <p className="text-[11px] text-gray-400 mb-1 tracking-wide">{label}</p>
        <p className="text-[15px] font-medium text-gray-800">{value || "—"}</p>
      </div>
    </div>
  );
}

const MyDonationDetails = async ({ params }) => {
  const { requestId } = await params;
  const donation = await getDonationsById(requestId);

  const {
    recipientName, bloodGroup, hospitalName, fullAddress,
    recipientDistrict, recipientUpazila, donationDate, donationTime,
    requestMessage, requesterName, requesterEmail,
    donorName, donorEmail, status,
    requesterId, _id, createdAt,
  } = donation;

  const statusInfo = statusConfig[status] || { label: status, cls: "bg-gray-100 text-gray-500" };

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "—";

  const formatTime = (t) => {
    if (!t) return "—";
    const [h, m] = t.split(":");
    const date = new Date();
    date.setHours(+h, +m);
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  };

  const initials = (name) =>
    name ? name.trim().split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase() : "?";

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">

      {/* Hero */}
      <div className="bg-[#1a1a2e] rounded-2xl p-5 mb-4 flex items-start gap-4">
        <div className="w-[76px] h-[76px] rounded-full border-[2.5px] border-[#e63946] flex items-center justify-center flex-shrink-0">
          <div className="w-[60px] h-[60px] rounded-full bg-[#e63946] flex items-center justify-center">
            <span className="text-[22px] font-medium text-white">{bloodGroup}</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-medium text-white mb-1">{recipientName}</h1>
          <p className="text-sm text-slate-400 mb-3 flex items-center gap-1.5">
            <FaHospital size={13} />
            {hospitalName} · {fullAddress}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusInfo.cls}`}>
              <FaCheckCircle size={11} /> {statusInfo.label}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20">
              <FaCalendarAlt size={11} /> {formatDate(donationDate)}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
              <FaClock size={11} /> {formatTime(donationTime)}
            </span>
          </div>
        </div>
      </div>

      {/* Recipient details */}
      <DividerLabel label="Recipient details" />
      <div className="grid grid-cols-2 gap-2.5 mb-3">
        <InfoTile
          icon={<FaMapMarkerAlt size={15} />}
          label="District"
          value={recipientDistrict}
          iconBg="bg-red-50"
          iconColor="text-red-600"
        />
        <InfoTile
          icon={<FaMap size={15} />}
          label="Upazila"
          value={recipientUpazila}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <InfoTile
          icon={<FaHome size={15} />}
          label="Full address"
          value={fullAddress}
          iconBg="bg-green-50"
          iconColor="text-green-600"
        />
        <InfoTile
          icon={<FaTint size={15} />}
          label="Blood group"
          value={bloodGroup}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />
      </div>

      {/* Request message */}
      {requestMessage && (
        <div className="bg-gray-50 border-l-[3px] border-[#e63946] rounded-r-xl px-4 py-3.5 mb-3">
          <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
            <FaCommentDots size={12} /> Request message
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">{requestMessage}</p>
        </div>
      )}

      {/* Requester */}
      <DividerLabel label="Requester" />
      <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 mb-3">
        <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-[16px] font-medium text-blue-700 flex-shrink-0">
          {initials(requesterName)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[16px] font-medium text-gray-900">{requesterName}</p>
          <p className="text-sm text-blue-600 mt-0.5 truncate">{requesterEmail}</p>
        </div>
        <div className="text-right text-[11px] text-gray-400 leading-snug flex flex-col items-end gap-1">
          <FaClock size={11} />
          <span>{formatDate(createdAt)}</span>
        </div>
      </div>

      {/* Donor */}
      <DividerLabel label="Donor" />
      {donorName ? (
        <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 mb-3">
          <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center text-[16px] font-medium text-green-700 flex-shrink-0">
            {initials(donorName)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[16px] font-medium text-gray-900">{donorName}</p>
            <p className="text-sm text-blue-600 mt-0.5 truncate">{donorEmail}</p>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-4 flex items-center gap-4 mb-3">
          <div className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 text-gray-300">
            <FaQuestionCircle size={20} />
          </div>
          <div>
            <p className="text-[15px] font-medium text-gray-500">No donor assigned yet</p>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Donor name and email will appear once someone accepts this request.
            </p>
          </div>
        </div>
      )}

      {/* System info */}
      <DividerLabel label="System info" />
      <div className="flex gap-2.5">
        {[{ label: "Request ID", val: _id }, { label: "Requester ID", val: requesterId }].map(({ label, val }) => (
          <div key={label} className="flex-1 bg-gray-50 rounded-xl p-3">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1.5">{label}</p>
            <p className="text-[11px] font-mono text-gray-500 break-all leading-relaxed">{val}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default MyDonationDetails;