import { IsString, IsNotEmpty } from 'class-validator'

export class GetHelloMessageDto {
  @IsString()
  @IsNotEmpty()
  public name: string
}
