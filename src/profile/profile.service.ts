import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from '../interfaces/profile.interface';
import { User } from '../interfaces/users.interface';
import { social } from '../interfaces/profile.interface';
import { Post } from 'src/interfaces/post.interfae';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('Profile') private readonly profileModel: Model<Profile>,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Post') private readonly postModel: Model<Post>,
  ) {}

  async createUpdateProfile(id, data): Promise<Profile> {
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

  async getLoggedProfile(id): Promise<Profile> {
    const profile = await this.profileModel
      .findOne({ user: id })
      .populate('user', ['name', 'avatar']);
    if (!profile) {
      throw new BadRequestException('There is no profile for this user');
    }
    return profile;
  }

  async getAllProfiles(): Promise<Profile[]> {
    return await this.profileModel.find().populate('user', ['name', 'avatar']);
  }

  async deleteProfileUserPosts(id): Promise<any> {
    await this.postModel.deleteMany({ user: id });
    await this.profileModel.findOneAndRemove({ user: id });
    await this.userModel.findByIdAndRemove(id);
    return { msg: 'User deleted' };
  }

  async addNewExperience(id, data): Promise<Profile> {
    const profile = await this.profileModel.findOne({ user: id });
    if (!profile) {
      throw new BadRequestException('No profile to add experience');
    }
    profile.experience.unshift(data);
    return await profile.save();
  }
}
