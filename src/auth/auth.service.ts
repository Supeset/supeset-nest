import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO, AuthResponse } from 'src/models/auth.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}
  async register(data: AuthDTO) {
    try {
      const user = this.userRepo.create(data);
      await user.save();
      return await this.findCurrentUser(user.username);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username has already been taken');
      }
      throw new InternalServerErrorException();
    }
  }

  async findCurrentUser(username: string): Promise<AuthResponse> {
    const user = await this.userRepo.findOne({ where: { username } });
    const payload = { username: user.username };
    const token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload);
    return {
      id: user.id,
      token,
      refreshToken,
      expiresIn: 3600,
    };
  }
}
