import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { join } from 'path';
import configuration from './config/configuration';
import hbs = require('hbs');

const config = configuration();

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(function (req, res, next) {
    const token = req.query.token.toString() || req.header('authorization');
    const x_sign = req.query.x_sign.toString() || req.header('x-sign');
    req.amirToken = token;
    req.xSign = x_sign;
    next();
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.set('view options', { layout: 'layout' });
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));
  hbs.registerHelper('dateFormat', require('handlebars-dateformat'));
  hbs.registerHelper('ifEquals', function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  });

  app.enableCors();

  await app.listen(config.app_port);
}
bootstrap();
