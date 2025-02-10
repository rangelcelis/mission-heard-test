import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionRepository {
  private readonly logger = new Logger(TransactionRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    this.logger.log('Getting all transactions');
    return await this.prisma.transaction.findMany();
  }

  async getById(id: number) {
    this.logger.log(`Getting transaction by ID: ${id}`);
    return await this.prisma.transaction.findFirst({ where: { id } });
  }

  async create(data: Prisma.TransactionCreateInput) {
    this.logger.log('Creating a new transaction');
    return await this.prisma.transaction.create({ data });
  }

  async update(id: number, data: Prisma.TransactionUpdateInput) {
    this.logger.log(`Updating transaction by ID: ${id}`);
    return await this.prisma.transaction.update({ where: { id }, data });
  }

  async delete(id: number) {
    this.logger.log(`Deleting transaction by ID: ${id}`);
    return await this.prisma.transaction.delete({ where: { id } });
  }
}
