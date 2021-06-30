import { Document, PopulatedDoc } from 'mongoose';
import { UserInterface } from './users.interface';

export interface PostInterface {
  user: PopulatedDoc<UserInterface & Document>;
  text: string;
  name: string;
  avatar: string;
  likes: [{ [key: string]: LikeInterface }];
  comments: [{ [key: string]: CommentInterface }];
  date: Date;
}

export interface LikeInterface {
  user: PopulatedDoc<UserInterface & Document>;
}

export interface CommentInterface {
  user: PopulatedDoc<UserInterface & Document>;
  text: string;
  name: string;
  avatar: string;
  date: Date;
}
