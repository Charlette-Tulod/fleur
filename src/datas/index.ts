import { z } from 'zod';

export const SignUpSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(20, { message: 'Password must be at most 20 characters' }),
  // name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  // phone: z
  //   .string()
  //   .min(6, { message: 'Phone number must be at least 6 characters' }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(20, { message: 'Password must be at most 20 characters' }),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;
