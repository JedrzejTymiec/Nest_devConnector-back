import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schema/user.schema';
import { AppConfigService } from 'src/config/config.service';
import { AppConfigModule } from 'src/config/config.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: (config: AppConfigService) => {
        return {
          secret: config.jwtSecret,
          signOptions: {
            expiresIn: '3h',
          },
        };
      },
      inject: [AppConfigService],
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }
