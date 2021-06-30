import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';
import { PostInterface } from 'src/interfaces/post.interface';
import { PostDto } from 'src/dto/post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createPost(@Body() postDto: PostDto, @Request() req): Promise<any> {
    return this.postsService.addNewPost(req.user.id, postDto);
  }
}
