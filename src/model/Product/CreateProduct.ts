import { z } from 'zod';

export const validateBodyProductCreate = z.object({
  title: z.string(),
  priceForCents: z.number(),
  description: z.string(),
  image: z.string().url()
});
