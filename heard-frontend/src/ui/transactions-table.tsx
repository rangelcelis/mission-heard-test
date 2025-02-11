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
        {transactions.map((transaction: any) => (
          <TransactionRow key={transaction.id} transaction={transaction} />
        ))}
      </tbody>
    </table>
  );
};

export default TransactionsTable;
