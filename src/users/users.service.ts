import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly httpService: HttpService,
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

  async getProfile(token: string, x_sign: string) {
    const response = await this.httpService
      .get(`https://account.amir.capital/account/v2/me`, {
        headers: {
          authorization: 'Bearer ' + token,
          'x-sign': x_sign,
        },
      })
      .toPromise();

    const profile = response.data;
    const user = await this.userRepository.create({
      status: profile.data.last_status,
      ...profile.data,
    });

    await this.userRepository.save(user);
    return profile;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
