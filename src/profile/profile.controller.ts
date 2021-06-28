import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDataDto } from 'src/dto/profileData.dto';
import { AuthGuard } from '@nestjs/passport';
import { Profile } from 'src/interfaces/profile.interface';
import { ExperienceDto } from 'src/dto/experience.dto';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createUpdate(
    @Body() profileDto: ProfileDataDto,
    @Request() req,
  ): Promise<Profile> {
    return this.profileService.createUpdateProfile(req.user.id, profileDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async currentProfile(@Request() req): Promise<Profile> {
    return this.profileService.getLoggedProfile(req.user.id);
  }

  @Get()
  async allProfiles(): Promise<Profile[]> {
    return this.profileService.getAllProfiles();
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteProfile(@Request() req): Promise<any> {
    return this.profileService.deleteProfileUserPosts(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('experience')
  async addExperience(
    @Body() expDto: ExperienceDto,
    @Request() req,
  ): Promise<Profile> {
    return this.profileService.addNewExperience(req.user.id, expDto);
  }

  @Get('user/:user_id')
  async getUser(@Param('user_id') id: string): Promise<Profile> {
    return this.profileService.getUserById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('experience/:exp_id')
  async deleteExperience(
    @Param('exp_id') id: string,
    @Request() req,
  ): Promise<Profile> {
    return this.profileService.deleteExperienceById(id, req.user.id);
  }
}
