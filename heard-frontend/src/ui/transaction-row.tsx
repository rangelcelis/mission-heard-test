'use client';

import { remove } from '@/app/actions';
import { Transaction } from '@/types/transaction.type';
import { formatAmount } from '@/utils/format-amount';
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
    <tr className="border">
      <td>{transaction.title}</td>
      <td>{transaction.description}</td>
      <td className="flex justify-end">{formatAmount(transaction.amount)}</td>
      <td>{transaction.fromAccount}</td>
      <td>{transaction.toAccount}</td>
      <td className="flex gap-2 p-2 justify-center">
        <button
          className="px-8 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          onClick={() => handleEditClick(transaction.id!)}
        >
          Edit
        </button>
        <button
          className="px-8 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
          onClick={() => handleRemoveClick(transaction.id!)}
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

export default TransactionRow;
