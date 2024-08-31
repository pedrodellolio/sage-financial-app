import { BudgetGoalType } from "@prisma/client";

export interface AddLabelDTO {
  title: string;
  colorHex: string;
}
// export interface Profile {
//   id: string;
//   userId: string;
//   title: string;
//   isActive: boolean;
//   createdAt: Date;
//   selectedProfile?: Profile;
// }

// export interface Wallet {
//   id: string;
//   profileId: string;
//   month: number;
//   year: number;
//   expensesBrl: number;
//   incomeBrl: number;
//   // balanceBrl: number;
// }

// export interface Transaction {
//   id: string;
//   walletId: string;
//   title: string;
//   valueBrl: number;
//   type: TransactionType;
//   createdAt: Date;
//   occurredAt: Date;
//   labels: Label[];
// }

// export interface Label {
//   id: string;
//   profileId: string;
//   title: string;
//   colorHex: string;
//   isActive: boolean;
//   createdAt: Date;
// }

// export enum TransactionType {
//   EXPENSE = "EXPENSE",
//   INCOME = "INCOME",
// }

// export interface Budget {
//   id: string;
//   profileId: string;
//   month: number;
//   year: number;
// }

// export interface BudgetGoal {
//   id: string;
//   label: Label;
//   budget: Budget;
//   value: number;
//   type: BudgetGoalType;
// }

// export enum ChartType {}

// export interface UploadedFile {
//   name: string;
//   size: number;
//   data: any[];
//   fields: string[];
//   mapping: Mapping[];
//   errors: string[];
// }

// export interface MappedTransaction {
//   fileId: string;
//   title: string;
//   valueBrl: string;
//   occurredAt: string;
// }
// export interface Mapping {
//   key: keyof MappedTransaction;
//   value: string;
// }

// export interface File {
//   id: string;
//   profileId: string;
//   name: string;
//   uploadedAt: Date;
// }
