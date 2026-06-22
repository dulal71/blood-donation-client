import DonationRequestTable from "../DonationRequestTable";
import Link from "next/link";
import { FaHandHoldingHeart } from "react-icons/fa";
import { HiOutlineHandRaised } from "react-icons/hi2";

const DonorDashboard = ({ donations,user }) => {
 
    return (
    <div className="p-6">

      {/* Welcome */}
     <div className="mb-8">
  <div className="flex items-center gap-3">
    <HiOutlineHandRaised className="text-3xl text-red-500" />
    <div>
      <h1 className="text-2xl font-bold text-gray-900">
        Welcome back, {user.name}!
      </h1>
      <p className="text-sm text-gray-500 mt-1">
        Manage your donation requests and continue making a difference.
      </p>
    </div>
  </div>
</div>

      {/* Recent Donations */}
      {donations.length > 0 ? (
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Donation Requests
          </h2>

          <DonationRequestTable donations={donations} />

          <div className="mt-6 flex justify-center">
            <Link
              href="/dashboard/my-donation-requests"
              className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl transition-colors duration-150"
            >
              View My All Requests
            </Link>
          </div>
        </div>
      ) : (

        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <FaHandHoldingHeart size={28} className="text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-1">
            No Donation Requests Yet
          </h3>
          <p className="text-sm text-gray-400 mb-6 max-w-xs">
            You haven't made any donation requests. Create your first request now.
          </p>
          <Link
            href="/dashboard/create-donation-request"
            className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl transition-colors duration-150"
          >
            Create Donation Request
          </Link>
        </div>

      )}

    </div>
  );
};

export default DonorDashboard;