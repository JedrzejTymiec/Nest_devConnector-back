import {
  Controller,
  UseGuards,
  Post,
  Body,
  Request,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { JwtGuard } from 'src/common/guards/jwt-auth.guard';
import { EducationDto } from './dto/education.dto';
import { ProfileInterface } from '../interface/profile.interface';
import { EducationService } from './education.service';

@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) { }

  @UseGuards(JwtGuard)
  @Post('education')
  async add(
    @Body() eduDto: EducationDto,
    @Request() req,
  ): Promise<ProfileInterface> {
    return this.educationService.addNew(req.user.id, eduDto);
  }

  @UseGuards(JwtGuard)
  @Delete('education/:edu_id')
  async delete(
    @Param('edu_id') id: string,
    @Request() req,
  ): Promise<ProfileInterface> {
    return this.educationService.deleteById(id, req.user.id);
  }

  @UseGuards(JwtGuard)
  @Put('education/:edu_id')
  async update(
    @Body() eduDto: EducationDto,
    @Request() req,
    @Param('edu_id') id: string,
  ): Promise<any> {
    return this.educationService.updateById(req.user.id, id, eduDto);
  }
}
