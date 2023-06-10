import * as z from "zod";

export const userAuthSchema = z.object({
  email: z.string().nonempty({ message: "Email is a required field" }).email(),
  password: z
    .string()
    .nonempty({ message: "Password is a required field" })
    .min(8),
  remember: z.boolean().optional(),
});
