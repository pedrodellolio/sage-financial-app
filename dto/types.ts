import { AddTransactionDTO } from "@/app/actions/transactions";

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
  EXPENSE = "EXPENSE",
  INCOME = "INCOME",
}

export enum BudgetType {
  PERCENTAGE = "PERCENTAGE",
  CURRENCY = "CURRENCY",
}

export interface Budget {
  id: string;
  profileId: string;
  value: number;
  type: BudgetType;
}

export enum ChartType {}

export interface UploadedFile {
  name: string;
  size: number;
  data: any[];
  fields: string[];
  mapping: Mapping[];
  errors: string[];
}

export interface MappedTransaction {
  fileId: string;
  title: string;
  valueBrl: string;
  occurredAt: string;
}
export interface Mapping {
  key: keyof MappedTransaction;
  value: string;
}

export interface File {
  id: string;
  profileId: string;
  name: string;
  uploadedAt: Date;
}
