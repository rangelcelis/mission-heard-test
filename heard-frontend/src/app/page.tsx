import TransactionsTable from '@/ui/transactions-table';
import Link from 'next/link';
import { findAll } from './actions';

export default async function Home() {
  const transactions = await findAll();

  return (
    <main className="grid min-h-full gap-8">
      <h1 className="text-5xl font-bold text-center">Transactions List</h1>
      <div className="flex justify-end">
        <Link
          href="/transaction/create"
          className="rounded-md w-fit px-8 py-2  bg-gray-500 text-white"
        >
          + Add
        </Link>
      </div>

      <TransactionsTable transactions={transactions} />
    </main>
  );
}
