import { Module, HttpModule } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileSchema } from 'src/schema/profile.schema';
import { UserSchema } from 'src/schema/user.schema';
import { PostSchema } from 'src/schema/post.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Profile', schema: ProfileSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
    HttpModule,
    ConfigModule
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule { }
