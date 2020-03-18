import { prop, modelOptions } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { hashSync } from 'bcryptjs';

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class User {
  @ApiProperty({ description: '用户名', example: 'user1' })
  @prop()
  username: string

  @ApiProperty({ description: '密码', example: '123456' })
  @prop({
    select: false,
    get(val) {
      return val
    },
    set(val) {
      return val ? hashSync(val, 10) : val
    },
  })
  password: string

}