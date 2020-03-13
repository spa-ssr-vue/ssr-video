import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.use

  const options = new DocumentBuilder()
    .setTitle('Video-后台管理API')
    .setDescription('供《Video》网站使用的后台管理系统API')
    .setVersion('1.0')
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  const PORT = process.env.ADMIN_PORT
  await app.listen(PORT);
  console.log(`http://localhost:${PORT}/api-docs`);
}

bootstrap();
