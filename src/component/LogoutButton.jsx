"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";
import { toast } from "sonner";

const LogoutButton = ({setDesktopDropdownOpen = null}) => {
    const router = useRouter()
    const handleLogout = async () => {
    try {
      await authClient.signOut();
      

      if (typeof setDesktopDropdownOpen === "function") {
        setDropdownOpen(false);
      }
      
      toast.success("Logged Out! ");
      router.push('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
    return (
        <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/5 transition cursor-pointer"
                  >
                    <FaSignOutAlt className="text-sm shrink-0 text-red-400" />
                    <span>Log Out</span>
                  </button>
    );
};

export default LogoutButton;