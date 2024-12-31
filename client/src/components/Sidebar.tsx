import { Icon } from "@iconify/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { toast } from "sonner";

export function Sidebar() {
  const [modelOpen, setModelOpen] = useState(false);
  type links = {
    name: string;
    href: string;
    icon: string;
    subroot: string;
  };
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const links = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: "material-symbols:dashboard-rounded",
      subroot: "/admin/dashboard",
    },
    // {
    //   name: "User Management",
    //   href: "/admin/layout/users",
    //   icon: "mdi:user",
    //   subroot: "/admin/layout/users",
    // },
    {
      name: "Staff Management",
      href: "/admin/layout/staffs",
      icon: "fluent-mdl2:workforce-management",
      subroot: "/admin/layout/staffs",
    },
    {
      name: "Finance Company",
      href: "/admin/layout/finance-company",
      icon: "carbon:finance",
      subroot: "/admin/layout/finance-company",
    },
    {
      name: "Applications",
      href: "/admin/layout/applications",
      icon: "mdi:credit-card",
      subroot: "/admin/layout/applications",
    },
    {
      name: "Terms and Conditions",
      href: "/admin/layout/terms-conditions",
      icon: "mdi:file-document-outline", // Icon for documents/terms
      subroot: "/admin/layout/terms-conditions",
    },
    {
      name: "Important Information",
      href: "/admin/layout/important-information",
      icon: "mdi:information-outline", // Icon for information
      subroot: "/admin/layout/important-information",
    },
  ];

  return (
    <div className='bg-muted/40 hidden font-inter md:block dark:bg-slate-900 h-full'>
      <div className='flex flex-col justify-between h-full'>
        {/* Navigation Links */}
        <div>
          <nav className='flex flex-col items-start text-sm px-4'>
            {links.map((route) => (
              <div
                className='w-full py-1'
                key={route.name}
                onClick={() => {
                  navigate(route.href);
                }}>
                <div
                  className={`flex cursor-pointer items-center ${
                    route.subroot === pathname ||
                    pathname.includes(route.subroot)
                      ? "bg-gradient-to-r from-red-400 to-red-600 text-white shadow-sm translate-x-2 transition-all duration-300 ease-linear"
                      : "text-gray-600 hover:bg-gray-300 hover:text-red-600"
                  } justify-start rounded-full p-2`}>
                  <Icon icon={route.icon} className='mr-2 h-6 w-6' />
                  <p className='text-sm flex items-center rounded-lg px-3 py-2 font-semibold transition-all'>
                    {route.name}
                  </p>
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className='px-4 mb-4'>
          <Dialog modal open={modelOpen} onOpenChange={setModelOpen}>
            <DialogTrigger className='flex' asChild>
              <button
                className={`flex cursor-pointer items-center justify-start rounded-md p-2`}>
                <Icon
                  icon={"solar:logout-2-bold"}
                  className='mr-2 h-6 w-6 text-red-600'
                />
                <p className='text-md flex font-inter  items-center gap-3 rounded-lg px-3 py-4 font-semibold transition-all'>
                  Logout
                </p>
              </button>
            </DialogTrigger>
            <DialogContent
              aria-describedby='logout-dialog-description'
              className='font-inter text-center text-2xl flex flex-col items-center'>
              <h1>Do you want to log out?</h1>

              <div className='flex w-full font-inter gap-4 mt-4 items-center justify-center'>
                <Button
                  className='w-[20%] bg-gray-500 border font-inter text-white'
                  variant='default'
                  onClick={() => {
                    localStorage.clear();
                    navigate("/admin/");
                    toast.success("Logged out successfully");
                  }}>
                  Yes
                </Button>

                <Button
                  className='w-[20%] bg-button'
                  variant='default'
                  onClick={() => setModelOpen(false)}>
                  No
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
