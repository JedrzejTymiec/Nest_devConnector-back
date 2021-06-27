import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDataDto } from 'src/dto/profileData.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createUpdate(@Body() profileDto: ProfileDataDto, @Request() req) {
    return this.profileService.createUpdateProfile(req.user.id, profileDto);
  }
}
