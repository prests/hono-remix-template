import { z } from 'zod';

type PlaywrightEnv = z.infer<typeof PlaywrightEnvSchema>;

const PlaywrightEnvSchema = z.object({
  CI: z.preprocess(val => val === 'true', z.boolean()).default(false),
  USE_LOCAL_SERVER: z.preprocess(val => val === 'true', z.boolean()).default(false),
  URL: z.string().url(),
});

const getPlaywrightEnv = () => PlaywrightEnvSchema.parse(process.env);

export type { PlaywrightEnv };
export { getPlaywrightEnv };
