import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import * as dotenv from "dotenv";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ["*"],
      methods: ["POST", "GET", "OPTIONS"]
    }
  });

  app.useGlobalPipes(new ValidationPipe())
  app.use(helmet)
  app.setGlobalPrefix("/api/v1", {
    exclude: [{ path: "healthz", method: RequestMethod.GET }]
  });

  
  await app.listen(3000);
}
bootstrap();
