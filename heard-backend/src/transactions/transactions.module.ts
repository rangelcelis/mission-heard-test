import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/db/prisma/prisma.module';
import { TransactionRepository } from 'src/db/repositories/transaction.repository';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [PrismaModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionRepository],
})
export class TransactionsModule {}
