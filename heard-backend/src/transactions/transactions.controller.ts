import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { UpdateTransactionDTO } from './dto/update-transaction.dto';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() body: CreateTransactionDTO) {
    const id = await this.transactionsService.create(body);
    return { id };
  }

  @Get()
  async findAll() {
    const transactions = await this.transactionsService.findAll();
    return { transactions };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const transaction = await this.transactionsService.findOne(id);

    if (!transaction) {
      throw new NotFoundException(`Transaction with id ${id} not found.`);
    }

    return { transaction };
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: UpdateTransactionDTO) {
    const idUpdated = await this.transactionsService.update(id, body);
    return { id: idUpdated, updated: true };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const idRemoved = await this.transactionsService.remove(id);
    return { id: idRemoved, removed: true };
  }
}
