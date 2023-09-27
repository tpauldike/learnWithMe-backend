import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, AuthUser } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    // console.log({dto});
    return this.authService.signup(dto);
  }

  @Post('signin') 
  signin(@Body() dto: AuthUser) {
    return this.authService.signin(dto);
  }
}
