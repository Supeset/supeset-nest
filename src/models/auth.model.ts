import { IsString, MinLength, MaxLength } from 'class-validator';
export class AuthDTO {
  /**
   * 用户名
   */
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
  /**
   * 密码
   */
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  password: string;
}

export class AuthResponse {
  id: string;
  token: string;
  refreshToken: string;
  expiresIn: number;
}
