import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type ProfileDocument = Social & Document;

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

export const SocialSchema = SchemaFactory.createForClass(Social);
