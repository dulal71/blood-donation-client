"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser, FaThLarge, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import Logo from "./Logo";
import { useSession } from "@/lib/auth-client";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false); // ডেস্কটপ ড্রপডাউনের স্টেট
  const dropdownRef = useRef(null);
const {data :session}=useSession()
const user = session?.user
  

  const isLoggedIn = user ? true : false;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 // control dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDesktopDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Donations Requests", href: "/donations-requests" },
   
  ];
if(user){
   navLinks.push({
    name: "Fundraising",
    href: "/funding-page",
  });
}
  return (
    <nav className={`sticky top-0 transition-all duration-300 z-50 border-b bg-white border-gray-100 px-4 md:px-[8%] flex items-center ${scrolled ? 'h-[60px] shadow-sm' : 'h-[75px]'}`}>
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        <Logo />

        {/*desktop link*/}
        <div className="hidden sm:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`text-md font-medium transition-colors ${pathname === link.href ? "text-red-700 font-semibold" : "text-gray-700 hover:text-red-700"}`}>{link.name}</Link>
          ))}
        </div>

    
        <div className="flex items-center gap-4">
          
        
          <div className="hidden sm:block">
            {!isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-gray-700 hover:text-red-700 font-semibold text-sm px-2.5 py-2 transition">Login</Link>
                <Link href="/registration" className="font-semibold text-xs bg-red-600 hover:bg-red-700 text-white shadow-md transition h-9 px-4 rounded-xl flex items-center">Sign Up</Link>
              </div>
            ) : (
             
              <div className="relative" ref={dropdownRef}>
               <button
  onClick={() => setDesktopDropdownOpen(!desktopDropdownOpen)}
  className="relative flex items-center justify-center transition-transform hover:scale-105 outline-none focus:outline-none cursor-pointer group"
>
{/* rotate border */}
  <div className="absolute inset-0 rounded-full border-2 border-dashed border-red-500 animate-[spin_8s_linear_infinite]" />

 {/* profile */}
  <div className="p-[3px]"> 
    <Image
      width={40}
      height={40}
      className="w-10 h-10 rounded-full object-cover shadow-sm"
      src={user?.image}
      alt="avatar"
    />
  </div>
</button>

                {desktopDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-55 transition-all">
                    <div className="px-4 py-2.5 border-b border-gray-100 mb-1.5 cursor-default">
                      <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{user?.role} Account</p>
                      <p className="font-bold text-gray-900 text-sm mt-0.5">{user?.name}</p>
                      <p className="text-[11px] text-gray-500 truncate mt-0.5">{user?.email}</p>
                    </div>

                    <Link
                      href="/dashboard"
                      onClick={() => setDesktopDropdownOpen(false)}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
                    >
                      <FaThLarge className="text-gray-400 text-sm shrink-0" />
                      <span>My Dashboard</span>
                    </Link>

                    <LogoutButton></LogoutButton>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMobileMenuOpen(true)} className="sm:hidden text-gray-700 text-2xl p-1 focus:outline-none active:scale-95 transition-transform">
            <FaBars />
          </button>
        </div>
      </div>

    {/* mobile screen overly */}
      <div className={`fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 transition-all duration-300 sm:hidden ${mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
        <div className={`absolute top-0 right-0 w-[75%] h-full bg-white shadow-2xl p-6 flex flex-col justify-between transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-gray-100">
              <Logo />
              <button onClick={() => setMobileMenuOpen(false)} className="text-gray-700 text-2xl"><FaTimes /></button>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className={`text-lg font-semibold py-2 px-3 rounded-xl transition-all ${pathname === link.href ? "bg-red-50 text-red-700" : "text-gray-800 hover:bg-gray-50"}`}>{link.name}</Link>
              ))}
            </div>
          </div>

          {/* User Profile / Auth at Bottom for Mobile */}
          <div className="border-t border-gray-100 pt-6">
            {isLoggedIn ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-xl">
                  <Image width={44} height={44} className="w-11 h-11 rounded-full object-cover border-2 border-red-500" src={user?.image} alt="avatar" />
                  <div className="truncate">
                    <p className="font-bold text-gray-900 text-sm">{user?.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="bg-slate-900 text-white text-xs font-semibold py-3 rounded-xl text-center"><FaThLarge className="inline mr-1" /> Dash</Link>
                  <Link href={`/dashboard/profile`} onClick={() => setMobileMenuOpen(false)} className="border border-gray-200 text-gray-700 text-xs font-semibold py-3 rounded-xl text-center"><FaUser className="inline mr-1" /> Profile</Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2.5 rounded-xl border border-gray-200 font-semibold text-gray-700">Login</Link>
                <Link href="/registration" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2.5 rounded-xl bg-red-600 text-white font-semibold">Sign Up</Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}