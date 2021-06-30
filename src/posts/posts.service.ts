import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostInterface } from 'src/interfaces/post.interface';
import { UserInterface } from 'src/interfaces/users.interface';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<PostInterface>,
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
  ) {}

  async addNewPost(id, data): Promise<PostInterface> {
    const { name, avatar } = await this.userModel
      .findById(id)
      .select('-password');
    const newPost = new this.postModel({ name, avatar, user: id, ...data });
    return await newPost.save();
  }

  async getAllPosts(): Promise<PostInterface[]> {
      return await this.postModel.find().sort({ date: -1 })
  }

  async getPostById(id): Promise<PostInterface> {
      const post = await this.postModel.findById(id)
      if (!post) {
          throw new BadRequestException('Post not found')
      }
      return post
  }

  async deletePostById(userId, postId): Promise<any> {
    const post = await this.postModel.findById(postId)
    if(!post) {
        throw new BadRequestException('Post not found')
    }
    if(post.user != userId) {
        throw new UnauthorizedException('User not authorized')
    }
    post.delete()
    return { msg: 'Post deleted' }
  }
}
