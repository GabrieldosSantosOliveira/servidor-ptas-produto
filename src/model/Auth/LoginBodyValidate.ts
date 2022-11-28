import { z } from 'zod';

export const loginBodyValidate = z.object({
  identifier: z.string().email(),
  password: z.string()
});
