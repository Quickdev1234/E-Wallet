import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { _axios } from "@/lib/axios";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

const formSchema = z.object({
  cardNumber: z
    .string()
    .regex(/^[0-9]{16}$/, { message: "Card number must be 16 digits" })
    .transform((val) => val.replace(/\s/g, "")), // Remove any spaces
  cardHolderName: z
    .string()
    .min(2, { message: "Cardholder name must be at least 2 characters" })
    .regex(/^[a-zA-Z\s]*$/, {
      message: "Cardholder name can only contain letters and spaces",
    }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{4})$/, {
    message: "Expiry date must be in MM/YYYY format",
  }),
  cardType: z.enum(["credit", "debit"], {
    required_error: "Please select a card type",
  }),
  ccv: z
    .string()
    .regex(/^[0-9]{3,4}$/, { message: "CCV must be 3 or 4 digits" }),
  bankName: z
    .string()
    .min(2, { message: "Bank name must be at least 2 characters" })
    .regex(/^[a-zA-Z\s]*$/, {
      message: "Bank name can only contain letters and spaces",
    }),
});

const UploadCardForm = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("E_UserId");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      cardHolderName: "",
      expiryDate: "",
      cardType: "credit",
      ccv: "",
      bankName: "",
    },
  });

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    return cleaned.slice(0, 16);
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 6) {
      const month = cleaned.slice(0, 2);
      const year = cleaned.slice(2, 6);
      return `${month}/${year}`;
    }
    return cleaned;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (values: any) => {
      return _axios.post("/user/card/create", values);
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formattedData = {
      ...values,
      cardNumber: values.cardNumber.replace(/\s/g, ""),
      expiryDate: values.expiryDate,
      userId: userId,
    };

    mutate(formattedData);
  };

  return (
    <>
      <div className='flex items-center justify-between px-6 py-3 bg-gradient-to-r from-teal-500 to-green-500 text-white shadow-md font-grotesk'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center md:text-xl font-semibold hover:text-gray-800'>
          <Icon className='text-xl' icon={"icon-park-solid:back"} /> &nbsp;{" "}
          <span className='md:block hidden'>Back</span>
        </button>
        <h1 className='text-lg font-semibold'>Upload Card Details</h1>
        <div></div> {/* Empty div to center the title */}
      </div>

      <div className='min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 font-grotesk'>
        <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='cardNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700'>Card Number</FormLabel>
                    <FormControl>
                      <Input
                        className='border-gray-300 rounded-md'
                        placeholder='1234 5678 9012 3456'
                        maxLength={16}
                        onChange={(e) => {
                          const formatted = formatCardNumber(e.target.value);
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
                name='cardHolderName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700'>
                      Cardholder Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='border-gray-300 rounded-md'
                        placeholder='JOHN DOE'
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.value.toUpperCase());
                        }}
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
                    <FormLabel className='text-gray-700'>Expiry Date</FormLabel>
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
                name='cardType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700'>Card Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className='border-gray-300 rounded-md'>
                          <SelectValue placeholder='Select Card Type' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='credit'>Credit</SelectItem>
                        <SelectItem value='debit'>Debit</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='ccv'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700'>CCV</FormLabel>
                    <FormControl>
                      <Input
                        className='border-gray-300 rounded-md'
                        placeholder='123'
                        maxLength={4}
                        type='password'
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='bankName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700'>Bank Name</FormLabel>
                    <FormControl>
                      <Input
                        className='border-gray-300 rounded-md'
                        placeholder='Enter bank name'
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
                  className='w-full py-2.5 px-4 text-lg font-semibold rounded-md text-center  text-white bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-green-400'>
                  {isPending ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default UploadCardForm;
