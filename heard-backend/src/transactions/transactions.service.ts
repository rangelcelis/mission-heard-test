import { Injectable } from '@nestjs/common';
import { TransactionRepository } from 'src/db/repositories/transaction.repository';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { UpdateTransactionDTO } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private readonly transactionRepository: TransactionRepository) {}
  async create(payload: CreateTransactionDTO) {
    return await this.transactionRepository.create(payload);
  }

  async findAll() {
    return await this.transactionRepository.findAll();
  }

  async findOne(id: number) {
    return await this.transactionRepository.getById(id);
  }

  async update(id: number, payload: UpdateTransactionDTO) {
    return await this.transactionRepository.update(id, payload);
  }

  async remove(id: number) {
    return await this.transactionRepository.delete(id);
  }
}
