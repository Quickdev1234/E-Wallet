import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { _axios } from "@/lib/axios";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { formSchema } from "./voteridSchema";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const UploadVoterId = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("E_UserId");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      voterId: "",
      fullName: "",
      dateOfBirth: "",
      address: "",
      fatherName: "",
    },
  });

  const formatVoterId = (value: string) => {
    return value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 10);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (values: any) => {
      return _axios.post("/user/card/voterid/create", {
        ...values,
        userId: userId,
      });
    },
    onSuccess(data: any) {
      toast.success(data?.data?.message);
      form.reset();
      navigate("/voterid-list");
    },
    onError(error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formattedData = {
      ...values,
      userId,
    };
    mutate(formattedData);
  };

  return (
    <main className='bg-gradient-to-b from-gray-100 to-gray-200 p-3'>
      <h2 className='text-xl md:text-2xl flex items-center gap-3 py-2    font-roboto  font-bold text-gray-800 '>
        <Icon
          onClick={() => navigate(-1)}
          icon={"famicons:arrow-back-outline"}
          className='text-2xl md:text-3xl cursor-pointer  font-semibold'
        />
        Upload Voter Id
      </h2>
      <div className='min-h-[calc(100vh-10rem)] sm:min-h-[calc(100vh-6rem)] flex items-center justify-center  font-roboto'>
        <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-6 '>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='voterId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700'>Card Number</FormLabel>
                    <FormControl>
                      <Input
                        className='border-gray-300 rounded-md'
                        placeholder='ABCDE1234F'
                        value={field.value}
                        onChange={(e) => {
                          const formatted = formatVoterId(e.target.value);
                          field.onChange(formatted);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='fullName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700'>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        className='border-gray-300 rounded-md'
                        placeholder='JOHN DOE'
                        {...field}
                        type='text'
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='dateOfBirth'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Date of birth</FormLabel>
                    <FormControl>
                      <Input
                        type='date'
                        className='border-gray-300 rounded-md'
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='fatherName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700'>Father Name</FormLabel>
                    <FormControl>
                      <Input
                        className='border-gray-300 rounded-md'
                        placeholder='Enter Father Name'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Enter Address'
                        className='resize-none'
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='mt-6'>
                <button
                  disabled={isPending}
                  type='submit'
                  className='w-full py-2.5 px-4 text-lg font-semibold rounded-md text-center  text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-400'>
                  {isPending ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default UploadVoterId;
