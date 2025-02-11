import TransactionForm from '../../../ui/transaction-form';

export default async function Create() {
  return (
    <section className="grid w-full h-full gap-8">
      <h1 className="text-4xl text-center">New Transaction</h1>

      <TransactionForm />
    </section>
  );
}
