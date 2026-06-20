
import AdminVolunteerDashboard from "@/component/dashboard/AdminVolunteerDashboard";
import DonorDashboard from "@/component/dashboard/DonorDashboard";
import { getDonationByUserId } from "@/lib/api/userDonations";
import { getSession } from "@/lib/api/userSession";
import { redirect } from "next/navigation";


const Dashboard =async () => {
    const user = await getSession()
      const data = await getDonationByUserId(user?.id)
      const {result: donations}=data
      const initialDonations=donations.slice(0,3)
      console.log(donations);

    if(!user){
        redirect("/login")
    }
  
        
         if (user.role === "donor") {
    return <DonorDashboard user={user} donations={initialDonations} />;
  }
    // ── Admin & Volunteer — same dashboard ─────────────────────────────
  if (user.role === "admin" || user.role === "volunteer") {
    return <AdminVolunteerDashboard user={user} donations={initialDonations} />;
  }
    
  
};

export default Dashboard;