import { z } from 'zod';

export const validateBodyRefreshToken = z.object({
  refreshToken: z.string(),
  id: z.string()
});
