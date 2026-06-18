

import { LuLayoutDashboard, LuUser, LuCalendarDays, LuSettings, LuCalendar, LuHistory, LuCirclePlus, LuLogOut, LuChrome } from "react-icons/lu";
import { MdOutlineCreditCard } from "react-icons/md";
import { FiUsers, FiClipboard } from "react-icons/fi";
import { IoBarChartOutline } from "react-icons/io5";
import {Button, Drawer} from "@heroui/react";

import Link from "next/link";
import Logo from "../Logo";
import { ImMenu } from "react-icons/im";
import Image from "next/image";
import LogoutButton from "../LogoutButton";
import { getSession } from "@/lib/api/userSession";


const DashboardSidebar =async ({user}) => {
  
const adminLinks = [
  { icon: LuLayoutDashboard, href: "/dashboard", label: "Admin Overview" },
  { icon: FiUsers, href: "/dashboard/all-users", label: "All Users" },
  { icon: FiClipboard, href: "/dashboard/all-blood-donation-request", label: "All Donation Requests" },
];

const donorLinks = [
  { icon: LuLayoutDashboard, href: "/dashboard", label: "Overview" },
  { icon: LuUser, href: "/dashboard/profile", label: "Profile Update" },
  { icon: LuCalendarDays, href: "/dashboard/my-donation-requests", label: "My Donation Requests" },
  { icon: LuCirclePlus, href: "/dashboard/create-donation-request", label: "Create Donation Request" },
];

const volunteerLinks = [
  { icon: LuLayoutDashboard, href: "/dashboard", label: "Volunteer Overview" },
  { icon: FiClipboard, href: "/dashboard/all-blood-donation-request", label: "All Donation Requests" },
];
const userNavLinks = {
  admin: adminLinks,
  donor: donorLinks,
  volunteer :volunteerLinks
};
const navItems=userNavLinks[user?.role || 'donor']
  const navLink=<>
  <div className="mt-auto py-5 border-b border-default  flex items-center gap-3 px-3">
      {user?.image ? (
  <Image
    width={60} 
    height={60}
    src={user.image} 
    alt={user?.name || "User"} 
   
    className="size-15 rounded-full object-cover border border-default"
  />
) : (
  
  <div className="size-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold text-lg">
    {user?.name ? user.name[0].toUpperCase() : "U"}
  </div>
)}
      
      <div className="flex flex-col min-w-0">
        <span className="text-xl font-medium text-foreground truncate">
          {user?.name || "User Name"}
        </span>
        <span className="text-md text-muted truncate">
          {user?.role }
        </span>
      </div>
    </div>
  <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    href={item.href}
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </Link>
                ))}
                <div className="my-2 border-t border-default/50" />
               
                <Link
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
        href="/"
      >
        <LuChrome className="size-5 text-muted" />
        Back to Home
      </Link>

      {/* Sign Out Button/Link */}
   
      <LogoutButton ></LogoutButton>
              </nav>
  </>
    return (
     <>
  <div className="flex min-h-screen">
    
   {/* desktop sidebar */}
    <aside className="hidden w-64 shrink-0 border-r border-zinc-200 p-4 lg:block">
      {navLink}
    </aside>

  {/* Mobile menu */}
    <div className="lg:hidden w-full">
      <Drawer>
        <div className="w-full border-b border-zinc-200 p-4">
          <Button variant="outline" className="w-full flex items-center justify-center gap-2">
            <ImMenu /> Menu
          </Button>
        </div>
        
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Body>
                {navLink}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </div> 
  </div>
</>
        
    );
};

export default DashboardSidebar;