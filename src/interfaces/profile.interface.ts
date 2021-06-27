import { ObjectId } from 'mongoose';

export interface Profile {
  user: ObjectId;
  company: string;
  website: string;
  location: string;
  status: string;
  skills: [string];
  bio: string;
  githubusername: string;
  experience: [{ [key: string]: experience }];
  education: [{ [key: string]: education }];
  social: { [key: string]: social };
  date: Date;
}

export interface experience {
  title: string;
  company: string;
  location: string;
  from: Date;
  to: Date;
  current: boolean;
  description: string;
}

export interface education {
  school: string;
  fieldofstudy: string;
  from: Date;
  to: Date;
  current: boolean;
  description: string;
}

export interface social {
  [key: string]: string;
}
