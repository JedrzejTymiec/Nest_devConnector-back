import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
    constructor(private configService: ConfigService) { }

    get mongoUri(): string {
        return this.configService.get<string>('mongo.uri')
    }

    get jwtSecret(): string {
        return this.configService.get<string>('jwt.secret')
    }

    get githubId(): string {
        return this.configService.get<string>('github.id')
    }

    get githubSecret(): string {
        return this.configService.get<string>('github.secret')
    }
}
