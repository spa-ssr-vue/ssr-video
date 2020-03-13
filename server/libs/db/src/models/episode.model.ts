import { prop, modelOptions, Ref } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { Course } from './course.model'

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Episode {
  @ApiProperty({ description: '课时名称', example: '课时1' })
  @prop()
  name: string

  @ApiProperty({ description: '课时文件链接', example: 'http://...' })
  @prop()
  file: string

  @prop({ ref: 'Course' })
  course: Ref<Course>
}