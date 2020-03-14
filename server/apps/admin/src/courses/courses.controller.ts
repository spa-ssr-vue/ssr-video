import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud'
import { Course } from '@libs/db/models/course.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('课程')
@Crud({
  model: Course
})
@Controller('courses')
export class CoursesController {
  constructor(@InjectModel(Course) private readonly model: ReturnModelType<typeof Course>) { }

  @Get('option')
  getOption() {
    const option = {
      title: '课程管理',
      column: [
        { label: '课程名称', prop: 'name', sortable: true, search: true },
        {
          label: '课程封面图', prop: 'cover', span: 24, width: 100, type: 'upload', listType: 'picture-img', action: '/upload'
        },
      ]
    }
    return option
  }
} 
