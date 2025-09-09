import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { EMAIL, MESSAGE, SUBJECT, USERNAME } from 'src/constants/schema';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  @Length(USERNAME.MIN, USERNAME.MAX)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(EMAIL.MIN, EMAIL.MAX)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(SUBJECT.MIN, SUBJECT.MAX)
  subject: string;

  @IsString()
  @IsNotEmpty()
  @Length(MESSAGE.MIN, MESSAGE.MAX)
  message: string;
}
