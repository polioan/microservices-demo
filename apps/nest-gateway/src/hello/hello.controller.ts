import { Controller, Get, Query } from '@nestjs/common'
import { HelloService } from './hello.service.js'
import { GetHelloMessageDto } from './hello.dto.js'

@Controller('hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get('get')
  public get(@Query() { name }: GetHelloMessageDto) {
    return this.helloService.get({ name })
  }
}
