import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { Episode } from './episode.model'

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Course {
  @ApiProperty({ description: '课程名称', example: '课程1' })
  @prop()
  name: string

  @ApiProperty({ description: '课程封面链接', example: 'http://...' })
  @prop()
  cover: string
}