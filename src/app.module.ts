import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { PostModule } from './post/post.module';
import { AppConfigModule } from './config/config.module';
import { AppConfigService } from './config/config.service';

@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: (config: AppConfigService) => ({
        uri: config.mongoUri
      }),
      inject: [AppConfigService],
    }),
    AuthModule,
    UserModule,
    ProfileModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
