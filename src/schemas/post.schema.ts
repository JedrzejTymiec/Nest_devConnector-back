import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '../interfaces/users.interface';
import { comment } from 'src/interfaces/post.interfae';
import { like } from 'src/interfaces/post.interfae';

export type PostDocument = Post & Document;

Schema();
class Like {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

const LikeSchema = SchemaFactory.createForClass(Like);

Schema();
class Comment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true })
  text: string;

  @Prop()
  name: string;

  @Prop()
  avatar: string;

  @Prop({ default: Date.now })
  date: Date;
}

const CommentSchema = SchemaFactory.createForClass(Comment);

@Schema()
export class Post {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true })
  text: string;

  @Prop()
  name: string;

  @Prop()
  avatar: string;

  @Prop({ type: [LikeSchema] })
  likes: like[];

  @Prop({ type: [CommentSchema] })
  comments: comment[];

  @Prop({ default: Date.now })
  date: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
