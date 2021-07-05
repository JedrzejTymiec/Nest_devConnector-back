import { ObjectId } from 'mongoose';

export interface UserInterface {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  avatar: string;
  date: Date;
}
