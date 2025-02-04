import { z } from "zod";

export const formSchema = z.object({
  voterId: z
    .string({ required_error: "Voter ID is required" })
    .regex(
      /^[A-Z]{3}[0-9]{7}$/,
      "Invalid Voter ID format. It should be 3 letters followed by 7 digits."
    )
    .max(10, "Voter ID must be exactly 10 characters")
    .min(10, "Voter ID must be exactly 10 characters"),
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
  address: z
    .string({ required_error: "Address is required" })
    .min(2, "Address must be at least 2 characters long"),
});
