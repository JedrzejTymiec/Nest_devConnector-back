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

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) { }

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
    return this.profileService.getById(id);
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

  @Get('github/:username')
  async githubRepos(@Param('username') username): Promise<any> {
    return this.profileService.getGithubReposByUsername(username);
  }
}
