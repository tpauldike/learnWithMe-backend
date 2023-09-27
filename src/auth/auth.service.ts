import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, AuthUser } from './dto/auth.dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    const hashedPassword = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          fullName: dto.fullName,
          userName: dto.userName,
          email: dto.email,
          hashedPassword,
        },
      });

      delete user.hashedPassword;

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('User with this email exist!');
        }
      }
    }
  }

  async signin(dto: AuthUser) {
    
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Incorrect email or password!');
    }

    const verifiedPassword = await argon.verify(
      user.hashedPassword,
      dto.password,
    );
    if (!verifiedPassword) {
      throw new ForbiddenException('Incorrect email or password!');
    }
    return { msg: 'Successfully signed in', user: user['fullName'], username: user['userName'], email: user['email'] };
  }
}
