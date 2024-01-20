import {Injectable} from '@nestjs/common';
import {PrismaClient, Sales} from '@prisma/client';

export type SaleData = Partial<Sales> & { id: string };

@Injectable()
export class SalesService {
    private prisma = new PrismaClient();

    async findAll(): Promise<any[]> {
        return this.prisma.sales.findMany();
    }

    async createSale(saleData: SaleData): Promise<Sales> {
        if (!saleData.id) {
            throw new Error('id is required');
        }
        saleData.id = saleData.id.toString();

        return this.prisma.sales.create({
            data: saleData as Sales
        });
    }

    async updateSale(saleData: SaleData): Promise<Sales> {
        if (!saleData.id) {
            throw new Error('id is required');
        }
        saleData.id = saleData.id.toString();

        return this.prisma.sales.update({
            where: {id: saleData.id},
            data: saleData as Sales
        });
    }
    async deleteSale(id: string): Promise<Sales> {
        return this.prisma.sales.delete({
            where: {id: id}
        });
    }
}

