import {
  Controller,
  Request,
  Post,
  Get,
  UseGuards,
  Body,
  UseFilters
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from 'src/common/guards/jwt-auth.guard';
import { UserInterface } from 'src/user/interface/user.interface';
import { LoginDto } from './dto/login.dto';
import { AuthenticationExceptionFilter } from 'src/common/filters/authorization.filter';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @UseFilters(new AuthenticationExceptionFilter)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.validateUser(loginDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  async currentlyLogged(@Request() req): Promise<UserInterface> {
    return this.authService.getCurrentlyLogged(req.user.id);
  }
}
