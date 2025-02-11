import TransactionsTable from '@/ui/transactions-table';
import Link from 'next/link';
import { findAll } from './actions';

export default async function Home() {
  const transactions = await findAll();

  return (
    <main className="grid w-full h-full gap-8">
      <h1 className="text-4xl text-center">Transactions List</h1>
      <Link href="/transaction/create">+ Add</Link>

      <TransactionsTable transactions={transactions} />
    </main>
  );
}
