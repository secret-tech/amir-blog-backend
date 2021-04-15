import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  async findById(id: number, options?: FindOneOptions<User>): Promise<User> {
    return this.userRepository.findOne(id, options);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  async upsertByPhoneNumber(phoneNumber: string): Promise<User> {
    const result = await this.userRepository
      .createQueryBuilder()
      .insert()
      .values({ phoneNumber })
      .onConflict(`("phoneNumber") DO UPDATE SET "isVerified" = :isVerified`)
      .setParameter('isVerified', false)
      .returning('*')
      .execute();

    return result.raw[0];
  }
}
