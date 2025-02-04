import { z } from "zod";

export const formSchema = z.object({
  aadhaarNumber: z
    .string({ required_error: "Aadhaar number is required" })
    .min(12, "Aadhaar number must be 12 digits")
    .max(12, "Aadhaar number must be 12 digits"),
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters long")
    .max(100, "Full name cannot exceed 100 characters"),

  dateOfBirth: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Date of birth is required"),

  fatherName: z
    .string()
    .min(2, "Father's name must be at least 2 characters long")
    .max(100, "Father's name cannot exceed 100 characters")
    .optional(),

  mobileNumber: z
    .string()
    .length(10, "Mobile number must be exactly 10 digits")
    .regex(/^\d{10}$/, "Mobile number must contain only digits"),

  address: z
    .string({ required_error: "Address is required" })
    .min(2, "Address must be at least 2 characters long"),
});
