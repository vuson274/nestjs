import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    user.createdAt = new Date();
    user.updatedAt = new Date();
    if (!userData.password) {
      throw new HttpException('Passwords do not match', HttpStatus.NOT_FOUND);
    }
    const hadPassword = bcrypt.hashSync(userData.password, 10);
    user.password = hadPassword;
    return this.userRepository.save(user);
  }
  findByEmail(email: string): Promise<User | null> {
    // return this.userRepository.findOne({ where: { email } });
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

  async saveRefreshToken(refreshToken: string, userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    user.refresh_token = hashedRefreshToken;
    return this.userRepository.save(user);
  }
}
