import { PrismaClient } from '@prisma/client';
import { transactions } from './data';

const prisma = new PrismaClient();

async function main() {
  await prisma.transaction.createMany({
    data: [...transactions],
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
