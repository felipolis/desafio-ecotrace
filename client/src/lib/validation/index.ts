import * as z from "zod";


export const SignupValidation = z.object({
  username: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});


export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

// todos os campos são opcionais
export const EditProfileValidation = z.object({
  username: z.string().min(2, { message: "Name must be at least 2 characters." }).optional().or(z.literal('')),
  email: z.string().email().optional().or(z.literal('')),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }).optional().or(z.literal('')),
});