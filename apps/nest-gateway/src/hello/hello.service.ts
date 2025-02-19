import { Injectable, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'

@Injectable()
export class HelloService {
  constructor(
    @Inject('HELLO') private readonly helloMicroservice: ClientProxy
  ) {}

  public async get({ name }: { name: string }) {
    const result = await lastValueFrom(
      this.helloMicroservice.send('getHello', {
        name,
      })
    )
    return { result }
  }
}
