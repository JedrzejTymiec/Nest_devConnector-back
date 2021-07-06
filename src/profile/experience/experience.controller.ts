import {
  Controller,
  UseGuards,
  Post,
  Body,
  Request,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { JwtGuard } from 'src/common/guards/jwt-auth.guard';
import { ExperienceDto } from './dto/experience.dto';
import { ProfileInterface } from '../interface/profile.interface';
import { ExperienceService } from './experience.service';

@Controller('profile/experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) { }

  @UseGuards(JwtGuard)
  @Post()
  async add(
    @Body() expDto: ExperienceDto,
    @Request() req,
  ): Promise<ProfileInterface> {
    return this.experienceService.addNew(req.user.id, expDto);
  }

  @UseGuards(JwtGuard)
  @Delete('/:exp_id')
  async delete(
    @Param('exp_id') id: string,
    @Request() req,
  ): Promise<ProfileInterface> {
    return this.experienceService.deleteById(id, req.user.id);
  }

  @UseGuards(JwtGuard)
  @Put('/:exp_id')
  async update(
    @Body() expDto: ExperienceDto,
    @Request() req,
    @Param('exp_id') id: string,
  ): Promise<any> {
    return this.experienceService.updateById(req.user.id, id, expDto);
  }
}
