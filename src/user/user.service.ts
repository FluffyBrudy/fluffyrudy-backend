import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

export type FindUserOptions = { email: User['email'] } | { id: User['id'] };
export type CreateUserFields = {
  email: User['email'];
  password: User['password'];
  username: User['username'];
};

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findUser(options: FindUserOptions) {
    const user = await this.userRepository.findOneBy({ ...options });
    return user;
  }

  async createUser(fields: CreateUserFields) {
    const userInstance = this.userRepository.create(fields);
    const { email, username, id } =
      await this.userRepository.save(userInstance);
    return { email, username, id };
  }
}
