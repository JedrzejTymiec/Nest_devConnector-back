import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from '../interfaces/profile.interface';
import { social } from '../interfaces/profile.interface';

@Injectable()
export class ProfileService {
  constructor(@InjectModel('Profile') private readonly profileModel: Model<Profile>) {}

  async createUpdateProfile(id, data) {
    const { youtube, facebook, twitter, instagram, linkedin, ...rest } = data;

    const socialData: social = {};
    if (youtube) socialData.youtube = youtube;
    if (facebook) socialData.facebook = facebook;
    if (twitter) socialData.twitter = twitter;
    if (instagram) socialData.instagram = instagram;
    if (linkedin) socialData.linkedin = linkedin;

    const profileData = { user: id, social: socialData, ...rest };

    profileData.skills = rest.skills.split(',').map((skill) => skill.trim());

    let checkProfile = await this.profileModel.findOne({ user: id });
    if (checkProfile) {
      return await this.profileModel.findOneAndUpdate(
        { user: id },
        { $set: profileData },
        { new: true },
      );
    }

    checkProfile = new this.profileModel(profileData);
    return await checkProfile.save();
  }
}
