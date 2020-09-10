import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Statament {
  transactions: Transaction[];
  balance: Balance;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance = {
    income: 0,
    outcome: 0,
    total: 0,
  };

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public allStatement(): Statament {
    const statement = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };

    return statement;
  }

  private updateBalance(transcation: Transaction): Balance {
    if (transcation.type === 'income') {
      this.balance.income += transcation.value;
      this.balance.total += transcation.value;
      return this.balance;
    }

    this.balance.outcome += transcation.value;
    this.balance.total -= transcation.value;

    return this.balance;
  }

  public getBalance(): Balance {
    return this.balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    this.updateBalance(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
