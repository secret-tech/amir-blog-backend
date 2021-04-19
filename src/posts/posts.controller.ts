import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Render,
  Res,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Response } from 'express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    const post = await this.postsService.create(createPostDto);
    return post;
  }

  @Get()
  @Render('posts')
  async findAll(@Res() res: Response) {
    const posts = await this.postsService.findAll();
    return { posts: posts };
  }

  @Get(':id')
  @Render('post')
  async findOne(@Param('id') id: string) {
    const post = await this.postsService.findById(+id, {
      order: { createdAt: 'DESC' },
    });
    return { ...post };
  }

  @Post(':id/update')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const post = await this.postsService.update(+id, updatePostDto);
    return post;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.postsService.remove(+id);
    return deleted;
  }
}
