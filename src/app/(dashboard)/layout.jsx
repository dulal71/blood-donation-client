import DashboardSidebar from '@/component/dashboard/DashboardSidebar';
import Logo from '@/component/Logo';
import { getSession } from '@/lib/api/userSession';


const DashboardLayout =async ({ children }) => {
     const user = await getSession()
     console.log(user);
  return (
    <div className="flex flex-col min-h-screen">
     {/* dashboard header */}
     <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/90 backdrop-blur-md">
    <div className="w-full px-6 h-[75px] flex items-center justify-between">
      <div className="flex-shrink-0">
        <Logo />
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold text-red-700 bg-zinc-100 px-3 py-1 rounded-full">
          {user.role.toUpperCase()}
        </span>
      </div>
    </div>
  </header>

    
      <div className="flex flex-1">
       {/* sidebar */}
        <div className="shrink-0 w-64 border-r border-zinc-200">
          <DashboardSidebar user={user} />
        </div>

{/* main content */}
        <div className="flex-1 p-6 bg-zinc-50">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;