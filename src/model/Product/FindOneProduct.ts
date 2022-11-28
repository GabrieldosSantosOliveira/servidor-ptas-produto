import { z } from 'zod';

export const validateParamsProduct = z.object({
  id: z.string().uuid()
});
