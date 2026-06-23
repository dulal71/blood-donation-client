'use client';

import { useState, useMemo, useTransition } from "react";
import Image from "next/image";
import { FaHandshakeSimple } from "react-icons/fa6";
import { MdAdminPanelSettings, MdBlock, MdCheckCircle } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { updateUserRole } from "@/lib/action/updateUserRole";
import { unblockUser, updateUserStatus } from "@/lib/action/updateUserStatus";
import { toast } from "sonner";

function getInitials(name = "") {
  return name.split(" ").map((w) => w[0]).join("").substring(0, 2).toUpperCase();
}

const ROLES = ["all", "donor", "volunteer", "admin"];
const BANNED_FILTERS = ["all", "active", "blocked"];

export default function UserTable({ users = [], total = 0 }) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [bannedFilter, setBannedFilter] = useState("all");
  const [openMenu, setOpenMenu] = useState(null);
const [modal, setModal] = useState({ isOpen: false, type: "", data: null });
  const [isPending, startTransition] = useTransition();
  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === "all" || u.role === roleFilter;
      const matchBanned =
        bannedFilter === "all" ||
        (bannedFilter === "active" && u.banned === false) ||
        (bannedFilter === "blocked" && u.banned === true);
      return matchSearch && matchRole && matchBanned;
    });
  }, [users, search, roleFilter, bannedFilter]);


const handleConfirm = async () => {
    if (!modal.data) return;
    startTransition(async () => {
      try {
        if (modal.type === "role") {
        const res =   await updateUserRole(modal.data.userId, modal.data.newRole);
       if(res){
        toast.success('Update Role Successfully')
       }
      } else {
       const res=   await updateUserStatus(modal.data.userId,modal.data.newStatus);
         if(res){
        toast.success('Update status Successfully')
       }
        }
        
        setModal({ isOpen: false, type: "", data: null });
        setOpenMenu(null);
      } catch (error) {
        console.error("Failed:", error);
      }
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen" onClick={() => setOpenMenu(null)}>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">All Users</h1>
        <span className="text-sm text-gray-400">{total} total</span>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 flex-1 min-w-[200px]">
          <HiMagnifyingGlass className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-sm outline-none w-full bg-transparent"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none cursor-pointer"
        >
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r === "all" ? "All Roles" : r.charAt(0).toUpperCase() + r.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={bannedFilter}
          onChange={(e) => setBannedFilter(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none cursor-pointer"
        >
          {BANNED_FILTERS.map((s) => (
            <option key={s} value={s}>
              {s === "all" ? "All Status" : s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <div className="max-w-5xl mx-auto bg-white rounded-xl border overflow-visible">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-3">User</th>
              <th className="text-left p-3">Role</th>
              <th className="text-left p-3">Status</th>
              <th className="text-right p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-6 text-gray-400">
                  No users found
                </td>
              </tr>
            ) : (
              filtered.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">

                  {/* USER */}
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold bg-gray-100">
                        {user.image ? (
                          <Image src={user.image} width={36} height={36} className="rounded-full" alt="user" />
                        ) : (
                          getInitials(user.name)
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-zinc-500">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* ROLE */}
                  <td className="p-3">
                   <span className={`px-2 py-1 text-xs rounded capitalize ${
  user.role === "admin"
    ? "bg-amber-100 text-amber-700"
    : user.role === "volunteer"
    ? "bg-green-100 text-green-700"
    : "bg-gray-100 text-gray-600"
}`}>
  {user.role}
</span>
                  </td>


                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs rounded capitalize ${
                      user.status === 'blocked' ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                    }`}>
                      {user.status}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="p-1 text-right relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenu((prev) => (prev === user.id ? null : user.id));
                      }}
                      className="p-1.5 hover:bg-gray-100 rounded-full transition"
                    >
                      <HiDotsVertical className="text-gray-500" />
                    </button>

                    {openMenu === user.id && (
                      <div
                        className="absolute right-0 mt-1 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 text-xs py-1 w-36"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* STATUS ACTIONS */}
                        <p className="px-3 py-1.5 text-gray-400 font-medium">Status</p>
                           <button
              onClick={() => {
              setModal({
      isOpen: true,
      type: "status",

      data: { userId: user.id, newStatus: user.status === 'blocked' ? 'active' : 'blocked' }
                 });
               setOpenMenu(null);
                   }}
              className={`flex items-center gap-2 w-full px-3 py-2 transition ${
    user.status === 'blocked' 
      ? "text-green-600 hover:bg-green-50" 
      : "text-red-600 hover:bg-red-50"
  }`}
>
  {user.status === 'blocked' ? (
    <>
      <MdCheckCircle size={14} /> Unblock
    </>
  ) : (
    <>
      <MdBlock size={14} /> Block
    </>
  )}
                            </button>
                     <div className="border-t my-1" />

                        {/* ROLE ACTIONS */}
                        <p className="px-3 text-gray-400 font-medium">Role</p>

                        {user.role === "donor" && (
                        <>
    <button 
      onClick={() => setModal({ 
        isOpen: true, 
        type: "role", 
        data: { userId: user.id, userName: user.name, newRole: "volunteer" } 
      })}
      className="flex items-center gap-2 w-full px-3 py-2 text-black hover:bg-violet-50 transition"
    >
      <FaHandshakeSimple size={14} /> Volunteer
    </button>
    
    <button 
      onClick={() => setModal({ 
        isOpen: true, 
        type: "role", 
        data: { userId: user.id, userName: user.name, newRole: "admin" } 
      })}
      className="flex items-center gap-2 w-full px-3 py-2 text-black hover:bg-violet-50 transition"
    >
      <MdAdminPanelSettings size={14} /> Make Admin
    </button>
                          </>
                         )}

                       {user.role === "volunteer" && (
                       <>
    <button 
      onClick={() => setModal({
        isOpen: true,
        type: "role",
        data: { userId: user.id, userName: user.name, newRole: "donor" }
      })}
      className="flex items-center gap-2 w-full px-3 py-2 text-black hover:bg-violet-50 transition"
    >
      <MdAdminPanelSettings size={14} /> Donor
    </button>
    <button 
      onClick={() => setModal({
        isOpen: true,
        type: "role",
        data: { userId: user.id, userName: user.name, newRole: "admin" }
      })}
      className="flex items-center gap-2 w-full px-3 py-2 text-black hover:bg-violet-50 transition"
    >
      <MdAdminPanelSettings size={14} /> Make Admin
    </button>
                        </>
                         )}

                        {user.role === "admin" && (
                         <>
    <button 
      onClick={() => setModal({
        isOpen: true,
        type: "role",
        data: { userId: user.id, userName: user.name, newRole: "donor" }
      })}
      className="flex items-center gap-2 w-full px-3 py-2 text-black hover:bg-violet-50 transition"
    >
      <MdAdminPanelSettings size={14} /> Donor
    </button>
    <button 
      onClick={() => setModal({ 
        isOpen: true, 
        type: "role", 
        data: { userId: user.id, userName: user.name, newRole: "volunteer" } 
      })}
      className="flex items-center gap-2 w-full px-3 py-2 text-black hover:bg-violet-50 transition"
    >
      <FaHandshakeSimple size={14} /> Volunteer
    </button>
                          </>
                          )}
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/60">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="font-semibold text-red-600 mb-2">Confirm Action</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to {modal.type === "role" ? "change this user's role" : "update this user's status"}?
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setModal({ ...modal, isOpen: false })}
                className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
              >Cancel</button>
              <button 
                disabled={isPending}
                onClick={handleConfirm}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                {isPending ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
   
    </div>
  );
}