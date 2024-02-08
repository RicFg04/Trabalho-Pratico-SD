import {Injectable} from '@nestjs/common';
import {PrismaClient, Sales} from '@prisma/client';

export type SaleData = Partial<Sales> & { id: string };

function isValidMonth(month: any): boolean{
    return Number.isInteger(month) && month >= 1 && month <= 12;
}

function isValidYear(year: any): boolean{
    return Number.isInteger(year) && year >= 2000 && year <= 2100;
}

@Injectable()
export class SalesService {
    private prisma = new PrismaClient();

    async findAll(): Promise<any[]> {
        return this.prisma.sales.findMany();
    }

    async createSale(saleData: SaleData): Promise<Sales> {
        console.log("Create Sale")
        console.log(saleData);
        if (!saleData.id) {
            throw new Error('id is required');
        }
        if (!isValidMonth(saleData.cal_month_num)) {
            throw new Error('valid month number is required');
        }
        if (!isValidYear(saleData.calendar_year)) {
            throw new Error('valid calendar year is required');
        }
        const existingSale = await this.prisma.sales.findUnique({
            where: {id: saleData.id}
        });
        if (existingSale) {
            throw new Error('a sale with this id already exists');
        }
        saleData.id = saleData.id.toString();

        return this.prisma.sales.create({
            data: saleData as Sales
        });
    }

    async updateSale(saleData: SaleData): Promise<Sales> {
        console.log("Update Sale")
        console.log(saleData);
        if (!saleData.id) {
            throw new Error('id is required');
        }
        if (!isValidMonth(saleData.cal_month_num)) {
            throw new Error('valid month number is required');
        }
        if (!isValidYear(saleData.calendar_year)) {
            throw new Error('valid calendar year is required');
        }
        const existingSale = await this.prisma.sales.findUnique({
            where: {id: saleData.id}
        });
        if (!existingSale) {
            throw new Error('a sale with this id does not exist');
        }
        saleData.id = saleData.id.toString();

        return this.prisma.sales.update({
            where: {id: saleData.id},
            data: saleData as Sales
        });
    }
    async deleteSale(id: string): Promise<Sales> {
        console.log("Delete Sale")
        console.log(id);
        if (!id) {
            throw new Error('id is required');
        }
        const existingSale = await this.prisma.sales.findUnique({
           where: {id: id}
        });
        if (!existingSale) {
            throw new Error('a sale with this id does not exist');
        }
        return this.prisma.sales.delete({
            where: {id: id}
        });
    }
}

