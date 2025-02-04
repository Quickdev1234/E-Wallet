import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Icon } from "@iconify/react";
import { Button } from "../ui/button";
import { toast } from "sonner";

const Navbar = () => {
  const [modelOpen, setModelOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className='flex items-center justify-between px-6 sm:px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 shadow-md h-16 sm:h-20'>
        <h1
          onClick={() => navigate("/dashboard")}
          className='text-2xl sm:text-3xl font-bold cursor-pointer  text-white font-grotesk'>
          E-Wallet
        </h1>

        <button
          onClick={() => setModelOpen(true)}
          className='flex items-center gap-3 text-white hover:text-red-500 transition duration-200'>
          <Icon icon='solar:logout-2-bold' className='h-6 w-6 sm:h-8 sm:w-8' />
          <span className='font-semibold text-base sm:text-lg hidden sm:inline'>
            Logout
          </span>
        </button>
      </nav>

      <Dialog modal open={modelOpen} onOpenChange={setModelOpen}>
        <DialogContent
          aria-describedby='logout-dialog-description'
          className='text-center text-xl flex flex-col items-center'>
          <h1 className='font-semibold'>Do you want to log out?</h1>
          <div className='flex w-full gap-4 mt-4 items-center justify-center'>
            <Button
              className='w-[40%] sm:w-[30%] bg-blue-600 text-white hover:bg-blue-700'
              onClick={() => {
                localStorage.clear();
                navigate("/");
                toast.success("Logged out successfully");
              }}>
              Yes
            </Button>
            <Button
              className='w-[40%] sm:w-[30%] bg-gray-300 text-black hover:bg-gray-400'
              onClick={() => setModelOpen(false)}>
              No
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
