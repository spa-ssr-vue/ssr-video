import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStrategy],
})
export class AuthModule { }
