import { plainToClass } from 'class-transformer';
import { User } from '../entities/User';
import { UserDto } from '../dto/user.dto';

export class UserMapper {
  static toDto(user: User): UserDto {
    return plainToClass(UserDto, user);
  }

  static toDtos(users: User): UserDto[] {
    return users.map((user) => plainToClass(UserDto, user));
  }
}
