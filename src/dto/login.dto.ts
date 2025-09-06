import { IsString, IsStrongPassword, Length } from 'class-validator';
import { Schema } from 'src/user/constants';

export class LoginUserDto {
  @IsString()
  @Length(Schema.email.min, Schema.email.max)
  email: string;

  @IsString()
  @Length(Schema.password.min, Schema.password.max)
  @IsStrongPassword()
  password: string;
}
