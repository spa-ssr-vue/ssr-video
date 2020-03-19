import { Controller, Get, Param } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Course } from '@libs/db/models/course.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('courses')
export class CoursesController {
  constructor(
    @InjectModel(Course) private readonly courseModel: ReturnModelType<typeof Course>
  ) { }

  @ApiOperation({ description: '获取课程列表', summary: '获取课程列表' })
  @Get()
  async getCourses() {
    const courses = await this.courseModel.aggregate(
      [
        {
          $lookup: {
            from: 'episodes',
            localField: '_id',
            foreignField: 'course',
            as: 'episodes'
          }
        }
      ]
    )

    return {
      courses
    }
  }

  @ApiOperation({ description: '获取课程详情', summary: '获取课程详情' })
  @Get(':id')
  async getCourse(@Param('id') id, @Param() params) {
    console.log(params);
    console.log(id);
    const item = await this.courseModel.findById(id)
    const course = (await this.courseModel.aggregate(
      [
        {
          $match: { name: item.name }
        },
        {
          $lookup: {
            from: 'episodes',
            localField: '_id',
            foreignField: 'course',
            as: 'episodes'
          }
        }
      ]
    )).pop()

    return {
      course
    }

  }


}
