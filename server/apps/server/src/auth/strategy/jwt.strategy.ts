import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@InjectModel(User) private readonly userModel: ReturnModelType<typeof User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET
    } as StrategyOptions)
  }

  async validate(id) {
    console.log(id);
    const user = await this.userModel.findById(id)
    return user
  }
}