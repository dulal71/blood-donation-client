import Link from "next/link";
import { FaTint } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";

const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-2">
     <div className="text-red-500 animate-pulse drop-shadow-[0_0_10px_rgba(239,68,68,0.7)]">
  <MdBloodtype className="text-5xl" />
</div>
      <span className="font-extrabold text-2xl tracking-tight">
        <span className="text-red-700">Blood</span> Bridge
      </span>
    </Link>
    );
};

export default Logo;