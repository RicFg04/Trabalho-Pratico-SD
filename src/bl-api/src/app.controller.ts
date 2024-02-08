import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/sales')
  async getSales(){
    return this.appService.getSales();
  }
  @Post('/createSale')
  async createSale(@Body() sale: any){
    console.log("Sale Controller")
    console.log(sale);
    return this.appService.createSale(sale);
  }
  @Put('/updateSale')
  async updateSale(@Body() sale: any){
    return await this.appService.updateSale(sale);
  }
  @Delete('/deleteSale/:id')
  async deleteSale(@Param('id') id: string){
    return await this.appService.deleteSale(id);
  }
}
