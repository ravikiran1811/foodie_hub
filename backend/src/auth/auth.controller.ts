import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/gql-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('status')
  getStatus() {
    return { status: 'Auth service is running' };
  }
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    console.log('Login attempt:', loginDto);
    // debugger;
    return this.authService.login(loginDto);
  }

  @Get('permissions')
  @UseGuards(JwtAuthGuard)
  async getPermissions(@CurrentUser() user: any) {
    console.log('Fetching permissions for user:', user);
    return this.authService.getUserPermissions(user.sub);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() user: any) {
    return { user };
  }
}
