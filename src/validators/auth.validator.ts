import { z } from "zod";
import { Request, Response, NextFunction } from "express";

// Password rules
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(20, "Password must not exceed 20 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");


export const signUpSchema = z.object({
  username: z.string().email("Invalid email").min(5).max(25),
  password: passwordSchema,
});

// Type from schema
export type SignUpInput = z.infer<typeof signUpSchema>;

// Extend Request just for this middleware
export type SignUpRequest = Request & { validateData?: SignUpInput };

// Middleware
export  const zodSignUp = (req: SignUpRequest, res: Response, next: NextFunction) => {
  try {
    req.validateData = signUpSchema.parse(req.body); // ✅ typed
    console.log(req.validateData)
    next();
  } catch (e: any) {
    return res.status(411).json({ error: e.errors ?? e });
  }
};
