import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../../dto/user.dto';
// import { Post } from '../../entities/Post';
// import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    user.created_at = new Date();
    user.updated_at = new Date();
    if (!userData.password) {
      throw new HttpException('Passwords do not match', HttpStatus.NOT_FOUND);
    }
    const hadPassword = bcrypt.hashSync(userData.password, 10);
    user.password = hadPassword;
    return this.userRepository.save(user);
  }
  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async validatUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) {
      return null;
    }
    const status = bcrypt.compareSync(password, user.password);
    if (!status) {
      throw new HttpException('Passwords do not match', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async saveToken(refreshToken: string, accessToken: string, userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    const hashedAccessToken = await bcrypt.hash(accessToken, 10);
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    user.refresh_token = hashedRefreshToken;
    user.access_token = hashedAccessToken;
    return this.userRepository.save(user);
  }

  async findAll(): Promise<{ users: UserDto[]; admins: UserDto[] }> {
    const users = await this.userRepository.find();
    // const userDtos = plainToInstance(UserDto, users);
    const userDtos = users.map((user) => ({
      username: user.username,
      email: user.email,
      role: user.role,
    }));
    console.log(userDtos);
    const grouped = userDtos.reduce(
      (acc, user) => {
        if (user.role === 'user') {
          acc.users.push(user);
        } else if (user.role === 'admin') {
          acc.admins.push(user);
        }
        return acc;
      },
      { users: [], admins: [] } as { users: UserDto[]; admins: UserDto[] },
    );

    return grouped;
  }

  async findOne(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: number, data: Partial<User>): Promise<User | null> {
    data.updated_at = new Date();
    if (data.password) {
      const hadPassword = bcrypt.hashSync(data.password, 10);
      data.password = hadPassword;
    }
    await this.userRepository.update(id, data);
    return this.userRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<User | null> {
    const product = await this.userRepository.findOneBy({ id });
    await this.userRepository.delete(id);
    return product;
  }

  async findByRole(role: string): Promise<UserDto[] | null> {
    const users = await this.userRepository.find({ where: { role: role } });
    return users.map((user) => ({
      username: user.username,
      email: user.email,
      role: user.role,
    }));
  }

  async findAllWithPost(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['posts'],
    });
  }
}
