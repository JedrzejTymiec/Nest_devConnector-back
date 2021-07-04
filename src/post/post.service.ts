import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostInterface } from 'src/post/interface/post.interface';
import { UserInterface } from 'src/user/interface/users.interface';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<PostInterface>,
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
  ) { }

  async create(id, data): Promise<PostInterface> {
    const { name, avatar } = await this.userModel
      .findById(id)
      .select('-password');
    const newPost = new this.postModel({ name, avatar, user: id, ...data });
    return newPost.save();
  }

  async getAll(): Promise<PostInterface[]> {
    return this.postModel
      .find()
      .sort({ date: -1 });
  }

  async getById(id): Promise<PostInterface> {
    const post = await this.postModel.findById(id);
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    return post;
  }

  async deleteById(userId, postId): Promise<void> {
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    if (post.userId.toString() !== userId) {
      throw new UnauthorizedException('User not authorized');
    }
    post.delete();
  }

  async likeById(userId, postId): Promise<any> {
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    if (post.likes.filter((like) => like.id == userId).length > 0) {
      throw new BadRequestException('Post already liked');
    }
    post.likes.push(userId);
    post.save();
    return post.likes;
  }

  async unlikeById(userId, postId): Promise<any> {
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    if (post.likes.filter(
      (like) => like.id === userId
    ).length === 0) {
      throw new BadRequestException('Post has not been liked yet');
    }
    const index = post.likes
      .map((like) => like.id)
      .indexOf(userId);
    post.likes.splice(index, 1);
    post.save();
    return post.likes;
  }

  async addCommentByPostId(userId, postId, { text }): Promise<any> {
    const post = await this.postModel.findById(postId);
    const user = await this.userModel
      .findById(userId)
      .select('-password');

    const newComment = {
      text: text,
      name: user.name,
      avatar: user.avatar,
      user: userId,
    };
    console.log(newComment);
    post.comments.unshift(newComment);
    return post.comments;
  }
}
