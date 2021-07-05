import { Module } from '@nestjs/common';
import { AppConfigService } from './config.service';
import { ConfigService, ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import * as Joi from '@hapi/joi'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        MONGO_URI: Joi.string(),
        JWT_SECRET: Joi.string(),
        GITHUB_ID: Joi.string(),
        GITHUB_SECRET: Joi.string()
      }),
    }),
  ],
  providers: [AppConfigService, ConfigService],
  exports: [AppConfigService, ConfigService]
})
export class AppConfigModule { }
