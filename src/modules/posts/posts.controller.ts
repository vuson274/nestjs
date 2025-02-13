import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreatePostDto } from '../../dto/post.dto';
import { extname } from 'path';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const filename = Date.now() + extname(file.originalname);
          callback(null, filename);
        },
      }),
    }),
  )
  createPost(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (image) {
      createPostDto.image = image.filename;
    }
    return this.postService.create(createPostDto);
  }
}
