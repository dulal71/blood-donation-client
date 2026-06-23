

import DonorDashboard from "@/component/dashboard/DonorDashboard";

import { getSession } from "@/lib/api/userSession";
import { redirect } from "next/navigation";

import AdminDashboard from "@/component/dashboard/AdminDashboard";
import VolunteerDashboard from "@/component/dashboard/VolunteerDashboard";


const Dashboard =async () => {
    const user = await getSession()
      
     

    if(!user){
        redirect("/login")
    }
  
        
         if (user.role === "donor") {
    return <DonorDashboard user={user} />;
  }
    // ── Admin & Volunteer — same dashboard ─────────────────────────────
  if (user.role === "admin") {
    return <AdminDashboard user={user}  />;
  }
  if(user.role === 'volunteer'){
    return <VolunteerDashboard user={user}></VolunteerDashboard>
  }
    
  
};

export default Dashboard;