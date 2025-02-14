import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { FileUploadService } from '../../common/file-upload/file-upload.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, FileUploadService],
})
export class PostsModule {}
