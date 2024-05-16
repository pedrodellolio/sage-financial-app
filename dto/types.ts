export interface Profile {
  id: string;
  userId: string;
  title: string;
  isActive: boolean;
  createdAt: Date;
  selectedProfile?: Profile;
}

export interface Wallet {
  id: string;
  profileId: string;
  month: number;
  year: number;
  expensesBrl: number;
  incomeBrl: number;
  // balanceBrl: number;
}

export interface Transaction {
  id: string;
  walletId: string;
  title: string;
  valueBrl: number;
  type: TransactionType;
  createdAt: Date;
  occurredAt: Date;
  labels: Label[];
}

export interface Label {
  id: string;
  profileId: string;
  title: string;
  colorHex: string;
  isActive: boolean;
  createdAt: Date;
}

export enum TransactionType {
  EXPENSE,
  INCOME,
}

export enum ChartType {}
