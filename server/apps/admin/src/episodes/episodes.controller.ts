import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud'
import { Episode } from '@libs/db/models/episode.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';
import { Course } from '@libs/db/models/course.model';

@ApiTags('课时')
@Crud({
  model: Episode
})
@Controller('episodes')
export class EpisodesController {
  constructor(
    @InjectModel(Episode) private readonly model: ReturnModelType<typeof Episode>,
    @InjectModel(Course) private readonly course: ReturnModelType<typeof Course>
  ) { }

  @Get('option')
  async getOption() {
    const courses = (await this.course.find()).map(item => ({ label: item.name, value: item._id }))
    const option = {
      title: '课时管理',
      translate: false,
      column: [
        { label: '所属课程', prop: 'course', span: 24, type: "select", dicData: courses, value: null },
        { label: '课时名称', prop: 'name', span: 24, sortable: true, search: true },
        {
          label: '课时文件', prop: 'file', span: 24, width: 100, type: 'upload', params: {
            is: 'video'
          }, listType: 'picture-img', action: "/upload", slot: true
        },
      ]
    }
    return option
  }
}
