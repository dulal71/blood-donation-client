import { FaDroplet, FaHouse } from "react-icons/fa6";
import { FaExclamationTriangle } from "react-icons/fa";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-center px-4">

      <div className="flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
        <FaDroplet className="text-red-600 text-5xl" />
      </div>

      <h1 className="text-9xl font-bold text-red-600 leading-none">
        404
      </h1>

      <div className="flex items-center gap-2 mt-4 mb-2">
        <FaExclamationTriangle className="text-red-400 text-2xl" />
        <h2 className="text-3xl font-semibold text-red-500">
          Page Not Found
        </h2>
      </div>

      <p className="text-gray-500 text-base max-w-md mb-8">
        The page you are looking for does not exist. It may have been moved or the URL is incorrect.
      </p>

      <Link
        href="/"
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-200"
      >
        <FaHouse />
        Back to Home
      </Link>

    </div>
  );
}