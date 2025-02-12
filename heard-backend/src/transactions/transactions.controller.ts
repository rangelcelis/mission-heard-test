import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
    return await this.transactionsService.create(body);
  }

  @Get()
  async findAll() {
    return await this.transactionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.transactionsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: UpdateTransactionDTO) {
    return await this.transactionsService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.transactionsService.remove(id);
  }
}
