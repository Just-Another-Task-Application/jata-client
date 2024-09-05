import z from 'zod';

export const UsernameSchema = z.object({
  username: z
    .coerce
    .string()
    // .min(3)
    .max(40),
  remember: z.optional(
    z
      .coerce
      .boolean(),
  ),
});

export type Username = z.infer<typeof UsernameSchema>;

export const PasswordSchema = z.object({
  password: z
    .coerce
    .string(),
});

export type Password = z.infer<typeof PasswordSchema>;

const SigninSchema = PasswordSchema
  .merge(UsernameSchema);

export type Signin = z.infer<typeof SigninSchema>;