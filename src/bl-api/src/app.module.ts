import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeachersModule } from './teachers/teachers.module';
import { SalesModule } from "./sales/sales.module";
import {SalesService} from "./sales/sales.service";

@Module({
  imports: [TeachersModule,SalesModule],
  controllers: [AppController],
  providers: [AppService, SalesService],
})
export class AppModule {
  configure(consumer) {
    consumer.apply((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', '*');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    }).forRoutes('*');
  }
}
