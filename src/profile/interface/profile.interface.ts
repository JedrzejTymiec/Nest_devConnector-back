import { Document, PopulatedDoc } from 'mongoose';
import { UserInterface } from '../../user/interface/user.interface';
import { EducationInterface } from './education.interface';
import { ExperienceInterface } from './experience.interface';
import { SocialInterface } from './social.interface';

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
