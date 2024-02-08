import { Injectable } from '@nestjs/common';
import {SalesService} from "./sales/sales.service";

@Injectable()
export class AppService {
  constructor(private salesService: SalesService){
  }
  getHello(): string {
    return 'Hello World!';
  }
  async getSales(){
    const sales = await this.salesService.findAll();
    return sales;
  }
  async createSale(sale: any){
    await this.salesService.createSale(sale);
    return 'Sale created';
  }
  async updateSale(sale: any){
    await this.salesService.updateSale(sale);
    return 'Sale updated';
  }
  async deleteSale(id: string){
    await this.salesService.deleteSale(id);
    return 'Sale deleted';
  }
}
