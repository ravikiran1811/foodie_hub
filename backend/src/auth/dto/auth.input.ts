import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterInput {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  roleName: string;

  country?: string;
}

export class LoginInput {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
