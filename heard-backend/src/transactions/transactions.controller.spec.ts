import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { transactionsPrisma } from '../../test/mocks/transactions';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { UpdateTransactionDTO } from './dto/update-transaction.dto';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

const oneTransactionMock = transactionsPrisma[0];

describe('TransactionsController', () => {
  let controller: TransactionsController;
  let service: DeepMockProxy<TransactionsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [TransactionsService],
    })
      .overrideProvider(TransactionsService)
      .useValue(mockDeep<TransactionsService>())
      .compile();

    service = module.get(TransactionsService);
    controller = module.get<TransactionsController>(TransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new Transaction', async () => {
    service.create.mockResolvedValue(1);

    const transactionDTO: CreateTransactionDTO = oneTransactionMock;
    const result = await controller.create(transactionDTO);

    expect(result).toStrictEqual({ id: 1 });
  });

  it('should get all Transactions', async () => {
    service.findAll.mockResolvedValue(transactionsPrisma);

    const result = await controller.findAll();
    expect(result).toStrictEqual({ transactions: transactionsPrisma });
  });

  it('should get a single Transaction', async () => {
    service.findOne.mockResolvedValue(oneTransactionMock);

    const result = await controller.findOne(oneTransactionMock.id);
    expect(result).toStrictEqual({ transaction: oneTransactionMock });
  });

  it('should throw an error when Transaction is not found', async () => {
    service.findOne.mockResolvedValue(null);

    const result = controller.findOne(123);
    await expect(result).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should update a Transaction', async () => {
    service.update.mockResolvedValue(oneTransactionMock.id);

    const transactionDTO: UpdateTransactionDTO = oneTransactionMock;
    const result = await controller.update(
      oneTransactionMock.id,
      transactionDTO,
    );
    expect(result).toStrictEqual({ id: 1, updated: true });
  });

  it('should throw an error when updating a Transaction', async () => {
    service.update.mockRejectedValue(new Error('Failed to update'));

    const transactionDTO: UpdateTransactionDTO = { title: 'Change title' };
    const result = controller.update(123, transactionDTO);
    await expect(result).rejects.toBeInstanceOf(Error);
  });

  it('should delete a Transaction', async () => {
    service.remove.mockResolvedValue(oneTransactionMock.id);

    const result = await controller.remove(oneTransactionMock.id);
    expect(result).toStrictEqual({ id: 1, removed: true });
  });
});
