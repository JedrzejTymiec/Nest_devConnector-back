import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type ProfileDocument = Education & Document;

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

export const EducationSchema = SchemaFactory.createForClass(Education);
