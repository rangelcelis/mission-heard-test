'use server';

import { Transaction } from '@/types/transaction.type';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const FormSchema = z.object({
  title: z.string(),
  description: z.string(),
  amount: z.coerce.number().gt(0, { message: 'Enter an amount greater than $0.' }),
  fromAccount: z.string(),
  toAccount: z.string(),
});

export type State = {
  errors?: {
    title?: string[];
    description?: string[];
    amount?: string[];
    fromAccount?: string[];
    toAccount?: string[];
  };
  message?: string | null;
};

export async function findAll(): Promise<Transaction[]> {
  const data = await fetch(`${process.env.URL_API}/transactions`);
  return await data.json();
}

export async function getTransaction(id: number): Promise<Transaction> {
  const data = await fetch(`${process.env.URL_API}/transactions/${id}`);
  return await data.json();
}

export async function create(prevState: State, formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const validatedFields = FormSchema.safeParse({
    ...values,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Transaction.',
    };
  }

  try {
    await fetch(`${process.env.URL_API}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedFields.data),
    });
  } catch (error) {
    console.error(error);
    return {
      message: 'Failed to Create Transaction.',
    };
  }

  redirect('/');
}

export async function update(id: number, prevState: State, formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const validatedFields = FormSchema.safeParse({
    ...values,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Transaction.',
    };
  }

  try {
    await fetch(`${process.env.URL_API}/transactions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedFields.data),
    });
  } catch (error) {
    console.error(error);
    return {
      message: 'Failed to Update Transaction.',
    };
  }

  redirect('/');
}

export async function remove(id: number) {
  await fetch(`${process.env.URL_API}/transactions/${id}`, {
    method: 'DELETE',
  });

  revalidatePath('/');
}
