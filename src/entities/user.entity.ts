import { Entity, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude, classToPlain } from 'class-transformer';
import { AbstractEntity } from './abstract-entity';

@Entity('user')
export class UserEntity extends AbstractEntity {
  /**
   * 用户名
   */
  @Column({ unique: true })
  username: string;

  /**
   * 密码(HASH加密)
   */
  @Column()
  @Exclude()
  password: string;

  /**
   * 座右铭
   */
  @Column({ default: '' })
  bio: string;

  /**
   * 头像
   */
  @Column({ default: null, nullable: true })
  avatar: string | null;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  /**
   * 验证HASH密码正确性
   * @param attempt 用来对比的字符串
   */
  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  /**
   * 转化为普通JSON
   */
  toJSON() {
    return classToPlain(this);
  }
}
