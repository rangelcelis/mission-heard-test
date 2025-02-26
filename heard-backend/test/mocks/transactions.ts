export const transactionsPrisma = [
  {
    id: 1,
    title: 'transaction_1',
    description: 'Transaction 1',
    amount: 86203,
    fromAccount: 'account_3',
    toAccount: 'account_6',
    transactionDate: new Date('2023-05-24'),
  },
  {
    id: 2,
    title: 'transaction_2',
    description: 'Transaction 2',
    amount: 71532,
    fromAccount: 'account_4',
    toAccount: 'account_6',
    transactionDate: new Date('2023-04-15'),
  },
  {
    id: 3,
    title: 'transaction_3',
    description: 'Transaction 3',
    amount: 44139,
    fromAccount: 'account_5',
    toAccount: 'account_6',
    transactionDate: new Date('2023-10-09'),
  },
  {
    id: 4,
    title: 'transaction_4',
    description: 'Transaction 4',
    amount: 24584,
    fromAccount: 'account_5',
    toAccount: 'account_6',
    transactionDate: new Date('2023-08-27'),
  },
  {
    id: 5,
    title: 'transaction_5',
    description: 'Transaction 5',
    amount: 62898,
    fromAccount: 'account_1',
    toAccount: 'account_5',
    transactionDate: new Date('2023-04-21'),
  },
];

export const transactionsHttp = transactionsPrisma.map((trx) => {
  return {
    ...trx,
    transactionDate: trx.transactionDate.toISOString(),
  };
});
