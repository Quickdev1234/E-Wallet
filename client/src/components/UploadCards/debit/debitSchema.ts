import { z } from "zod";

export const formSchema = z.object({
  cardNumber: z
    .string()
    .regex(/^[0-9]{16}$/, { message: "Card number must be 16 digits" })
    .transform((val) => val.replace(/\s/g, "")),
  cardHolderName: z
    .string()
    .min(2, { message: "Cardholder name must be at least 2 characters" })
    .regex(/^[a-zA-Z\s]*$/, {
      message: "Cardholder name can only contain letters and spaces",
    }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{4})$/, {
    message: "Expiry date must be in MM/YYYY format",
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
