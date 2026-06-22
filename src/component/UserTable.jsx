'use client'
import { useState } from "react";

const PER_PAGE = 5;

const AVATAR_COLORS = [
  "bg-violet-100 text-violet-700",
  "bg-teal-100 text-teal-700",
  "bg-blue-100 text-blue-700",
  "bg-orange-100 text-orange-700",
  "bg-pink-100 text-pink-700",
  "bg-green-100 text-green-700",
];

function getInitials(name) {
  return name.split(" ").map((w) => w[0]).join("").substring(0, 2).toUpperCase();
}
const UserTable = ({users,total}) => {
 const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [openMenu, setOpenMenu] = useState(null);

  const filtered = users.filter((u) => {
    const matchStatus = statusFilter === "all" || u.status === statusFilter;
    const q = search.toLowerCase();
    const matchQ = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    return matchStatus && matchQ;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const slice = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  return (
    <div className="p-6 bg-gray-50 min-h-screen" onClick={() => setOpenMenu(null)}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-gray-900">All Users</h1>
          <span className="text-sm bg-white border border-gray-200 rounded-full px-3 py-1 text-gray-500">
            {total} total
          </span>
        </div>

        {/* Toolbar */}
        <div className="flex gap-3 mb-4 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by name or email…"
              className="w-full pl-4 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-violet-200"
            />
          </div>
          {["all", "active", "blocked"].map((f) => (
            <button
              key={f}
              onClick={() => { setStatusFilter(f); setPage(1); }}
              className={`px-4 py-2 text-sm rounded-lg border transition-colors capitalize ${
                statusFilter === f
                  ? "bg-violet-50 border-violet-300 text-violet-700 font-medium"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["User", "Role", "Status", "Actions"].map((h) => (
                  <th key={h} className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide ${h === "Actions" ? "text-right" : "text-left"}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slice.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-gray-400">No users found</td>
                </tr>
              ) : (
                slice.map((user, idx) => (
                  <tr key={user.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">

                    {/* Avatar + Name + Email */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}`}>
                          {user.avatar
                            ? <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                            : getInitials(user.name)
                          }
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        user.role === "admin" ? "bg-violet-100 text-violet-700"
                        : user.role === "volunteer" ? "bg-teal-100 text-teal-700"
                        : "bg-gray-100 text-gray-600"
                      }`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                        user.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === "active" ? "bg-green-500" : "bg-red-500"}`} />
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>

                    {/* Three dot menu */}
                    <td className="px-4 py-3 z-50">
                      <div className="flex justify-end relative" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setOpenMenu(openMenu === user.id ? null : user.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-500 transition-colors text-lg"
                        >
                          ⋮
                        </button>

                        {openMenu === user.id && (
                          <div className="absolute right-0 top-9 bg-white border border-gray-200 rounded-xl shadow-lg z-50 w-44 py-1 overflow-hidden">

                            <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide px-3 pt-2 pb-1">Status</p>

                            {user.status === "active" ? (
                              <button onClick={() => { onBlock?.(user); setOpenMenu(null); }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                                🚫 Block user
                              </button>
                            ) : (
                              <button onClick={() => { onUnblock?.(user); setOpenMenu(null); }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-green-600 hover:bg-green-50 transition-colors">
                                ✅ Unblock user
                              </button>
                            )}

                            {(user.role === "donor" || user.role !== "admin") && (
                              <>
                                <div className="h-px bg-gray-100 my-1" />
                                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide px-3 pt-1 pb-1">Role</p>

                                {user.role === "donor" && (
                                  <button onClick={() => { onMakeVolunteer?.(user); setOpenMenu(null); }}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-violet-600 hover:bg-violet-50 transition-colors">
                                    🤝 Make volunteer
                                  </button>
                                )}

                                {user.role !== "admin" && (
                                  <button onClick={() => { onMakeAdmin?.(user); setOpenMenu(null); }}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-violet-600 hover:bg-violet-50 transition-colors">
                                    🛡️ Make admin
                                  </button>
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">
              Showing {(currentPage - 1) * PER_PAGE + 1}–{Math.min(currentPage * PER_PAGE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex gap-1.5">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40">
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setPage(p)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm border transition-colors ${
                    p === currentPage ? "bg-violet-600 text-white border-violet-600" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}>
                  {p}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40">
                ›
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}


export default UserTable;