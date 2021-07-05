import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDataDto } from 'src/profile/dto/profileData.dto';
import { AuthGuard } from '@nestjs/passport';
import { ProfileInterface } from 'src/profile/interface/profile.interface';
import { ExperienceDto } from 'src/profile/dto/experience.dto';
import { EducationDto } from 'src/profile/dto/education.dto';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createUpdate(
    @Body() profileDto: ProfileDataDto,
    @Request() req,
  ): Promise<ProfileInterface> {
    return this.profileService.createUpdate(req.user.id, profileDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async currentProfile(@Request() req): Promise<ProfileInterface> {
    return this.profileService.getLogged(req.user.id);
  }

  @Get('user/:user_id')
  async getUser(@Param('user_id') id: string): Promise<ProfileInterface> {
    return this.profileService.getUserById(id);
  }

  @Get()
  async allProfiles(): Promise<ProfileInterface[]> {
    return this.profileService.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteProfile(@Request() req): Promise<void> {
    this.profileService.deleteProfileUserPosts(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('experience')
  async addExperience(
    @Body() expDto: ExperienceDto,
    @Request() req,
  ): Promise<ProfileInterface> {
    return this.profileService.addNewExperience(req.user.id, expDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('experience/:exp_id')
  async deleteExperience(
    @Param('exp_id') id: string,
    @Request() req,
  ): Promise<ProfileInterface> {
    return this.profileService.deleteExperienceById(id, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('experience/:exp_id')
  async updateExperience(
    @Body() expDto: ExperienceDto,
    @Request() req,
    @Param('exp_id') id: string,
  ): Promise<any> {
    return this.profileService.updateExperienceById(req.user.id, id, expDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('education')
  async addEducation(
    @Body() eduDto: EducationDto,
    @Request() req,
  ): Promise<ProfileInterface> {
    return this.profileService.addNewEducation(req.user.id, eduDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('education/:edu_id')
  async deleteEducation(
    @Param('edu_id') id: string,
    @Request() req,
  ): Promise<ProfileInterface> {
    return this.profileService.deleteEducationById(id, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('education/:edu_id')
  async updateEducation(
    @Body() eduDto: EducationDto,
    @Request() req,
    @Param('edu_id') id: string,
  ): Promise<any> {
    return this.profileService.updateEducationById(req.user.id, id, eduDto);
  }

  @Get('github/:username')
  async githubRepos(@Param('username') username): Promise<any> {
    return this.profileService.getGithubReposByUsername(username);
  }
}
