import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import { SalesService, SaleData } from "./sales.service";

@Controller('sales')
export class SalesController{
    constructor(private readonly salesService:SalesService) {}
    @Get()
    async findAll(){
        return this.salesService.findAll();
    }
    @Post()
    async createSale(@Body() saleData:SaleData){
        return this.salesService.createSale(saleData);
    }
    @Put()
    async updateSale(@Body() saleData:SaleData){
        return this.salesService.updateSale(saleData);
    }
    @Delete(':id')
    async deleteSale(@Param('id') id:string){
        return this.salesService.deleteSale(id);
    }
}