import { Injectable, BadRequestException } from '@nestjs/common';
import { RegisterDto } from 'src/user/dto/register.dto';
import { UserInterface } from 'src/user/interface/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as gravatar from 'gravatar';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
    private jwtService: JwtService,
  ) {}

  async registerUser(data: RegisterDto): Promise<any> {
    const { name, password } = data;
    const email = data.email.toLowerCase();

    const checkUser = await this.userModel.find({ email });
    if (checkUser.length > 0) {
      throw new BadRequestException('Email already registred');
    }

    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });

    const user = new this.userModel({ name, password, email, avatar });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { user: { id: user.id } };
    return { token: this.jwtService.sign(payload) };
  }

  async findByEmail(email): Promise<UserInterface> {
    return this.userModel.findOne({ email });
  }

  async findById(id): Promise<UserInterface> {
    return this.userModel.findById(id).select('-password');
  }

  async removeById(id): Promise<void> {
    this.userModel.findByIdAndRemove(id);
  }
}
