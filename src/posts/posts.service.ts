import { Injectable, BadRequestException } from '@nestjs/common';
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

  async addNewPost(id, data): Promise<any> {
    const { name, avatar } = await this.userModel
      .findById(id)
      .select('-password');
    const newPost = new this.postModel({ name, avatar, user: id, ...data });
    return await newPost.save();
  }
}
