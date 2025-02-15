import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/db/prisma/prisma.service';
import * as request from 'supertest';
import { transactionsHttp, transactionsPrisma } from './mocks/transactions';

describe('Transactions (e2e)', () => {
  let app: INestApplication;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaService>())
      .compile();

    app = module.createNestApplication();
    await app.init();

    prisma = module.get(PrismaService);
  });

  it('/transactions (GET)', async () => {
    prisma.transaction.findMany.mockResolvedValue(transactionsPrisma);

    const response = await request(app.getHttpServer()).get('/transactions');
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      transactions: transactionsHttp,
    });
  });

  it('/transactions/:id (GET)', async () => {
    prisma.transaction.findUnique.mockResolvedValue(transactionsPrisma[0]);

    const response = await request(app.getHttpServer()).get(
      `/transactions/${transactionsPrisma[0].id}`,
    );
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({ transaction: transactionsHttp[0] });
  });

  it('/transactions (POST)', async () => {
    prisma.transaction.create.mockResolvedValue(transactionsPrisma[0]);

    const response = await request(app.getHttpServer())
      .post('/transactions')
      .send({
        ...transactionsHttp[0],
      });
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(201);
    expect(response.body).toStrictEqual({ id: transactionsHttp[0].id });
  });

  it('/transactions/:id (PATCH)', async () => {
    prisma.transaction.update.mockResolvedValue(transactionsPrisma[0]);

    const response = await request(app.getHttpServer())
      .patch(`/transactions/${transactionsHttp[0].id}`)
      .send({ title: 'Updated title' });
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      id: transactionsHttp[0].id,
      updated: true,
    });
  });

  it('/transactions/:id (DELETE)', async () => {
    prisma.transaction.delete.mockResolvedValue(transactionsPrisma[0]);

    const response = await request(app.getHttpServer()).delete(
      `/transactions/${transactionsHttp[0].id}`,
    );
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({
      id: transactionsHttp[0].id,
      removed: true,
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
