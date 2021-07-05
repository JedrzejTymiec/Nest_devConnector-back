import {
  Controller,
  Request,
  Post,
  Get,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserInterface } from 'src/user/interface/user.interface';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.validateUser(loginDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async currentlyLogged(@Request() req): Promise<UserInterface> {
    return this.authService.getCurrentlyLogged(req.user.id);
  }
}
