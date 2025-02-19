import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module.js'
import {
  ExpressAdapter,
  type NestExpressApplication,
} from '@nestjs/platform-express'
import { ConfigService } from '@microservices-demo/config'
import type { Config } from './config.js'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    {}
  )

  app.disable('x-powered-by')

  const configService = app.get<ConfigService<Config>>(ConfigService)

  const corsOrigins = configService.get('SERVER_CORS_ORIGINS')

  app.enableCors({
    origin: corsOrigins,
  })

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  )

  const port = configService.get('SERVER_PORT')

  const host = configService.get('SERVER_HOST')

  await app.listen(port, host)
}

bootstrap()
