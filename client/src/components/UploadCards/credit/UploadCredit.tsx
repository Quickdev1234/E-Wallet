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
import { formatCardNumber, formatExpiryDate } from "@/lib/formaters";
import { formSchema } from "./creditSchema";
import { useCreditCardStore } from "@/store/CreditStore";
import { useEffect } from "react";

const UploadCreditCard = () => {
  const navigate = useNavigate();
  const { id: cardId } = useParams();
  const userId = localStorage.getItem("E_UserId");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      cardHolderName: "",
      expiryDate: "",
      ccv: "",
      bankName: "",
    },
  });

  const currentCreditCard = useCreditCardStore.getState().currentCreditCard;

  useEffect(() => {
    if (cardId && currentCreditCard) {
      form.setValue("cardNumber", currentCreditCard?.cardNumber);
      form.setValue("cardHolderName", currentCreditCard?.cardHolderName);
      form.setValue("expiryDate", currentCreditCard?.expiryDate);
      form.setValue("ccv", currentCreditCard?.ccv);
      form.setValue("bankName", currentCreditCard?.bankName);
    }
  }, [cardId, form]);

  const { mutate, isPending } = useMutation({
    mutationFn: (values: any) => {
      return cardId
        ? _axios.put(`/user/card/creditcard/edit?cardId=${cardId}`, values)
        : _axios.post("/user/card/creditcard/create", values);
    },
    onSuccess(data: any) {
      toast.success(data?.data?.message);
      form.reset();
      navigate("/credit-list");
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
    <main className='bg-gradient-to-b from-gray-100 to-gray-200 p-3'>
      <h2 className='text-xl md:text-2xl flex items-center gap-3 py-2    font-roboto  font-bold text-gray-800 '>
        <Icon
          onClick={() => navigate(-1)}
          icon={"famicons:arrow-back-outline"}
          className='text-2xl md:text-3xl cursor-pointer  font-semibold'
        />
        {cardId ? "Edit Credit Card" : "Upload Credit Card"}
      </h2>
      <div className='min-h-[calc(100vh-10rem)] sm:min-h-[calc(100vh-6rem)] flex items-center justify-center  font-roboto'>
        <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-6 '>
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
                name='ccv'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700'>CCV</FormLabel>
                    <FormControl>
                      <Input
                        className='border-gray-300 rounded-md'
                        placeholder='123'
                        maxLength={4}
                        type='text'
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

export default UploadCreditCard;
