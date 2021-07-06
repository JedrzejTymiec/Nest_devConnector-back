import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Delete,
  Param,
  UseFilters
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDataDto } from 'src/profile/dto/profileData.dto';
import { JwtGuard } from 'src/common/guards/jwt-auth.guard';
import { ProfileInterface } from 'src/profile/interface/profile.interface';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) { }

  @UseGuards(JwtGuard)
  @Post()
  async createUpdate(
    @Body() profileDto: ProfileDataDto,
    @Request() req,
  ): Promise<ProfileInterface> {
    return this.profileService.createUpdate(req.user.id, profileDto);
  }

  @UseGuards(JwtGuard)
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

  @UseGuards(JwtGuard)
  @Delete()
  async deleteProfile(@Request() req): Promise<void> {
    this.profileService.deleteProfileUserPosts(req.user.id);
  }

  @Get('github/:username')
  async githubRepos(@Param('username') username): Promise<any> {
    return this.profileService.getGithubReposByUsername(username);
  }
}
