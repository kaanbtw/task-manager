import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  username: z
    .string()
    .min(4, {
      message: "Username must be at least 4 characters long",
    })
    .max(16, {
      message: "Username must be a maximum of 16 characters long",
    })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Username must only contain letters and numbers",
    }),
});

export const signInSchema = z.object({
  identifier: z.union([
    z
      .string()
      .min(4, { message: "Username must be at least 4 characters long" }),
    z.string().email(),
  ]),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters long",
    })
    .max(64, {
      message: "Password must be a maximum of 64 characters long",
    }),
});

export const usernameSchema = z.object({
  username: signUpSchema.shape.username,
});

export const verifyEmailSchema = z.object({
  code: z
    .string()
    .min(6, {
      message: "Verification code must be 6 characters long",
    })
    .max(6),
});
