import { getTransaction } from '@/app/actions';
import TransactionForm from '../../../ui/transaction-form';

export default async function Edit({ params }: { params: Promise<{ id: number }> }) {
  const id = (await params).id;
  const transaction = await getTransaction(id);

  return (
    <section className="grid w-full h-full gap-8">
      <h1 className="text-4xl text-center">Transaction #{id}</h1>

      <TransactionForm transaction={transaction} />
    </section>
  );
}
