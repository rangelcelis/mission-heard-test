'use server';

export type FormState = {
  errors?: {
    title?: string[];
    description?: string[];
    amount?: string[];
    fromAccount?: string[];
    toAccount?: string[];
  };
  message?: string | null;
};
