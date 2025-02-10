import { PrismaClient } from '@prisma/client';
import { transactions } from './data';

const prisma = new PrismaClient();

async function main() {
  transactions.forEach(async (transaction: any) => {
    await prisma.transaction.create({
      data: {
        ...transaction,
        transactionDate: new Date(transaction.transactionDate),
      },
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error running seed', e);
    await prisma.$disconnect();
    process.exit(1);
  });
