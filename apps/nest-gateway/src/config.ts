import { z } from '@microservices-demo/zod'

export const schema = z.object({
  NODE_ENV: z.nodeEnv(),
  SERVER_PORT: z.coerce.int(),
  SERVER_CORS_ORIGINS: z.commaSeparatedList(),
  SERVER_HOST: z.string(),
  HELLO_PORT: z.coerce.int(),
  HELLO_HOST: z.string(),
})

export type Config = z.Infer<typeof schema>
