import { getDonationsById } from '@/lib/api/donationById';
import React from 'react';
import { FaTint, FaUser, FaHospital, FaMapMarkerAlt, FaEnvelope, FaCalendarAlt, FaClock, FaComment } from 'react-icons/fa';

const StatusBadge = ({ status }) => {
  const styles = {
    pending: { bg: '#FAEEDA', color: '#854F0B' },
    inprogress: { bg: '#E6F1FB', color: '#185FA5' },
    done: { bg: '#EAF3DE', color: '#3B6D11' },
  };
  const s = styles[status] || styles.pending;
  return (
    <span
      style={{ background: s.bg, color: s.color }}
      className="text-xs font-medium px-3 py-1 rounded-full capitalize"
    >
      {status}
    </span>
  );
};

const InfoRow = ({ icon, label, value, sub }) => (
  <div className="flex gap-3 items-start">
    <span className="text-gray-400 mt-1 text-sm shrink-0">{icon}</span>
    <div>
      <p className="text-xs text-gray-500 mb-0.5">{label}</p>
      <p className="text-sm font-medium text-gray-900">{value}</p>
      {sub && <p className="text-xs text-gray-400">{sub}</p>}
    </div>
  </div>
);

const DonationDetails = async ({ params }) => {
  const { donationId } = await params;
  const donation = await getDonationsById(donationId);
  console.log(donation);

  const {
    bloodGroup,
    donationDate,
    donationTime,
    fullAddress,
    hospitalName,
    recipientDistrict,
    recipientName,
    recipientUpazila,
    requestMessage,
    requesterEmail,
    requesterName,
    status,
  } = donation;

  const initials = requesterName
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const formattedDate = new Date(donationDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <FaTint className="text-red-500 text-2xl" />
        <h1 className="text-xl font-medium text-gray-900">Donation request details</h1>
        <div className="ml-auto">
          <StatusBadge status={status} />
        </div>
      </div>

      {/* Blood group + Date */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">Blood group</p>
          <p className="text-3xl font-medium text-red-500">{bloodGroup}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">Donation date & time</p>
          <div className="flex items-center gap-1.5 mt-1">
            <FaCalendarAlt className="text-gray-400 text-xs" />
            <p className="text-sm font-medium text-gray-900">{formattedDate}</p>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <FaClock className="text-gray-400 text-xs" />
            <p className="text-xs text-gray-400">{donationTime}</p>
          </div>
        </div>
      </div>

      {/* Recipient info */}
      <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-3">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Recipient info</p>
        <InfoRow icon={<FaUser />} label="Recipient name" value={recipientName} />
        <InfoRow icon={<FaHospital />} label="Hospital" value={hospitalName} />
        <InfoRow
          icon={<FaMapMarkerAlt />}
          label="Location"
          value={fullAddress}
          sub={`${recipientUpazila}, ${recipientDistrict}`}
        />
      </div>

      {/* Requester info */}
      <div className="bg-white border border-gray-100 rounded-xl p-4">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Requester info</p>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-sm font-medium text-blue-600 shrink-0">
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <FaUser className="text-gray-400 text-xs" />
              <p className="text-sm font-medium text-gray-900">{requesterName}</p>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <FaEnvelope className="text-gray-400 text-xs" />
              <p className="text-xs text-gray-400">{requesterEmail}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Request message */}
      <div className="bg-white border border-gray-100 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <FaComment className="text-gray-400 text-sm" />
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Request message</p>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">{requestMessage}</p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 pt-2">
        <button className="flex-1 py-2.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
          Accept
        </button>
        <button className="flex-1 py-2.5 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg text-sm hover:bg-gray-100 transition-colors">
          Edit
        </button>
        <button className="flex-1 py-2.5 bg-gray-50 text-red-500 border border-red-100 rounded-lg text-sm hover:bg-red-50 transition-colors">
          Delete
        </button>
      </div>
    </div>
  );
};

export default DonationDetails;