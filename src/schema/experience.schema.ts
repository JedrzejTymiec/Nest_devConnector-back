import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type ExperienceDocument = Experience & Document;

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

export const ExperienceSchema = SchemaFactory.createForClass(Experience);
