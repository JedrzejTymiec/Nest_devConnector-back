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
  UseFilters
} from '@nestjs/common';
import { PostService } from './post.service';
import { JwtGuard } from 'src/common/guards/jwt-auth.guard';
import { PostInterface } from 'src/post/interface/post.interface';
import { PostDto } from 'src/post/dto/post.dto';
import { CommentDto } from 'src/post/dto/comment.dto';

@Controller('post')
export class PostController {
  constructor(private postsService: PostService) { }

  @UseGuards(JwtGuard)
  @Post()
  async createPost(
    @Body() postDto: PostDto,
    @Request() req,
  ): Promise<PostInterface> {
    return this.postsService.create(req.user.id, postDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  async getPosts(): Promise<PostInterface[]> {
    return this.postsService.getAll();
  }

  @UseGuards(JwtGuard)
  @Get(':post_id')
  async getPost(@Param('post_id') id: string): Promise<PostInterface> {
    return this.postsService.getById(id);
  }

  @UseGuards(JwtGuard)
  @Delete(':post_id')
  async dletePost(@Param('post_id') id: string, @Request() req): Promise<void> {
    this.postsService.deleteById(req.user.id, id);
  }

  @UseGuards(JwtGuard)
  @Put('like/:post_id')
  async likePost(@Request() req, @Param('post_id') id: string): Promise<any> {
    return this.postsService.likeById(req.user.id, id);
  }

  @UseGuards(JwtGuard)
  @Put('unlike/:post_id')
  async unlikePost(@Request() req, @Param('post_id') id: string): Promise<any> {
    return this.postsService.unlikeById(req.user.id, id);
  }

  @UseGuards(JwtGuard)
  @Post('comment/:post_id')
  async addComment(
    @Param('post_id') id: string,
    @Request() req,
    @Body() commentDto: CommentDto,
  ): Promise<any> {
    return this.postsService.addCommentByPostId(req.user.id, id, commentDto);
  }
}
