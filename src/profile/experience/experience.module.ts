import { Module, forwardRef } from '@nestjs/common';
import { ProfileModule } from '../profile.module';
import { ExperienceController } from './experience.controller';
import { ExperienceService } from './experience.service';

@Module({
  imports: [forwardRef(() => ProfileModule)],
  controllers: [ExperienceController],
  providers: [ExperienceService],
})
export class ExperienceModule {}
