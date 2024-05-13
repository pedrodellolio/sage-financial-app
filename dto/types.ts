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
  type: Type;
  createdAt: Date;
  occurredAt: Date;
  labels: Label[];
}

export enum Type {
  EXPENSE = "EXPENSE",
  INCOME = "INCOME",
}

export interface Label {
  id: string;
  profileId: string;
  title: string;
  colorHex: string;
  isActive: boolean;
  createdAt: Date;
}
