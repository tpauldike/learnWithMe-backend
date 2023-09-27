import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BroadcastListModule } from './broadcast-list/broadcast-list.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [AuthModule, UserModule, BroadcastListModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
