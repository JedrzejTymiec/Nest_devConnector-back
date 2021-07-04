import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { UserInterface } from '../user/interface/users.interface';
import { CommentInterface } from 'src/post/interface/comment.interface';
import { LikeInterface } from 'src/post/interface/like.interface';

export type PostDocument = Post & Document;

Schema();
class Like {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: UserInterface;
}

const LikeSchema = SchemaFactory.createForClass(Like);

Schema();
class Comment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: UserInterface;

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
  userId: UserInterface;

  @Prop({ required: true })
  text: string;

  @Prop()
  name: string;

  @Prop()
  avatar: string;

  @Prop({ type: [LikeSchema] })
  likes: LikeInterface[];

  @Prop({ type: [CommentSchema] })
  comments: CommentInterface[];

  @Prop({ default: Date.now })
  date: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
