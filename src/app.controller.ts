import {
  Controller,
  Get,
  Param,
  Post,
  Render,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { PostsService } from './posts/posts.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly appService: AppService,
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
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

  @Get('profile/:id')
  @Render('profile')
  async renderProfile(@Param('id') id: string) {
    const profile = await this.usersService.findById(+id, {
      relations: ['blog'],
    });
    if (!profile) {
      throw new UnauthorizedException(401);
    }

    return {
      ...profile,
    };
  }
}
