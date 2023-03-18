import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ["*"],
      methods: ["POST", "GET", "OPTIONS"]
    }
  });

  app.use(new ValidationPipe())
  app.use(helmet)


  
  await app.listen(3000);
}
bootstrap();
