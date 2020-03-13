import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Crud } from 'nestjs-mongoose-crud'
import { User } from '@libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('用户')
@Crud({
  model: User
})
@Controller('users')
export class UsersController {
  constructor(@InjectModel(User) private readonly model: ReturnModelType<typeof User>) { }

  @Get('option')
  getOption(): any {
    const option = {
      title: "用户管理",
      column: [
        { label: "用户名", prop: "username", sortable: true, search: true },
        { label: "密码", prop: "password" }
      ]
    }
    return option
  }
}
