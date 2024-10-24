import z from 'zod';

export const EmailSchema = z.object({
  email: z
    .coerce
    .string()
    .email('Oops! El correo electronico es invalido')
    .min(3)
    .max(320)
    .refine((value) => value.includes('<>{}[]$%') || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value ?? ''), 'Caracteres no permitidos'),
});

export type Email = z.infer<typeof EmailSchema>;

export const UsernameSchema = z.object({
  username: z
    .coerce
    .string()
    .min(3)
    .max(40)
    .refine((value) => /^[^@{}[\]<>]*$/.test(value ?? ''), 'Caracteres no permitidos'),
});

export type Username = z.infer<typeof UsernameSchema>;

export const PasswordSchema = z.object({
  password: z
    .coerce
    .string()
    .min(8),
});

export type Password = z.infer<typeof PasswordSchema>;

export const SignupSchema = EmailSchema
  .merge(UsernameSchema)
  .merge(PasswordSchema)

export type Signup = z.infer<typeof SignupSchema>;