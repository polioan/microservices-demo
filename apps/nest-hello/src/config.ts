import { z } from '@microservices-demo/zod'

export const schema = z.object({
  NODE_ENV: z.nodeEnv(),
  SERVER_PORT: z.coerce.int(),
  SERVER_HOST: z.string(),
})

export type Config = z.Infer<typeof schema>
