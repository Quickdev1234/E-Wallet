import { z } from "zod";

export const formSchema = z.object({
  licenseNumber: z
    .string({ required_error: "License number is required" })
    .min(15, "License number must be at least 15 characters")
    .max(20, "License number cannot exceed 20 characters"),

  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters long")
    .max(100, "Full name cannot exceed 100 characters"),

  dateOfBirth: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Date of birth is required"),

  address: z
    .string({ required_error: "Address is required" })
    .min(2, "Address must be at least 2 characters long"),

  issueDate: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{4})$/, {
    message: "Issue date must be in MM/YYYY format",
  }),

  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{4})$/, {
    message: "Expiry date must be in MM/YYYY format",
  }),
});
