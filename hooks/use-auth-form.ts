import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email Address is required" })
    .email("Invalid email address"),
  password: z
    .string()
    .nonempty({ message: "Password field is required" })
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(15, "Password must be at most 15 characters")
    .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
});

export const signUpSchema = z
  .object({
    fullName: z
      .string()
      .nonempty({ message: "Name field is required" })
      .max(50, { message: "Name must be at most 50 characters long" }),
    email: z
      .string()
      .nonempty({ message: "Email Address is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .nonempty({ message: "Password field is required" })
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(15, "Password must be at most 15 characters")
      .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirm Password field is required" })
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(15, "Password must be at most 15 characters")
      .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty({ message: "Email Address is required" }),
});
