import { Module } from '@nestjs/common'
import { ConfigModule } from '@microservices-demo/config'
import { schema } from './config.js'
import { HelloModule } from './hello/hello.module.js'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate(payload) {
        return schema.parse(payload)
      },
    }),
    HelloModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
