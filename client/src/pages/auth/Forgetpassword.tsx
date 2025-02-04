import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { _axios } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
});

const Forgetpassword = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: any) => {
      return _axios.post("/user/auth/forget-password", values);
    },
    onSuccess(data: any) {
      toast.success(data?.data?.message);
      navigate(`/change-password?token=${data?.data?.token}`);
    },
    onError(error: any) {
      toast.error(error?.response?.data?.message);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <div className='h-screen bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 flex items-center justify-center font-grotesk'>
      <div className='bg-white rounded-lg shadow-lg border p-6 md:p-10 max-w-md w-full'>
        <div className='text-center mb-6'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='80'
            height='80'
            className='inline-block'
            viewBox='0 0 24 24'
            fill='none'
            stroke='#14b8a6'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'>
            <path d='M21 2 12 12m0 0L3 2m9 10v10' />
          </svg>
          <h2 className='text-xl font-semibold text-gray-800 mt-2'>
            Forgot Password?
          </h2>
          <p className='text-gray-600 text-sm mt-1'>
            Enter your email to proceed.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-gray-700 text-lg'>Email</FormLabel>
                  <FormControl>
                    <Input
                      className='border-gray-300 rounded-md'
                      placeholder='Enter your email'
                      type='email'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='mt-8'>
              <button
                disabled={isPending}
                type='submit'
                className='w-full py-2.5 px-4 text-lg font-semibold rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50'>
                {isPending ? "Please wait..." : "Continue"}
              </button>
            </div>
          </form>
        </Form>

        <p
          className='text-center mt-4 text-gray-500 hover:text-gray-700 cursor-pointer'
          onClick={() => navigate("/")}>
          Back to Login
        </p>
      </div>
    </div>
  );
};

export default Forgetpassword;
