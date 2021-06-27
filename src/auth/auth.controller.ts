import { Controller, Request, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/interfaces/users.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {
    return this.authService.validateUser(req.body.email, req.body.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async currentlyLogged(@Request() req): Promise<User> {
    return this.authService.getCurrentlyLogged(req.user.id);
  }
}
