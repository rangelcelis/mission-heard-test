export type Transaction = {
  id?: number;
  title: string;
  description: string;
  amount: number;
  fromAccount: string;
  toAccount: string;
};
