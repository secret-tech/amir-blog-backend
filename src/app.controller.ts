import { Controller, Get, Param, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('editor')
  @Render('editor')
  async editor() {
    const data = await this.appService.editor();
    return { ...data };
  }

  @Get()
  @Render('index')
  async index() {
    return {
      title: 'index page',
    };
  }
}
