import { z } from 'zod';

export const validateBodyUser = z.object({
  email: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string()
});
