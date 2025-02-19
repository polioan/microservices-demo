import { Injectable } from '@nestjs/common'

@Injectable()
export class HelloService {
  public getHello({ name }: { name: string }) {
    return `Hello ${name}!`
  }
}
