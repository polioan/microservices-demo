import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { Transport, type MicroserviceOptions } from '@nestjs/microservices'
import { AppModule } from './app.module.js'
import { ConfigService } from '@microservices-demo/config'
import type { Config } from './config.js'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {})

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  )

  const configService = app.get<ConfigService<Config>>(ConfigService)

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.TCP,
      options: {
        host: configService.get('SERVER_HOST'),
        port: configService.get('SERVER_PORT'),
      },
    },
    {
      inheritAppConfig: true,
    }
  )

  await app.startAllMicroservices()
}

bootstrap()
