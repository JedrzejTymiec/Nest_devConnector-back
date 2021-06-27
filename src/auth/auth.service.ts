import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/interfaces/users.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userModel.find({ email });
    if (user.length > 0) {
      const match = await bcrypt.compare(pass, user[0].password);
      if (match) {
        const payload = { user: { id: user[0]._id } };
        return { token: this.jwtService.sign(payload) };
      }
      throw new UnauthorizedException('Invalid Credentials');
    }
    throw new UnauthorizedException('Invalid Credentials');
  }
}
