import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { TransactionRepository } from '../../src/db/repositories/transaction.repository';
import { transactionsMock } from '../../test/mock/transactions';
import { TransactionsService } from './transactions.service';

describe('TransactionsService', () => {
  let repository: DeepMockProxy<TransactionRepository>;
  let service: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsService, TransactionRepository],
    })
      .overrideProvider(TransactionRepository)
      .useValue(mockDeep<TransactionRepository>())
      .compile();

    repository = module.get(TransactionRepository);
    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create', async () => {
    const transaction = transactionsMock[0];
    repository.create.mockResolvedValue(1);

    const result = await service.create(transaction);
    expect(result).toStrictEqual(transaction.id);
  });

  it('findAll', async () => {
    repository.findAll.mockResolvedValue(transactionsMock);

    const result = await service.findAll();
    expect(result).toStrictEqual(transactionsMock);
    expect(result).toHaveLength(5);
  });

  it('findOne', async () => {
    const transaction = transactionsMock[0];
    repository.getById.mockResolvedValue(transaction);

    const result = await service.findOne(transaction.id);
    expect(result).toStrictEqual(transaction);
  });

  it('update', async () => {
    const transaction = transactionsMock[1];
    repository.updateOne.mockResolvedValue(transaction.id);

    const result = await service.update(transaction.id, { title: 'New title' });
    expect(result).toStrictEqual(transaction.id);
  });

  it('remove', async () => {
    const transaction = transactionsMock[2];
    repository.deleteOne.mockResolvedValue(3);

    const result = await service.remove(transaction.id);
    expect(result).toStrictEqual(transaction.id);
  });
});
