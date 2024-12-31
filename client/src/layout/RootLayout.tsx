import { Sidebar } from "@/components/Sidebar";
import { Icon } from "@iconify/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      window.location.href = "/admin";
    }
  }, []);

  return (
    <>
      <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
        <div className='hidden border-r bg-muted/40 md:block'>
          <div className='flex h-full max-h-screen flex-col gap-2'>
            <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
              <Link
                to='/admin/dashboard'
                className='flex items-center gap-3 font-semibold text-gray-700'>
                <Icon
                  className='h-5 w-5 text-red-500'
                  icon='wpf:administrator'
                />
                <span>Admin</span>
              </Link>
            </div>
            <div className='flex-1'>
              <Sidebar />
            </div>
          </div>
        </div>
        <div className='w-full'>{children}</div>
      </div>
    </>
  );
}
