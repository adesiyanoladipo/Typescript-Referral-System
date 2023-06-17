import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const userCore = {
  name: z.string({
    required_error: 'Name is necessary',
    invalid_type_error: 'Name is invalid',
  }),
  referralCode: z.string().length(5).optional(),
  referredBy: z.string().length(5).optional(),
};

const authCore = {
  email: z.string({
    required_error: 'Email is necessary',
    invalid_type_error: 'Email is invalid',
  }),
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  }),
};
const createUserSchema = z.object({
  ...userCore,
  ...authCore,
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type loginSchema = z.infer<typeof loginSchema>;

const createUserResponseSchema = z.object({
  ...authCore,
});

const loginSchema = z.object({
  ...authCore,
});

export const { schemas: authSchema, $ref } = buildJsonSchemas({
  createUserSchema,
  loginSchema,
  createUserResponseSchema,
});
