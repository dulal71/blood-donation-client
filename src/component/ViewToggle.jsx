import { BsGridFill, BsListUl } from "react-icons/bs";

export function ViewToggle({ viewMode, setViewMode }) {
  return (
   <div className="hidden md:flex bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
  <button
    onClick={() => setViewMode("grid")}
    className={`p-2 transition-colors ${
      viewMode === "grid"
        ? "bg-rose-600 dark:bg-rose-500 text-white"
        : "text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 dark:hover:text-slate-200"
    }`}
  >
    <BsGridFill size={18} />
  </button>
  <button
    onClick={() => setViewMode("list")}
    className={`p-2 transition-colors ${
      viewMode === "list"
        ? "bg-rose-600 dark:bg-rose-500 text-white"
        : "text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 dark:hover:text-slate-200"
    }`}
  >
    <BsListUl size={18} />
  </button>
</div>
  );
}