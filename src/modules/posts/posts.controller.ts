import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Request,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { CreatePostDto } from '../../dto/post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { Post as PostEntity } from '../../entities/Post';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
@ApiBearerAuth()
@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFileWithPost(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPostDto: CreatePostDto,
    @Request() req: any,
  ) {
    // console.log(file);
    // console.log(createPostDto);
    const user = req.user.id;
    return this.postService.createPost(file, createPostDto, user);
  }

  @Get()
  findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  @ApiOperation({ summary: 'Get post' })
  @ApiResponse({ status: 200, description: 'Return post' })
  @Get(':id')
  findById(@Param('id') id: string): Promise<PostEntity | null> {
    const postId = Number(id);
    return this.postService.findPostById(postId);
  }
}
