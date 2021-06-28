import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { experience, education, social } from '../interfaces/profile.interface';

export type UserDocument = Profile & Document;

@Schema()
class Experience {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  company: string;

  @Prop()
  location: string;

  @Prop({ required: true })
  from: Date;

  @Prop()
  to: Date;

  @Prop({ default: false })
  current: boolean;

  @Prop()
  description: string;
}

const ExperienceSchema = SchemaFactory.createForClass(Experience);

@Schema()
class Education {
  @Prop({ required: true })
  school: string;

  @Prop({ required: true })
  fieldofstudy: string;

  @Prop({ required: true })
  from: Date;

  @Prop()
  to: Date;

  @Prop({ default: false })
  current: boolean;

  @Prop()
  description: string;
}

const EducationSchema = SchemaFactory.createForClass(Education);

@Schema()
class Social {
  @Prop()
  youtube: string;

  @Prop()
  twitter: string;

  @Prop()
  facebook: string;

  @Prop()
  linkedin: string;

  @Prop()
  instagram: string;
}

const SocialSchema = SchemaFactory.createForClass(Social);

@Schema()
export class Profile {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  company: string;

  @Prop()
  website: string;

  @Prop()
  location: string;

  @Prop({ required: true })
  status: string;

  @Prop({ type: [String], required: true })
  skills: string[];

  @Prop()
  bio: string;

  @Prop()
  githubusername: string;

  @Prop({ type: [ExperienceSchema] })
  experience: experience[];

  @Prop({ type: [EducationSchema] })
  education: education[];

  @Prop({ type: SocialSchema })
  social: social;

  @Prop({ default: Date.now })
  date: Date;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);