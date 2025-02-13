import { Expose } from 'class-transformer';
import { IsString, IsEmail } from 'class-validator';

export class UserDto {
  @Expose()
  @IsString()
  username: string;
  @Expose()
  @IsEmail()
  email: string;
  @Expose()
  @IsString()
  role: string;
}
