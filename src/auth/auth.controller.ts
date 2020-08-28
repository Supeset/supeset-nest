import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthDTO, AuthResponse } from 'src/models/auth.model';
import { R } from 'src/models/response.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  async register(
    @Body(ValidationPipe) body: AuthDTO,
  ): Promise<R<AuthResponse>> {
    const user = await this.authService.register(body);
    return new R<AuthResponse>().success(user);
  }

  @Post('/login')
  async login(@Body(ValidationPipe) body: AuthDTO) {
    return 'null';
  }

  @Post('/refresh')
  async refresh(@Body(ValidationPipe) body: AuthDTO) {
    return 'null';
  }
}
