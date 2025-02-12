import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionRepository {
  private readonly logger = new Logger(TransactionRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<any[]> {
    this.logger.debug('Getting all transactions');

    try {
      return await this.prisma.transaction.findMany();
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to get all transactions');
    }
  }

  async getById(id: number): Promise<any> {
    this.logger.debug(`Getting transaction by ID: ${id}`);

    try {
      return await this.prisma.transaction.findFirst({ where: { id } });
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to get transaction');
    }
  }

  async create(data: Prisma.TransactionCreateInput): Promise<number> {
    this.logger.debug('Creating a new transaction');

    try {
      const { id } = await this.prisma.transaction.create({ data });
      return id;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to create transaction');
    }
  }

  async update(
    id: number,
    data: Prisma.TransactionUpdateInput,
  ): Promise<boolean> {
    this.logger.debug(`Updating transaction by ID: ${id}`);

    try {
      const transaction = await this.prisma.transaction.update({
        where: { id },
        data,
      });
      return transaction !== null;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to update transaction');
    }
  }

  async delete(id: number): Promise<boolean> {
    this.logger.debug(`Deleting transaction by ID: ${id}`);

    try {
      const transaction = await this.prisma.transaction.delete({
        where: { id },
      });
      return transaction !== null;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to delete transaction');
    }
  }
}
