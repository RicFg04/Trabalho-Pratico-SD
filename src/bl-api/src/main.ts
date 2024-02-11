import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  }));
  await app.listen(process.env.PORT);
}
bootstrap();
