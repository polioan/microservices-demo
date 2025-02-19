import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { HelloService } from './hello.service.js'
import { GetHelloMessageDto } from './hello.dto.js'

@Controller()
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @MessagePattern('getHello')
  public getHello(@Payload() { name }: GetHelloMessageDto) {
    return this.helloService.getHello({ name })
  }
}
