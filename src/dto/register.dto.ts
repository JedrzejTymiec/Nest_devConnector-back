import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @Length(6)
  readonly password: string;
}
