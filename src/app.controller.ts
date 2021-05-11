import {
  Controller,
  Get,
  Post,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { PostsService } from './posts/posts.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly appService: AppService,
    private readonly postsService: PostsService,
  ) {}

  @UseGuards(JwtAuthGuard)
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
    return { posts: posts, title: 'Главная' };
  }
}
