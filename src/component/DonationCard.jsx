'use client'

import Link from "next/link";
import { FaCalendarAlt, FaTint } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

// ── Blood group config ────────────────────────────────────────────────────────
const bloodConfig = {
  "A+":  { bg: "bg-red-50",     text: "text-red-600",    dot: "bg-red-500"    },
  "A-":  { bg: "bg-red-50",     text: "text-red-600",    dot: "bg-red-500"    },
  "B+":  { bg: "bg-orange-50",  text: "text-orange-600", dot: "bg-orange-500" },
  "B-":  { bg: "bg-orange-50",  text: "text-orange-600", dot: "bg-orange-500" },
  "AB+": { bg: "bg-violet-50",  text: "text-violet-600", dot: "bg-violet-500" },
  "AB-": { bg: "bg-violet-50",  text: "text-violet-600", dot: "bg-violet-500" },
  "O+":  { bg: "bg-emerald-50", text: "text-emerald-600",dot: "bg-emerald-500"},
  "O-":  { bg: "bg-emerald-50", text: "text-emerald-600",dot: "bg-emerald-500"},
};

// ── Status config ─────────────────────────────────────────────────────────────
const statusConfig = {
  pending:   { label: "Pending",   color: "text-amber-600",  bg: "bg-amber-50",  dot: "bg-amber-400",  ping: "bg-amber-300"  },
  inprogress:{ label: "In Progress",color:"text-blue-600",   bg: "bg-blue-50",   dot: "bg-blue-500",   ping: "bg-blue-300"   },
  done:      { label: "Completed", color: "text-emerald-600",bg: "bg-emerald-50",dot: "bg-emerald-500", ping: null            },
  canceled:  { label: "Canceled",  color: "text-slate-500",  bg: "bg-slate-100", dot: "bg-slate-400",  ping: null            },
};

export default function DonationCard({ request }) {
  const blood   = bloodConfig[request.bloodGroup]  ?? bloodConfig["O+"];
  const status  = statusConfig[request.donationStatus?.toLowerCase()] ?? statusConfig.pending;

  const formattedDate = new Date(request.donationDate).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });

  const formattedTime = new Date(`2000-01-01T${request.donationTime}`).toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit", hour12: true,
  });

  return (
    <article className="group relative bg-white rounded-2xl border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] overflow-hidden">

      {/* Top accent line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-rose-500 to-rose-400" />

      <div className="p-5 flex flex-col gap-5">

        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-slate-400 mb-0.5">
              Recipient
            </p>
            <h3 className="text-lg font-bold text-slate-900 leading-snug tracking-tight">
              {request.recipientName}
            </h3>
          </div>

          {/* Blood badge */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${blood.bg} ${blood.text} text-sm font-bold flex-shrink-0`}>
            <FaTint size={10} className="opacity-70" />
            {request.bloodGroup}
          </div>
        </div>

        {/* ── Meta info ── */}
        <div className="space-y-2">
          <MetaRow icon={<MdLocationOn size={14} />} iconBg="bg-rose-50 text-rose-500">
            <span className="text-sm font-semibold text-slate-700">
              {request.recipientUpazila}, {request.recipientDistrict}
            </span>
          </MetaRow>

          <MetaRow icon={<FaCalendarAlt size={12} />} iconBg="bg-slate-100 text-slate-500">
            <span className="text-sm text-slate-500">
              {formattedDate}
              <span className="mx-1.5 text-slate-300">·</span>
              {formattedTime}
            </span>
          </MetaRow>
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">

          {/* Status pill */}
          <div className={`
            inline-flex items-center gap-2 px-3 py-1.5 rounded-xl
            ${status.bg}
          `}>
            <span className="relative flex h-2 w-2 flex-shrink-0">
              {status.ping && (
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${status.ping} opacity-60`} />
              )}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${status.dot}`} />
            </span>
            <span className={`text-[11px] font-bold tracking-wide uppercase ${status.color}`}>
              {status.label}
            </span>
          </div>

          {/* CTA */}
          <Link
  href={`/dashboard/${request._id}`}
  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold transition-all duration-150 hover:bg-slate-700 active:scale-95"
>
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}

// ── Helper ────────────────────────────────────────────────────────────────────
function MetaRow({ icon, iconBg, children }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0 ${iconBg}`}>
        {icon}
      </span>
      {children}
    </div>
  );
}
