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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ChangePassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: any) => {
      return _axios.post("/user/auth/reset-password", values);
    },
    onSuccess(data: any) {
      toast.success(data?.data?.message);
      navigate("/");
    },
    onError(error: any) {
      toast.error(error?.response?.data?.message);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("password", values.password);
    if (token) {
      formData.append("token", token);
    }
    mutate(formData);
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
            <path d='M12 17v.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z' />
          </svg>
          <h2 className='text-xl font-semibold text-gray-800 mt-2'>
            Change Password
          </h2>
          <p className='text-gray-600 text-sm mt-1'>
            Enter your new password below.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-gray-700 text-lg'>
                    New Password
                  </FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        className='border-gray-300 rounded-md'
                        placeholder='Enter new password'
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                      <span
                        className='absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500'
                        onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? "🙈" : "👁️"}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-gray-700 text-lg'>
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        className='border-gray-300 rounded-md'
                        placeholder='Confirm new password'
                        type={confirmShowPassword ? "text" : "password"}
                        {...field}
                      />
                      <span
                        className='absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500'
                        onClick={() =>
                          setConfirmShowPassword(!confirmShowPassword)
                        }>
                        {confirmShowPassword ? "🙈" : "👁️"}
                      </span>
                    </div>
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
                {isPending ? "Updating..." : "Change Password"}
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

export default ChangePassword;
