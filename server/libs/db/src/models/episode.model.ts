import { prop, modelOptions } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'

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
}