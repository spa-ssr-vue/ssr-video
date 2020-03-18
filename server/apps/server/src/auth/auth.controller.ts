import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '@libs/db/models/user.model';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';


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

  @ApiOperation({ description: '登录', summary: '登录' })
  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto: LoginDto, @Req() req) {
    const { _id } = req.user
    const token = this.jwtService.sign(String(_id || ''))
    return {
      token
    }
  }

  @ApiOperation({ description: '获取用户信息', summary: '获取用户信息' })
  @Get('user')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async getUser(@Req() req) {
    console.log(req);
    return req.user
  }


}
