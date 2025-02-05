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
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { _axios } from "@/lib/axios";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { formSchema } from "./drivinglicense";

import { Textarea } from "@/components/ui/textarea";
import { formatExpiryDate } from "@/lib/formaters";
import { useDrivingLicenseStore } from "@/store/DrivingLicense";
import { useEffect } from "react";

const UploadDrivingLicense = () => {
  const navigate = useNavigate();
  const { id: cardId } = useParams();

  const userId = localStorage.getItem("E_UserId");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      licenseNumber: "",
      fullName: "",
      dateOfBirth: "",
      address: "",
      issueDate: "",
      expiryDate: "",
    },
  });

  const currentDrivingLicense =
    useDrivingLicenseStore.getState().currentDrivingLicense;

  useEffect(() => {
    if (cardId && currentDrivingLicense) {
      form.setValue("licenseNumber", currentDrivingLicense?.licenseNumber);
      form.setValue("fullName", currentDrivingLicense?.fullName);
      form.setValue("dateOfBirth", currentDrivingLicense?.dateOfBirth);
      form.setValue("issueDate", currentDrivingLicense?.issueDate);
      form.setValue("address", currentDrivingLicense?.address);
      form.setValue("expiryDate", currentDrivingLicense?.expiryDate);
    }
  }, [cardId, form]);

  const { mutate, isPending } = useMutation({
    mutationFn: (values: any) => {
      return cardId
        ? _axios.put(`/user/card/drivinglicense/edit?cardId=${cardId}`, {
            ...values,
            userId: userId,
          })
        : _axios.post("/user/card/drivinglicense/create", {
            ...values,
            userId: userId,
          });
    },
    onSuccess(data: any) {
      toast.success(data?.data?.message);
      form.reset();
      navigate("/drivinglicense-list");
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
        {cardId ? "Edit Driving License" : "Upload Driving License"}
      </h2>
      <div className='min-h-[calc(100vh-10rem)] sm:min-h-[calc(100vh-6rem)] flex items-center justify-center  font-roboto'>
        <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-6 '>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='licenseNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700'>Card Number</FormLabel>
                    <FormControl>
                      <Input
                        className='border-gray-300 rounded-md'
                        placeholder='ABCDE1234F'
                        {...field}
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
                name='issueDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700'>Father Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='MM/YYYY'
                        maxLength={7}
                        className='border-gray-300 rounded-md'
                        onChange={(e) => {
                          const formatted = formatExpiryDate(e.target.value);
                          field.onChange(formatted);
                        }}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='expiryDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700'>Father Name</FormLabel>
                    <FormControl>
                      <Input
                        className='border-gray-300 rounded-md'
                        placeholder='MM/YYYY'
                        maxLength={7}
                        onChange={(e) => {
                          const formatted = formatExpiryDate(e.target.value);
                          field.onChange(formatted);
                        }}
                        value={field.value}
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

export default UploadDrivingLicense;
