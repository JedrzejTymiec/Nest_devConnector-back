import { Injectable, BadRequestException, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProfileInterface } from './interface/profile.interface';
import { SocialInterface } from './interface/social.interface';
import { AppConfigService } from 'src/config/config.service';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/post/post.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('Profile')
    private readonly profileModel: Model<ProfileInterface>,
    private readonly userService: UserService,
    private readonly postService: PostService,
    private readonly httpService: HttpService,
    private readonly config: AppConfigService,
  ) { }

  async createUpdate(id, data): Promise<ProfileInterface> {
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
    return checkProfile.save();
  }

  async getLogged(id): Promise<ProfileInterface> {
    const profile = await this.profileModel
      .findOne({ user: id })
      .populate('user', ['name', 'avatar']);
    // if (!profile) {
    //   throw new BadRequestException('Profile not found');
    // }
    return profile;
  }

  async getById(id): Promise<ProfileInterface> {
    const profile = await this.profileModel
      .findOne({ user: id })
      .populate('user', ['name', 'avatar']);
    if (!profile) {
      throw new BadRequestException('Profile not found');
    }
    return profile;
  }

  async getAll(): Promise<ProfileInterface[]> {
    return this.profileModel.find().populate('user', ['name', 'avatar']);
  }

  async deleteProfileUserPosts(id): Promise<void> {
    await this.postService.removeAllByUser(id);
    await this.profileModel.findOneAndRemove({ user: id });
    await this.userService.removeById(id);
  }

  async getGithubReposByUsername(username): Promise<any> {
    const response = await this.httpService
      .get(`https://api.github.com/users/${username}/repos`, {
        params: {
          per_page: 5,
          sort: 'created:asc',
          client_id: this.config.githubId,
          client_secret: this.config.githubSecret,
        },
      })
      .toPromise();
    return response.data;
  }
}
