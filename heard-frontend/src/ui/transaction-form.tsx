'use client';

import { create, State, update } from '@/app/actions';
import { Transaction } from '@/types/transaction.type';
import Link from 'next/link';
import { useActionState } from 'react';

type TransactionFormProps = {
  transaction?: Transaction;
};

const TransactionForm = ({ transaction }: TransactionFormProps) => {
  const initialState: State = { message: null, errors: {} };
  const action = transaction ? update.bind(null, transaction.id!) : create;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="w-1/4">
      <div className="mb-4">
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          placeholder="Enter title"
          name="title"
          defaultValue={transaction?.title}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Description</label>
        <textarea
          rows={3}
          placeholder="Enter description"
          name="description"
          defaultValue={transaction?.description}
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Amount</label>
        <input
          type="number"
          placeholder="Enter amount"
          name="amount"
          defaultValue={transaction?.amount}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">From Account</label>
        <input
          type="text"
          placeholder="Enter from account"
          name="fromAccount"
          defaultValue={transaction?.fromAccount}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">To Account</label>
        <input
          type="text"
          placeholder="Enter to account"
          name="toAccount"
          defaultValue={transaction?.toAccount}
        />
      </div>

      <hr className="my-4" />
      <div className="flex items-center justify-end gap-2">
        <Link className="px-8 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400" href="/">
          Close
        </Link>
        <button
          className="px-8 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          type="submit"
          disabled={pending}
        >
          {transaction ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
