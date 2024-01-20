import { Injectable } from '@nestjs/common';
import { PrismaClient, Teacher } from '@prisma/client';

@Injectable()
export class TeachersService {
    private prisma = new PrismaClient();

    async findAll(): Promise<any[]> {
        return this.prisma.teacher.findMany();
    }
}
