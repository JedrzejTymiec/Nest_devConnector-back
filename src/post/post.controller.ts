import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { PostInterface } from 'src/post/interface/post.interface';
import { PostDto } from 'src/post/dto/post.dto';
import { CommentDto } from 'src/post/dto/comment.dto';

@Controller('post')
export class PostController {
  constructor(private postsService: PostService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createPost(
    @Body() postDto: PostDto,
    @Request() req,
  ): Promise<PostInterface> {
    return this.postsService.create(req.user.id, postDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getPosts(): Promise<PostInterface[]> {
    return this.postsService.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':post_id')
  async getPost(@Param('post_id') id: string): Promise<PostInterface> {
    return this.postsService.getById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':post_id')
  async dletePost(@Param('post_id') id: string, @Request() req): Promise<void> {
    this.postsService.deleteById(req.user.id, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('like/:post_id')
  async likePost(@Request() req, @Param('post_id') id: string): Promise<any> {
    return this.postsService.likeById(req.user.id, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('unlike/:post_id')
  async unlikePost(@Request() req, @Param('post_id') id: string): Promise<any> {
    return this.postsService.unlikeById(req.user.id, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('comment/:post_id')
  async addComment(
    @Param('post_id') id: string,
    @Request() req,
    @Body() commentDto: CommentDto,
  ): Promise<any> {
    return this.postsService.addCommentByPostId(req.user.id, id, commentDto);
  }
}
