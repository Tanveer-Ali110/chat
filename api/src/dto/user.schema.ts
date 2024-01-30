import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  contact_no: z.number(),
});
export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});