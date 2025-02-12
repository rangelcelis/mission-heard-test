import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TransactionRepository } from 'src/db/repositories/transaction.repository';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { UpdateTransactionDTO } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private readonly transactionRepository: TransactionRepository) {}
  async create(payload: CreateTransactionDTO) {
    try {
      const id = await this.transactionRepository.create(payload);
      return { id };
    } catch (error) {
      throw new InternalServerErrorException('Error creating transaction');
    }
  }

  async findAll() {
    try {
      const transactions = await this.transactionRepository.findAll();
      return { transactions };
    } catch (error) {
      throw new InternalServerErrorException('Error creating transaction');
    }
  }

  async findOne(id: number) {
    try {
      const transaction = await this.transactionRepository.getById(id);

      if (!transaction) {
        throw new NotFoundException(`Transaction not found with ID: ${id}`);
      }

      return { transaction };
    } catch (error) {
      throw new InternalServerErrorException('Error finding transaction');
    }
  }

  async update(id: number, payload: UpdateTransactionDTO) {
    try {
      const success = await this.transactionRepository.update(id, payload);
      return { success };
    } catch (error) {
      throw new InternalServerErrorException('Error updating transaction');
    }
  }

  async remove(id: number) {
    try {
      const success = await this.transactionRepository.delete(id);
      return { success };
    } catch (error) {
      throw new InternalServerErrorException('Error deleting transaction');
    }
  }
}
