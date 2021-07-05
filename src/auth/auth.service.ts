import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserInterface } from 'src/user/interface/user.interface';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) { }

  async validateUser({ email, password }): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid Credentials');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new BadRequestException('Invalid Credentials');
    }
    const token = this.jwtService.sign({
      user: {
        id: user._id,
      },
    });
    return { token };
  }

  async getCurrentlyLogged(id: string): Promise<UserInterface> {
    return this.userService.findById(id);
  }
}
