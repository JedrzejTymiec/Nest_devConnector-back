import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDataDto } from 'src/dto/profileData.dto';
import { AuthGuard } from '@nestjs/passport';
import { Profile } from 'src/interfaces/profile.interface';

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
}
