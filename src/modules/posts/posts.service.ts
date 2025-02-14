import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../entities/Post';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../../dto/post.dto';
import { join } from 'path';
import { writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { User } from '../../entities/User';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  async createPost(
    file: Express.Multer.File,
    postData: Partial<CreatePostDto>,
    user: User,
  ): Promise<Post | null> {
    if (!file) {
      throw new NotFoundException('File not found');
    }
    if (!postData) {
      throw new NotFoundException('Post not found');
    }
    const filename = `${uuidv4()}-${file.originalname}`;
    const uploadDir = join(__dirname, '..', '..', 'uploads');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }
    const filePath = join(uploadDir, filename);
    if (existsSync(filePath)) {
      throw new Error(`File path is a directory: ${filePath}`);
    }

    await writeFile(filePath, file.buffer);
    const post = this.postsRepository.create(postData);
    post.created_at = new Date();
    post.updated_at = new Date();
    post.user = user;
    post.image = filename;
    return await this.postsRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return await this.postsRepository.find({
      relations: ['user'],
    });
  }

  async findPostById(id: number): Promise<Post | null> {
    return await this.postsRepository.findOneBy({ id });
  }
}
