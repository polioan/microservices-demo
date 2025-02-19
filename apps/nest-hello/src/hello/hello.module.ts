import { Module } from '@nestjs/common'
import { HelloService } from './hello.service.js'
import { HelloController } from './hello.controller.js'

@Module({
  providers: [HelloService],
  controllers: [HelloController],
})
export class HelloModule {}
