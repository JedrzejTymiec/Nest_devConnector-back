import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { AppConfigModule } from 'src/config/config.module';
import { AppConfigService } from 'src/config/config.service';


@Module({
  imports: [
    AppConfigModule,
    PassportModule,
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
    UserModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule { }
