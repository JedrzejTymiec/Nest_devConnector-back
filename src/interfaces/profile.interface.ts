import { Document, PopulatedDoc } from 'mongoose';
import { UserInterface } from './users.interface';

export interface ProfileInterface {
  user: PopulatedDoc<UserInterface & Document>;
  company: string;
  website: string;
  location: string;
  status: string;
  skills: [string];
  bio: string;
  githubusername: string;
  experience: { [key: string]: ExperienceInterface }[];
  education: { [key: string]: EducationInterface }[];
  social: { [key: string]: SocialInterface };
  date: Date;
}

export interface ExperienceInterface {
  title: string;
  company: string;
  location: string;
  from: Date;
  to: Date;
  current: boolean;
  description: string;
}

export interface EducationInterface {
  school: string;
  fieldofstudy: string;
  from: Date;
  to: Date;
  current: boolean;
  description: string;
}

export interface SocialInterface {
  [key: string]: string;
}
