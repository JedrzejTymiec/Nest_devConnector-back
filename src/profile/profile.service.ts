import { Injectable, BadRequestException, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProfileInterface } from '../interfaces/profile.interface';
import { UserInterface } from '../interfaces/users.interface';
import { SocialInterface } from '../interfaces/profile.interface';
import { PostInterface } from 'src/interfaces/post.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('Profile')
    private readonly profileModel: Model<ProfileInterface>,
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
    @InjectModel('Post') private readonly postModel: Model<PostInterface>,
    private readonly httpService: HttpService,
    private readonly cofigService: ConfigService
  ) { }

  async createUpdateProfile(id, data): Promise<ProfileInterface> {
    const { youtube, facebook, twitter, instagram, linkedin, ...rest } = data;

    const socialData: SocialInterface = {};
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

  async getLoggedProfile(id): Promise<ProfileInterface> {
    const profile = await this.profileModel
      .findOne({ user: id })
      .populate('user', ['name', 'avatar']);
    if (!profile) {
      throw new BadRequestException('There is no profile for this user');
    }
    return profile;
  }

  async getUserById(id): Promise<ProfileInterface> {
    const profile = await this.profileModel
      .findOne({ user: id })
      .populate('user', ['name', 'avatar']);
    if (!profile) {
      throw new BadRequestException('Profile not found');
    }
    return profile;
  }

  async getAllProfiles(): Promise<ProfileInterface[]> {
    return await this.profileModel.find().populate('user', ['name', 'avatar']);
  }

  async deleteProfileUserPosts(id): Promise<any> {
    await this.postModel.deleteMany({ user: id });
    await this.profileModel.findOneAndRemove({ user: id });
    await this.userModel.findByIdAndRemove(id);
    return { msg: 'User deleted' };
  }

  async addNewExperience(id, data): Promise<ProfileInterface> {
    const profile = await this.profileModel.findOne({ user: id });
    if (!profile) {
      throw new BadRequestException('No profile to add experience');
    }
    profile.experience.unshift(data);
    return await profile.save();
  }

  async deleteExperienceById(expId, userId): Promise<ProfileInterface> {
    const profile = await this.profileModel.findOne({ user: userId });
    if (!profile) {
      throw new BadRequestException('Profile not found');
    }
    profile.experience = profile.experience.filter((item) => item.id !== expId);
    return await profile.save();
  }

  async updateExperienceById(userId, expId, data) {
    const profile = await this.profileModel.findOne({ user: userId });
    if (!profile) {
      throw new BadRequestException('Profile not found');
    }
    const expToUpd = profile.experience.find((item) => item.id === expId);
    const index = profile.experience.indexOf(expToUpd);
    profile.experience[index] = data;
    return profile.save();
  }

  async addNewEducation(id, data): Promise<ProfileInterface> {
    const profile = await this.profileModel.findOne({ user: id });
    if (!profile) {
      throw new BadRequestException('No profile to add experience');
    }
    profile.education.unshift(data);
    return await profile.save();
  }

  async deleteEducationById(eduId, userId): Promise<ProfileInterface> {
    const profile = await this.profileModel.findOne({ user: userId });
    if (!profile) {
      throw new BadRequestException('Profile not found');
    }
    profile.education = profile.education.filter((item) => item.id !== eduId);
    return await profile.save();
  }

  async updateEducationById(userId, eduId, data) {
    const profile = await this.profileModel.findOne({ user: userId });
    if (!profile) {
      throw new BadRequestException('Profile not found');
    }
    const eduToUpd = profile.education.find((item) => item.id === eduId);
    const index = profile.education.indexOf(eduToUpd);
    profile.education[index] = data;
    return profile.save();
  }

  async getGithubReposByUsername(username): Promise<any> {
    const githubId = this.cofigService.get('github.id')
    const githubSecret = this.cofigService.get('github.secret')
    const response = await this.httpService
      .get(`https://api.github.com/users/${username}/repos`, {
        params: {
          per_page: 5,
          sort: 'created:asc',
          client_id: githubId,
          client_secret: githubSecret,
        },
      })
      .toPromise();
    return response.data;
  }
}
