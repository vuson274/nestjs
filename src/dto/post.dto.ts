import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'My first post' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'This is the content of the post' })
  @IsString()
  description: string;
}
