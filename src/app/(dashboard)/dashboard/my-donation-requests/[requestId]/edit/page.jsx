import DonationEditForm from "@/component/DonationEditForm";
import { getDonationsById } from "@/lib/api/donationById";
import { getSession } from "@/lib/api/userSession";

const EditDonation = async ({ params }) => {
  const { requestId } = await params;
  const donation = await getDonationsById(requestId);
const user = await getSession()
  return (
    <div className="max-w-7xl mx-auto p-x2 md:px-4 py-8">
      
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Edit Donation Request
        </h1>
        <p className="text-muted-foreground mt-1">
          Update your donation request details below
        </p>
        <div className="h-1 w-16 bg-red-500 rounded mt-3" />
      </div>

      <div>
        <DonationEditForm donation={donation} user={user} />
      </div>
    </div>
  );
};

export default EditDonation;