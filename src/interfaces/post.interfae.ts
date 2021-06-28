import { Document, PopulatedDoc } from 'mongoose';
import { User } from './users.interface';

export interface Post {
  user: PopulatedDoc<User & Document>;
  text: string;
  name: string;
  avatar: string;
  likes: [{ [key: string]: like }];
  comments: [{ [key: string]: comment }];
  date: Date;
}

export interface like {
  user: PopulatedDoc<User & Document>;
}

export interface comment {
  user: PopulatedDoc<User & Document>;
  text: string;
  name: string;
  avatar: string;
  date: Date;
}
