import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: "Password must be atleast 8 characters",
    }),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do no match",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
