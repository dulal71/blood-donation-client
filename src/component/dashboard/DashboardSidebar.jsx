'use client'

import { LuLayoutDashboard, LuUser, LuCalendarDays, LuSettings, LuCalendar, LuHistory, LuCirclePlus, LuLogOut, LuChrome } from "react-icons/lu";
import { MdOutlineCreditCard } from "react-icons/md";
import { FiUsers, FiClipboard } from "react-icons/fi";
import {  IoMenuSharp } from "react-icons/io5";
import {Button, Drawer} from "@heroui/react";

import Link from "next/link";


import Image from "next/image";
import LogoutButton from "../LogoutButton";
import { usePathname } from "next/navigation";



const DashboardSidebar = ({user}) => {
 const pathname = usePathname()
const adminLinks = [
  { icon: LuLayoutDashboard, href: "/dashboard", label: "Admin Overview" },
    { icon: LuUser, href: "/dashboard/profile", label: "Profile" },
      { icon: LuCalendarDays, href: "/dashboard/my-donation-requests", label: "My Donation Requests" },
      { icon: LuCirclePlus, href: "/dashboard/create-donation-request", label: "Create Donation Request" },
  { icon: FiUsers, href: "/dashboard/admin/all-users", label: "All Users" },
  { icon: FiClipboard, href: "/dashboard/admin/all-blood-donation-request", label: "All Donation Requests" },
];

const donorLinks = [
  { icon: LuLayoutDashboard, href: "/dashboard", label: "Overview" },
  { icon: LuUser, href: "/dashboard/profile", label: "Profile" },
  { icon: LuCalendarDays, href: "/dashboard/my-donation-requests", label: "My Donation Requests" },
  { icon: LuCirclePlus, href: "/dashboard/create-donation-request", label: "Create Donation Request" },

];

const volunteerLinks = [
 { icon: LuLayoutDashboard, href: "/dashboard", label: "Overview" },
  { icon: LuUser, href: "/dashboard/profile", label: "Profile" },
  { icon: LuCalendarDays, href: "/dashboard/my-donation-requests", label: "My Donation Requests" },
  { icon: LuCirclePlus, href: "/dashboard/create-donation-request", label: "Create Donation Request" },
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
  href={item.href}
  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
    pathname === item.href
      ? "bg-red-50 text-red-700"
      : "text-gray-800 hover:bg-gray-50"
  }`}
>
  <item.icon className="size-5" />
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
{/* desktop sidebar */}
     <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
            {navLink}
        </aside>
       {/* Mobile and md Screen sidebar */}
        <Drawer>
          <div className="lg:hidden z-30 w-full border-b border-zinc-200 bg-white/90 backdrop-blur-md py-3 px-2">
 <Button className="lg:hidden rounded-none " variant="ghost" >
        <IoMenuSharp size={50} />
        Menu
      </Button>
          </div>
     
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              {navLink}
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
        </>
    
    );
};

export default DashboardSidebar;