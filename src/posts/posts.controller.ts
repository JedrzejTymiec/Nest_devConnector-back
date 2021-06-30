import {
    Controller,
    Post,
    Body,
    Request,
    UseGuards,
    Get,
    Param,
    Delete
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';
import { PostInterface } from 'src/interfaces/post.interface';
import { PostDto } from 'src/dto/post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createPost(@Body() postDto: PostDto, @Request() req): Promise<PostInterface> {
    return this.postsService.addNewPost(req.user.id, postDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getPosts(): Promise<PostInterface[]> {
      return this.postsService.getAllPosts()
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':post_id')
  async getPost(@Param('post_id') id: string): Promise<PostInterface> {
      return this.postsService.getPostById(id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':post_id')
  async dletePost(
    @Param('post_id') id: string,
    @Request() req
  ): Promise<any> {
      return this.postsService.deletePostById(req.user.id, id)
  }
}
