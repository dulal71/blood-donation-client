import RequestConfirmModal from '@/component/RequestConfirmModal';
import { getDonationsById } from '@/lib/api/donationById';
import { getSession } from '@/lib/api/userSession';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { FaTint, FaUser, FaHospital, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaComment } from 'react-icons/fa';

// Status Badge Component
const StatusBadge = ({ status }) => {
  const styles = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    inprogress: 'bg-blue-50 text-blue-700 border-blue-200',
    done: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };
  return (
    <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${styles[status] || styles.pending}`}>
      {status}
    </span>
  );
};

const DonationDetails = async ({ params }) => {
  const user = await getSession();
  const { donationId } = await params;
  const donation = await getDonationsById(donationId);

  if (!user) redirect(`/login?redirect=/dashboard/${donationId}`);
  if (!donation) return <div className="p-10 text-center">Request not found.</div>;

  const { bloodGroup, donationDate, donationTime, fullAddress, hospitalName, recipientDistrict, recipientUpazila, requestMessage, requesterName, status } = donation;
  const formattedDate = new Date(donationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-8">
      
      {/* SECTION 1: Header */}
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Donation Request</h1>
          <p className="text-sm text-gray-500">Details about the blood donation need</p>
        </div>
        <StatusBadge status={status} />
      </header>

      {/* SECTION 2: Overview (Blood & Time) */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-red-600 rounded-2xl p-6 text-white shadow-lg">
          <p className="text-red-200 text-xs font-semibold uppercase">Blood Group</p>
          <p className="text-4xl font-black mt-1">{bloodGroup}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <p className="text-gray-400 text-xs font-semibold uppercase mb-3">Schedule</p>
          <div className="flex items-center gap-2 text-sm text-gray-800 mb-2"><FaCalendarAlt className="text-red-500"/> {formattedDate}</div>
          <div className="flex items-center gap-2 text-sm text-gray-800"><FaClock className="text-red-500"/> {donationTime}</div>
        </div>
      </section>

      {/* SECTION 3: Recipient Details */}
      <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 mb-5 flex items-center gap-2">
          <FaHospital className="text-red-400"/> Recipient Details
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
             <div className="p-2 bg-gray-50 rounded-lg"><FaUser className="text-gray-400"/></div>
             <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold">Name</p>
                <p className="text-sm font-semibold text-gray-800">{donation.recipientName}</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="p-2 bg-gray-50 rounded-lg"><FaHospital className="text-gray-400"/></div>
             <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold">Hospital</p>
                <p className="text-sm font-semibold text-gray-800">{hospitalName}</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="p-2 bg-gray-50 rounded-lg"><FaMapMarkerAlt className="text-gray-400"/></div>
             <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold">Address</p>
                <p className="text-sm font-semibold text-gray-800">{fullAddress}, {recipientUpazila}, {recipientDistrict}</p>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Requester Note */}
      <section className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <FaComment /> Requester Note
        </h3>
        <p className="text-sm text-gray-700 italic">"{requestMessage}"</p>
        <p className="text-[10px] font-bold text-gray-900 mt-4">— {requesterName}</p>
      </section>

      {/* SECTION 5: Footer Actions */}
      <footer className="flex gap-4 pt-4">
        <div className="flex-1"><RequestConfirmModal donation={donation} user={user} /></div>
        <Link href="/donations-requests" className="px-8 py-3 bg-white border border-gray-200 text-gray-600 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-all">
          Back
        </Link>
      </footer>
    </div>
  );
};

export default DonationDetails;