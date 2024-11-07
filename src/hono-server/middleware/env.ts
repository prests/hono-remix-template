import { z } from 'zod';

type Env = z.infer<typeof EnvSchema>;

const EnvSchema = z.object({
  ABORT_DELAY: z.preprocess(val => parseInt(String(val), 10), z.number()),
  APP_NAME: z.string(),
});

const getEnv = () => EnvSchema.parse(process.env);

export type { Env };
export { getEnv };
