import {
  Body,
  Controller,
  Delete,
  Get,
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
  create(@Body() body: CreateTransactionDTO) {
    return this.transactionsService.create(body);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.transactionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateTransactionDTO) {
    return this.transactionsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.transactionsService.remove(id);
  }
}
