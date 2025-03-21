import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { _axios } from "@/lib/axios";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
const formSchema = z.object({
  userName: z
    .string()
    .min(1, { message: "Username is required" })
    .max(30, { message: "Username cannot exceed 30 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters" })
    .max(15, { message: "Password cannot exceed 15 characters" }),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, { message: "Phone number must be 10 digits" }),
});

const Registration = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: any) => {
      return _axios.post("/user/auth/register", values);
    },
    onSuccess(data: any) {
      toast.success(data?.data?.message);
      form.reset();
      navigate("/");
    },
    onError(error: any) {
      toast.error(error?.response?.data?.message);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <>
      <div className='h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 flex items-center justify-center font-grotesk'>
        <div className='bg-white rounded-lg shadow-lg border p-10 max-w-md w-full'>
          <div className='text-center mb-6'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='100'
              height='100'
              className='inline-block'
              viewBox='0 0 53 53'>
              <path
                fill='#3b82f6'
                d='M26.953.004C12.32-.246.254 11.414.004 26.047-.138 34.344 3.56 41.801 9.448 46.76a7.041 7.041 0 0 1 1.257-.894l7.907-4.313a3.23 3.23 0 0 0 1.683-2.835v-3.24s-2.321-2.776-3.206-6.633a2.66 2.66 0 0 1-1.226-2.231v-3.546c0-.78.347-1.477.886-1.965v-5.126S15.696 8 26.499 8s9.75 7.977 9.75 7.977v5.126c.54.488.886 1.185.886 1.965v3.546c0 1.192-.8 2.195-1.886 2.53a19.482 19.482 0 0 1-2.632 5.304c-.291.411-.563.759-.801 1.03V38.8c0 1.223.691 2.342 1.785 2.888l8.467 4.233a7.05 7.05 0 0 1 1.39.932c5.71-4.762 9.399-11.882 9.536-19.9C53.246 12.32 41.587.254 26.953.004z'
              />
            </svg>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
              <FormField
                control={form.control}
                name='userName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700 text-lg'>
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='border-gray-300 rounded-md'
                        placeholder='Username'
                        type='text'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700 text-lg'>
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='border-gray-300 rounded-md'
                        placeholder='Email'
                        type='email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700 text-lg'>
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          className='border-gray-300 rounded-md'
                          placeholder='Password'
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
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700 text-lg'>
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='border-gray-300 rounded-md'
                        placeholder='Phone Number'
                        type='text'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='mt-8'>
                <Button
                  type='submit'
                  disabled={isPending}
                  className='w-full py-2.5 px-4 text-lg font-semibold   rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50'>
                  {isPending ? (
                    <Icon
                      icon={"line-md:loading-twotone-loop"}
                      className='!text-xl'
                    />
                  ) : (
                    "Register"
                  )}
                </Button>
              </div>

              <p className='text-center mt-4 text-gray-600'>
                Already have an account?{" "}
                <span
                  className='text-blue-500 hover:underline cursor-pointer'
                  onClick={() => navigate("/")}>
                  Login
                </span>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Registration;
