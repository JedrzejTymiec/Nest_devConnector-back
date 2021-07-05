import { Injectable, BadRequestException } from '@nestjs/common';
import { ProfileService } from '../profile.service';
import { ProfileInterface } from '../interface/profile.interface';

@Injectable()
export class EducationService {
    constructor(
        private readonly profileService: ProfileService
    ) { }

    async addNew(id, data): Promise<ProfileInterface> {
        const profile = await this.profileService.getById(id)
        if (!profile) {
            throw new BadRequestException('No profile to add experience');
        }
        profile.education.unshift(data);
        return profile.save();
    }

    async deleteById(eduId, userId): Promise<ProfileInterface> {
        const profile = await this.profileService.getById(userId)
        if (!profile) {
            throw new BadRequestException('Profile not found');
        }
        profile.education = profile.education.filter((item) => item.id !== eduId);
        return profile.save();
    }

    async updateById(userId, eduId, data) {
        const profile = await this.profileService.getById(userId)
        if (!profile) {
            throw new BadRequestException('Profile not found');
        }
        const eduToUpd = profile.education.find((item) => item.id === eduId);
        const index = profile.education.indexOf(eduToUpd);
        profile.education[index] = data;
        return profile.save();
    }
}
