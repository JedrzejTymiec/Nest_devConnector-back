import { Injectable, BadRequestException } from '@nestjs/common';
import { ProfileInterface } from '../interface/profile.interface';
import { ProfileService } from '../profile.service';

@Injectable()
export class ExperienceService {
  constructor(private readonly profileService: ProfileService) {}

  async addNew(id, data): Promise<ProfileInterface> {
    const profile = await this.profileService.getById(id);
    if (!profile) {
      throw new BadRequestException('No profile to add experience');
    }
    profile.experience.unshift(data);
    return profile.save();
  }

  async deleteById(expId, userId): Promise<ProfileInterface> {
    const profile = await this.profileService.getById(userId);
    if (!profile) {
      throw new BadRequestException('Profile not found');
    }
    profile.experience = profile.experience.filter((item) => item.id !== expId);
    return profile.save();
  }

  async updateById(userId, expId, data) {
    const profile = await this.profileService.getById(userId);
    if (!profile) {
      throw new BadRequestException('Profile not found');
    }
    const expToUpd = profile.experience.find((item) => item.id === expId);
    const index = profile.experience.indexOf(expToUpd);
    profile.experience[index] = data;
    return profile.save();
  }
}
