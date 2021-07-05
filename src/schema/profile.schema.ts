import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { SocialInterface } from 'src/profile/interface/social.interface';
import { EducationInterface } from 'src/profile/education/interface/education.interface';
import { ExperienceInterface } from 'src/profile/experience/interface/experience.interface';
import { ExperienceSchema } from './experience.schema';
import { EducationSchema } from './education.schema';
import { SocialSchema } from './social.schema';

export type ProfileDocument = Profile & Document;

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
  experience: ExperienceInterface[];

  @Prop({ type: [EducationSchema] })
  education: EducationInterface[];

  @Prop({ type: SocialSchema })
  social: SocialInterface;

  @Prop({ default: Date.now })
  date: Date;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
