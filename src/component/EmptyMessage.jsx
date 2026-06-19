import { FiDroplet } from "react-icons/fi";

export default function EmptyMessage({
  title = "No Donation Requests Found",
  description = "There are no blood donation requests available right now. Please check back later.",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-red-50 p-4 rounded-full mb-3">
        <FiDroplet className="text-3xl text-red-500" />
      </div>

      <h2 className="text-lg font-semibold text-gray-700">
        {title}
      </h2>

      <p className="text-sm text-gray-500 mt-1 max-w-sm">
        {description}
      </p>
    </div>
  );
}