import { Controller, Get, Render, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { PostsService } from './posts/posts.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly postsService: PostsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('editor')
  @Render('editor')
  async editor(@Req() req: Request, @Res() res: Response) {
    const data = await this.appService.editor();
    return { ...data };
  }

  @Get()
  @Render('posts')
  async index(@Req() req: Request, @Res() res: Response) {
    const posts = await this.postsService.findAll();
    return { posts: posts, title: 'Главная' };
  }
}
