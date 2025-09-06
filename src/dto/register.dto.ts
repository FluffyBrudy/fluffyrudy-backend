import { IsString, Length } from 'class-validator';
import { Schema } from 'src/user/constants';
import { LoginUserDto } from './login.dto';

export class RegisterUserDto extends LoginUserDto {
  @IsString()
  @Length(Schema.username.min, Schema.username.max)
  username: string;
}
