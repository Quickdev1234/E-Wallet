import { z } from "zod";

export const formSchema = z.object({
  panNumber: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number format"),
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters long")
    .max(100, "Full name cannot exceed 100 characters"),
  dateOfBirth: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Date of birth is required"),
  type: z.enum(["Individual", "Company", "Trust", "HUF", "Other"], {
    required_error: "PAN type is required",
  }),
  fatherName: z
    .string()
    .min(2, "Father's name must be at least 2 characters long")
    .max(100, "Father's name cannot exceed 100 characters")
    .optional(),
  address: z
    .string({ required_error: "Address is required" })
    .min(2, "Address must be at least 2 characters long"),
});
