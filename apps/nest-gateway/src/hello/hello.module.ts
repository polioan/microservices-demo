import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigService } from '@microservices-demo/config'
import type { Config } from '../config.js'
import { HelloService } from './hello.service.js'
import { HelloController } from './hello.controller.js'

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'HELLO',
        inject: [ConfigService],
        useFactory(configService: ConfigService<Config>) {
          return {
            transport: Transport.TCP,
            options: {
              port: configService.get('HELLO_PORT'),
              host: configService.get('HELLO_HOST'),
            },
          }
        },
      },
    ]),
  ],
  providers: [HelloService],
  controllers: [HelloController],
})
export class HelloModule {}
