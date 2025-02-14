import { Module } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { TransactionRepository } from 'src/db/repositories/transaction.repository';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionRepository, PrismaService],
})
export class TransactionsModule {}
