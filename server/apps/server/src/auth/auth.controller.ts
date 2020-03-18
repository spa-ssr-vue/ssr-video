import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { User } from '@libs/db/models/user.model';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from './decorator/current-user.decorator';


@ApiTags('用户')
@Controller('auth')
export class AuthController {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    private readonly jwtService: JwtService
  ) { }

  @ApiOperation({ description: '注册', summary: '注册' })
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const { username, password } = dto
    const user = await this.userModel.create({ username, password })
    return { user }
  }

  @UseGuards(AuthGuard('local'))
  @ApiOperation({ description: '登录', summary: '登录' })
  @Post('login')
  async login(@Body() dto: LoginDto, @CurrentUser() user: DocumentType<User>) {
    const token = this.jwtService.sign(String(user._id || ''))
    return {
      token
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ description: '获取用户信息', summary: '获取用户信息' })
  @Get('user')
  async getUser(@CurrentUser() user: DocumentType<User>) {
    return user
  }
}
