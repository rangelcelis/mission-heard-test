'use client';

import { create, update } from '@/app/actions';
import { FormState } from '@/types/form-state.type';
import { Transaction } from '@/types/transaction.type';
import Link from 'next/link';
import { useActionState } from 'react';

type TransactionFormProps = {
  transaction?: Transaction;
};

const TransactionForm = ({ transaction }: TransactionFormProps) => {
  const initialState: FormState = { message: null, errors: {} };
  const action = transaction ? update.bind(null, transaction.id!) : create;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction}>
      <div className="mb-4">
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          placeholder="Enter title"
          name="title"
          defaultValue={transaction?.title}
        />
        {state.errors?.title &&
          state.errors.title.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Description</label>
        <textarea
          rows={3}
          placeholder="Enter description"
          name="description"
          defaultValue={transaction?.description}
        ></textarea>
        {state.errors?.description &&
          state.errors.description.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Amount</label>
        <input
          type="number"
          placeholder="Enter amount"
          name="amount"
          defaultValue={transaction?.amount}
        />
        {state.errors?.amount &&
          state.errors.amount.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">From Account</label>
        <input
          type="text"
          placeholder="Enter from account"
          name="fromAccount"
          defaultValue={transaction?.fromAccount}
        />
        {state.errors?.fromAccount &&
          state.errors.fromAccount.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">To Account</label>
        <input
          type="text"
          placeholder="Enter to account"
          name="toAccount"
          defaultValue={transaction?.toAccount}
        />
        {state.errors?.toAccount &&
          state.errors.toAccount.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      <div className="flex mt-8 items-center justify-end gap-2">
        <Link className="px-8 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400" href="/">
          Close
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="px-8 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          {transaction ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
