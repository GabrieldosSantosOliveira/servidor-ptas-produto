import { z } from 'zod';

export const validateBodyProductUpdate = z.object({
  title: z.string().optional(),
  priceForCents: z.number().optional(),
  description: z.string().optional(),
  image: z.string().url().optional()
});
