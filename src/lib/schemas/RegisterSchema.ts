import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
