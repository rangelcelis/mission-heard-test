import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransactionDTO {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @IsString()
  @IsNotEmpty()
  readonly fromAccount: string;

  @IsString()
  @IsNotEmpty()
  readonly toAccount: string;

  @IsString()
  @IsNotEmpty()
  readonly transactionDate: string;
}
