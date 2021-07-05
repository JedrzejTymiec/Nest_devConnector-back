import { forwardRef, Module } from '@nestjs/common';
import { ProfileModule } from '../profile.module';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';

@Module({
  imports: [forwardRef(() => ProfileModule)],
  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationModule { }
