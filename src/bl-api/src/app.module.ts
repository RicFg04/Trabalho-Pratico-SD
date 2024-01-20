import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeachersModule } from './teachers/teachers.module';
import { SalesModule } from "./sales/sales.module";

@Module({
  imports: [TeachersModule,SalesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
