import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UsersService } from '../users/users.service';
import { BlogsService } from '../blogs/blogs.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
    private readonly usersService: UsersService,
    private readonly blogsService: BlogsService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const user = await this.usersService.findById(+createPostDto.userId);
    const blog = await this.blogsService.findById(+createPostDto.blogId);
    const post = {
      title: createPostDto.title,
      content: createPostDto.content,
      user,
      blog,
    };

    return this.postsRepository.save(post);
  }

  findAll() {
    return this.postsRepository.find({
      order: {
        createdAt: 'DESC',
      },
      relations: ['user', 'blog'],
    });
  }

  findOne(id: number) {
    return this.postsRepository.findOne(id, {
      relations: ['user', 'blog'],
    });
  }

  async findById(id: number, options?: FindOneOptions<Post>): Promise<Post> {
    return this.postsRepository.findOne(id, options);
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const user = await this.usersService.findById(+updatePostDto.userId);
    const blog = await this.blogsService.findById(+updatePostDto.blogId);
    const post = {
      title: updatePostDto.title,
      content: updatePostDto.content,
      user,
      blog,
    };
    return this.postsRepository.update(id, post);
  }

  remove(id: number) {
    return this.postsRepository.delete(id);
  }
}
