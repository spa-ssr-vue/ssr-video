import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EpisodesModule } from './episodes/episodes.module';
import { MulterModule } from '@nestjs/platform-express';
import { CommonModule } from '@app/common';
import multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    console.log(file);
    const fileSuffix = file.originalname.split('.').pop()
    console.log(file);
    cb(null, `${file.fieldname}${Date.now()}.${fileSuffix}`)
  }
})


@Module({
  imports:
    [
      CommonModule,
      MulterModule.register({
        storage: storage
      }),
      UsersModule,
      CoursesModule,
      EpisodesModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
