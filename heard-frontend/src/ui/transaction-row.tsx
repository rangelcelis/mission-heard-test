'use client';

import { remove } from '@/app/actions';
import { Transaction } from '@/types/transaction.type';
import { useRouter } from 'next/navigation';

type TransactionRowProps = {
  transaction: Transaction;
};

const TransactionRow = ({ transaction }: TransactionRowProps) => {
  const router = useRouter();

  const handleEditClick = (id: number) => {
    router.push(`/transaction/${id}`);
  };

  const handleRemoveClick = async (id: number) => {
    await remove(id);
  };

  return (
    <tr>
      <td>{transaction.title}</td>
      <td>{transaction.description}</td>
      <td>{transaction.amount}</td>
      <td>{transaction.fromAccount}</td>
      <td>{transaction.toAccount}</td>
      <td className="flex gap-2 p-2">
        <button className="border px-8 py-2" onClick={() => handleEditClick(transaction.id!)}>
          Edit
        </button>
        <button className="border px-8 py-2" onClick={() => handleRemoveClick(transaction.id!)}>
          Remove
        </button>
      </td>
    </tr>
  );
};

export default TransactionRow;
