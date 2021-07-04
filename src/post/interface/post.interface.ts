import { Document, PopulatedDoc } from 'mongoose';
import { UserInterface } from '../../user/interface/users.interface';
import { LikeInterface } from './like.interface';

export interface PostInterface {
  user: PopulatedDoc<UserInterface & Document>;
  text: string;
  name: string;
  avatar: string;
  likes: { [key: string]: LikeInterface }[];
  comments: any;
  date: Date;
}