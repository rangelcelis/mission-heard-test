import { Test, TestingModule } from '@nestjs/testing';
import { Prisma, PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { transactionsMock as transactions } from '../../../test/mock/transactions';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionRepository } from './transaction.repository';

const transaction = {
  id: 1,
  title: 'transaction_test_title',
  description: 'Transaction Test',
  amount: 54321,
  fromAccount: 'account_1',
  toAccount: 'account_2',
  transactionDate: new Date('2023-01-01'),
};

describe('TransactionRepository', () => {
  let prisma: DeepMockProxy<PrismaClient>;
  let repository: TransactionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionRepository, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaService>())
      .compile();

    module.useLogger(false);

    prisma = module.get(PrismaService);
    repository = module.get<TransactionRepository>(TransactionRepository);
  });

  it('should create a new transaction and return the ID', async () => {
    prisma.transaction.create.mockResolvedValue(transaction);

    const data: Prisma.TransactionCreateInput = {
      ...transaction,
    };

    const result = await repository.create(data);
    expect(result).toBe(1);
  });

  it('should throw an error when Prisma fails creating a new transaction', async () => {
    prisma.transaction.create.mockRejectedValue(
      new Error('Error creating a new transaction - TESTING'),
    );

    const data: Prisma.TransactionCreateInput = {
      ...transaction,
    };

    const result = repository.create(data);
    await expect(result).rejects.toBeInstanceOf(Error);
  });

  it('should get a transaction by ID', async () => {
    prisma.transaction.findUnique.mockResolvedValue(transaction);

    const result = await repository.getById(transaction.id);
    expect(result).toStrictEqual(transaction);
  });

  it('should throw an error when getting a transaction by ID that does not exist', async () => {
    prisma.transaction.findUnique.mockResolvedValue(null);

    const result = await repository.getById(123);
    expect(result).toBeNull();
  });

  it('should throw an error when Prisma fails getting the transaction by ID', async () => {
    prisma.transaction.findUnique.mockRejectedValue(
      new Error('Error getting transaction by ID - TESTING'),
    );

    const result = repository.getById(transaction.id);
    await expect(result).rejects.toBeInstanceOf(Error);
  });

  it('should get all transactions', async () => {
    prisma.transaction.findMany.mockResolvedValue(transactions);

    const result = await repository.findAll();
    expect(result).toStrictEqual(transactions);
  });

  it('should throw an error when Prisma fails getting all transactions', async () => {
    prisma.transaction.findMany.mockRejectedValue(
      new Error('Error getting all transactions - TESTING'),
    );

    const result = repository.findAll();
    await expect(result).rejects.toBeInstanceOf(Error);
  });

  it('should update a transaction and return the ID', async () => {
    prisma.transaction.update.mockResolvedValue(transaction);

    const data: Prisma.TransactionUpdateInput = {
      title: 'Updated Title',
    };

    const result = await repository.updateOne(transaction.id, data);
    expect(result).toBe(1);
  });

  it('should throw an error when Prisma fails updating a transaction', async () => {
    prisma.transaction.update.mockRejectedValue(
      new Error('Error updating transaction - TESTING'),
    );

    const data: Prisma.TransactionUpdateInput = {
      title: 'Updated Title',
    };

    const result = repository.updateOne(transaction.id, data);
    await expect(result).rejects.toBeInstanceOf(Error);
  });

  it('should delete a transaction and return the ID', async () => {
    prisma.transaction.delete.mockResolvedValue(transaction);

    const result = await repository.deleteOne(transaction.id);
    expect(result).toBe(1);
  });

  it('should throw an error when Prisma fails deleting a transaction', async () => {
    prisma.transaction.delete.mockRejectedValue(
      new Error('Error deleting transaction - TESTING'),
    );

    const result = repository.deleteOne(transaction.id);
    await expect(result).rejects.toBeInstanceOf(Error);
  });
});
