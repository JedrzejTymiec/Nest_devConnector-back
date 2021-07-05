import { Module, HttpModule } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileSchema } from 'src/schema/profile.schema';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from 'src/post/post.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Profile', schema: ProfileSchema }]),
    HttpModule,
    ConfigModule,
    UserModule,
    PostModule
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule { }
