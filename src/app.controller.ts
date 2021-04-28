import { Controller, Get, Param, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { PostsService } from './posts/posts.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly postsService: PostsService,
  ) {}

  @Get('editor')
  @Render('editor')
  async editor() {
    const data = await this.appService.editor();
    return { ...data };
  }

  @Get()
  @Render('posts')
  async index() {
    const posts = await this.postsService.findAll();
    return { posts: posts };
  }
}
