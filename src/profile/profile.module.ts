import { Module, HttpModule } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileSchema } from 'src/schema/profile.schema';
import { PostModule } from 'src/post/post.module';
import { UserModule } from 'src/user/user.module';
import { ExperienceModule } from './experience/experience.module';
import { EducationModule } from './education/education.module';
import { AppConfigModule } from 'src/config/config.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Profile', schema: ProfileSchema }]),
    HttpModule,
    UserModule,
    PostModule,
    ExperienceModule,
    EducationModule,
    AppConfigModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule { }
