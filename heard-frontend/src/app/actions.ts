'use server';

import { FormState } from '@/types/form-state.type';
import { Transaction } from '@/types/transaction.type';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const FormSchema = z.object({
  title: z
    .string({
      invalid_type_error: 'Invalid title',
    })
    .nonempty('Please enter a title.'),
  description: z
    .string({
      invalid_type_error: 'Invalid description',
    })
    .nonempty('Please enter a description'),
  amount: z.coerce.number().gt(0, 'Amount must be greater than zero ($0)'),
  fromAccount: z
    .string({
      invalid_type_error: 'Invalid fromAccount',
    })
    .nonempty('Please enter a fromAccount'),
  toAccount: z
    .string({
      invalid_type_error: 'Invalid toAccount',
    })
    .nonempty('Please enter a toAccount'),
});

export async function findAll(): Promise<Transaction[]> {
  const data = await fetch(`${process.env.URL_API}/transactions`);
  const { transactions } = await data.json();

  return transactions || [];
}

export async function getTransaction(id: number): Promise<Transaction> {
  const data = await fetch(`${process.env.URL_API}/transactions/${id}`);
  const { transaction } = await data.json();

  if (transaction) {
    return transaction;
  }

  redirect('/');
}

export async function create(prevState: FormState, formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const validatedFields = FormSchema.safeParse({
    ...values,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to Create Transaction.',
    };
  }

  try {
    const data = await fetch(`${process.env.URL_API}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedFields.data),
    });
    const { id } = await data.json();

    if (!id) {
      throw new Error('Invalid Transaction');
    }
  } catch (error) {
    console.error(error);
    return {
      message: 'Failed to Create Transaction.',
    };
  }

  revalidatePath('/');
  redirect('/');
}

export async function update(id: number, prevState: FormState, formData: FormData) {
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
    const data = await fetch(`${process.env.URL_API}/transactions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedFields.data),
    });
    const response = await data.json();

    if (!response.id) {
      throw new Error('Failed to Update Transaction');
    }
  } catch (error) {
    console.error(error);
    return {
      message: 'Failed to Update Transaction.',
    };
  }

  revalidatePath('/');
  redirect('/');
}

export async function remove(id: number) {
  try {
    const data = await fetch(`${process.env.URL_API}/transactions/${id}`, {
      method: 'DELETE',
    });
    const response = await data.json();

    if (!response.id) {
      throw new Error('Failed to Remove Transaction');
    }
  } catch (error) {
    console.error(error);
    return {
      message: 'Failed to Remove Transaction.',
    };
  }

  revalidatePath('/');
}
