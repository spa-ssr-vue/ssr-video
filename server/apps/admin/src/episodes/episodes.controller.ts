import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud'
import { Episode } from '@libs/db/models/episode.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('课时')
@Crud({
  model: Episode
})
@Controller('episodes')
export class EpisodesController {
  constructor(@InjectModel(Episode) private readonly model: ReturnModelType<typeof Episode>) { }

  @Get('option')
  getOption() {
    const option = {
      title: '课时管理',
      column: [
        { label: '课时名称', prop: 'name' },
        { label: '课时文件', prop: 'file' },
      ]
    }
    return option
  }
}
