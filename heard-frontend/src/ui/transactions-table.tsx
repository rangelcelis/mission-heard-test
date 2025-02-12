import { Transaction } from '@/types/transaction.type';
import TransactionRow from './transaction-row';

type TransactionsTableProps = {
  transactions: Transaction[];
};

const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  return (
    <table className="border">
      <thead>
        <tr className="border">
          <th>Title</th>
          <th>Description</th>
          <th>Amount</th>
          <th>From Account</th>
          <th>To Account</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {transactions.length === 0 ? (
          <tr>
            <td colSpan={6} className="text-center text-xl">
              No transactions found
            </td>
          </tr>
        ) : (
          transactions.map((transaction: any) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))
        )}
      </tbody>
    </table>
  );
};

export default TransactionsTable;
