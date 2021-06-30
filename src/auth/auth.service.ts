import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from 'src/interfaces/users.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
  ) {}

  async validateUser({ email, password }): Promise<any> {
    const user = await this.userModel.find({ email });
    if (user.length > 0) {
      const match = await bcrypt.compare(password, user[0].password);
      if (match) {
        const payload = { user: { id: user[0]._id } };
        return { token: this.jwtService.sign(payload) };
      }
      throw new UnauthorizedException('Invalid Credentials');
    }
    throw new UnauthorizedException('Invalid Credentials');
  }

  async getCurrentlyLogged(id: string): Promise<UserInterface> {
    return await this.userModel.findById(id).select('-password');
  }
}
