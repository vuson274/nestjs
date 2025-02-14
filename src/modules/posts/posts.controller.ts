import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileUploadService } from '../../common/file-upload/file-upload.service';
import { CreatePostDto } from '../../dto/post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly fileUploadService : FileUploadService) {
  }
  private createFileInterceptor() {
    return this.fileUploadService.createFileInterceptor();
  }
  @Post('upload')
  @UseInterceptors(createFileInterceptor)
  uploadFileWithPost(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPostDto: CreatePostDto
  ) {
    console.log('Bài viết:', createPostDto);
    console.log('Tệp tải lên:', file);

    return {
      message: 'Tải lên thành công!',
      filePath: `uploads/${file.filename}`,
      post: createPostDto,
    };
  }
}
