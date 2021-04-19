import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import configuration from './config/configuration';
import { BlogsModule } from './blogs/blogs.module';
import { PostsModule } from './posts/posts.module';
// import { EditorModule } from './editor/editor.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
      inject: [ConfigService],
    }),
    UsersModule,
    BlogsModule,
    PostsModule,
    // EditorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
