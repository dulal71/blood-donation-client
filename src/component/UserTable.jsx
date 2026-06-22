'use client';

import { useState, useMemo,useTransition } from "react";
import Image from "next/image";
import { FaHandshakeSimple } from "react-icons/fa6";
import { MdAdminPanelSettings, MdBlock, MdCheckCircle } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { updateUserRole } from "@/lib/action/updateUserRole";
import { updateUserStatus } from "@/lib/action/updateUserStatus";

function getInitials(name = "") {
  return name.split(" ").map((w) => w[0]).join("").substring(0, 2).toUpperCase();
}

const ROLES = ["all", "donor", "volunteer", "admin"];
const STATUSES = ["all", "active", "blocked"];

export default function UserTable({ users = [], total = 0, onBlock, onUnblock, onMakeVolunteer, onMakeAdmin, onMakeDonor }) {
  // Modal confirmation states
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
   const [success, setSuccess] = useState(false);
    const [pendingChange, setPendingChange] = useState(null);
    const [statusChange, setStatusChange] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
 const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === "all" || u.role === roleFilter;
      const matchStatus = statusFilter === "all" || u.status === statusFilter;
      return matchSearch && matchRole && matchStatus;
    });
  }, [users, search, roleFilter, statusFilter]);
   
  const handleStatusChange = async (userId, newStatus) => {
      setStatusChange({userId,newStatus})
      setSuccess(true)  
    };
    const confirmStatusChange = () => {
        if (!statusChange) return;

        startTransition(async () => {
            try {
                await updateUserStatus(statusChange.userId, statusChange.newStatus);
                // Close modal on success
                setSuccess(false);
                setStatusChange(null);
            } catch (error) {
                console.error("Failed to update user role:", error);
            }
        });
    };

   const initiateRoleChange = (userId, userName, newRole) => {
        setPendingChange({ userId, userName, newRole });
        setIsConfirmOpen(true);
    };
   
    // Executes the Server Action upon confirmation inside a transition context
    const confirmRoleChange = () => {
        if (!pendingChange) return;

        startTransition(async () => {
            try {
                await updateUserRole(pendingChange.userId, pendingChange.newRole);
                // Close modal on success
                setIsConfirmOpen(false);
                setPendingChange(null);
            } catch (error) {
                console.error("Failed to update user role:", error);
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
            <option key={r} value={r}>{r === "all" ? "All Roles" : r.charAt(0).toUpperCase() + r.slice(1)}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none cursor-pointer"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s === "all" ? "All Status" : s.charAt(0).toUpperCase() + s.slice(1)}</option>
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
                    <span className="px-2 py-1 text-xs rounded bg-gray-100 capitalize">{user.role}</span>
                  </td>

                  {/* STATUS */}
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs rounded capitalize ${
                      user.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {user.status}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="p-1 text-right relative">
                    <button
                      onClick={(e) => { e.stopPropagation(); setOpenMenu((prev) => (prev === user.id ? null : user.id)); }}
                      className="p-1.5 hover:bg-gray-100 rounded-full transition"
                    >
                      <HiDotsVertical className="text-gray-500" />
                    </button>

                    {openMenu === user.id && (
                      <div
                        className="absolute right-0 mt-1 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 text-xs py-1 w-36"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <p className="px-3 py-1.5 text-gray-400 font-medium">Status</p>
                        {user.status === "active" ? (
                          <button  onClick={() => handleStatusChange(user.id, 'block')} className="flex items-center gap-2 w-full px-3 py-2 text-red-600 hover:bg-red-50 transition">
                            <MdBlock size={14} /> Block
                          </button>
                        ) : (
                          <button onClick={() => handleStatusChange(user.id, 'active')} className="flex items-center gap-2 w-full px-3 py-2 text-green-600 hover:bg-green-50 transition">
                            <MdCheckCircle size={14} /> Unblock
                          </button>
                        )}

                        <div className="border-t my-1" />
                        <p className="px-3 text-gray-400 font-medium">Role</p>

                        {user.role === "donor" && (
                          <>
                            <button onClick={() => initiateRoleChange(user.id, user.name, 'volunteer')} className="flex items-center gap-2 w-full px-3 py-2 text-black hover:bg-violet-50 transition">
                              <FaHandshakeSimple size={14} /> Volunteer
                            </button>
                            <button onClick={() => initiateRoleChange(user.id, user.name, 'admin')} className="flex items-center gap-2 w-full px-3 py-2 text-black hover:bg-violet-50 transition">
                              <MdAdminPanelSettings size={14} /> Make Admin
                            </button>
                          </>
                        )}

                        {user.role === "volunteer" && (
                          <>
                            <button onClick={() => initiateRoleChange(user.id, user.name, 'donor')} className="flex items-center gap-2 w-full px-3 py-2 text-black hover:bg-violet-50 transition">
                              <MdAdminPanelSettings size={14} /> Donor
                            </button>
                            <button onClick={() => initiateRoleChange(user.id, user.name, 'admin')} className="flex items-center gap-2 w-full px-3 py-2 text-black hover:bg-violet-50 transition">
                              <MdAdminPanelSettings size={14} /> Make Admin
                            </button>
                          </>
                        )}

                        {user.role === "admin" && (
                          <>
                            <button onClick={() => initiateRoleChange(user.id, user.name, 'donor')} className="flex items-center gap-2 w-full px-3 py-2 text-black hover:bg-violet-50 transition">
                              <MdAdminPanelSettings size={14} /> Donor
                            </button>
                            <button onClick={() => initiateRoleChange(user.id, user.name, 'volunteer')} className="flex items-center gap-2 w-full px-3 py-2 text-black hover:bg-violet-50 transition">
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
       {isConfirmOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/60">
                    <div className="w-full max-w-sm bg-white border border-zinc-800 rounded-xl p-6 shadow-2xl space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-base font-semibold text-red-500">
                                Confirm Role Change
                            </h3>
                            <p className="text-xs text-zinc-800 leading-relaxed">
                                Are you sure you want to change the role of <span className="text-red-600 font-medium">{pendingChange?.userName}</span> to <span className="text-red-600 font-medium capitalize">{pendingChange?.newRole}</span>? This alters system access and application flow parameters permissions immediately.
                            </p>
                        </div>

                        <div className="flex items-center justify-end gap-3 text-xs font-medium">
                            <button
                                disabled={isPending}
                                onClick={() => { setIsConfirmOpen(false); setPendingChange(null); }}
                                className="px-4 py-2 bg-red-600 text-white hover:text-zinc-200  hover:bg-red-800 border  rounded-md transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={isPending}
                                onClick={confirmRoleChange}
                                className="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-500 rounded-md transition-colors shadow-lg shadow-indigo-600/10 disabled:opacity-50 min-w-[76px] flex items-center justify-center"
                            >
                                {isPending ? (
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    'Confirm'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
       {success && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/60">
                    <div className="w-full max-w-sm bg-white border border-zinc-800 rounded-xl p-6 shadow-2xl space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-base font-semibold text-red-500">
                                Confirm Status Change
                            </h3>
                            <p className="text-xs text-zinc-800 leading-relaxed">
                                Are you sure you want to change the role of <span className="text-red-600 font-medium">{statusChange?.userName}</span> to <span className="text-red-600 font-medium capitalize">{statusChange?.newStatus}</span>? This alters system access and application flow parameters permissions immediately.
                            </p>
                        </div>

                        <div className="flex items-center justify-end gap-3 text-xs font-medium">
                            <button
                                disabled={isPending}
                                onClick={() => { setIsConfirmOpen(false); setPendingChange(null); }}
                                className="px-4 py-2 bg-red-600 text-white hover:text-zinc-200  hover:bg-red-800 border  rounded-md transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={isPending}
                                onClick={confirmStatusChange}
                                className="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-500 rounded-md transition-colors shadow-lg shadow-indigo-600/10 disabled:opacity-50 min-w-[76px] flex items-center justify-center"
                            >
                                {isPending ? (
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    'Confirm'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
    </div>
  );
}