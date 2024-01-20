import {Body, Controller, Delete, Get, Post, Put} from "@nestjs/common";
import { SalesService, SaleData } from "./sales.service";

@Controller('sales')
export class SalesController{
    constructor(private readonly salesService:SalesService) {}
    @Get('/findAllSales')
    async findAll(){
        return this.salesService.findAll();
    }
    @Post('/createSale')
    async createSale(@Body() saleData:SaleData){
        return this.salesService.createSale(saleData);
    }
    @Put('/updateSale')
    async updateSale(@Body() saleData:SaleData){
        return this.salesService.updateSale(saleData);
    }
    @Delete('/deleteSale')
    async deleteSale(@Body() id:string){
        return this.salesService.deleteSale(id);
    }
}