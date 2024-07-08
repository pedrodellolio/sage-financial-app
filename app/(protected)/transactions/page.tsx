import { Metadata } from "next";
import { TransactionsDataTable } from "./components/data-table/data-table";
import { Suspense } from "react";
import { getTransactions } from "@/app/actions/transactions";
import { getLabels } from "@/app/actions/labels";
import AddTransactionDialog from "@/components/dialogs/add-transaction-dialog";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { Label, Transaction } from "@/dto/types";
import ImportFilesDialog from "@/components/dialogs/import-files-dialog";

export const metadata: Metadata = {
  title: "Movimentações",
  description: "",
};

export default async function Transactions({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);
  const profileId = session?.user.selectedProfile?.id;
  const isAddTransactionDialogOpen = !!searchParams["t"];
  const isImportFilesDialogOpen = !!searchParams["i"];

  let isLoading = false;
  let isError = false;
  let transactions: Transaction[] = [];
  let labels: Label[] = [];
  if (profileId) {
    try {
      isLoading = true;
      transactions = await getTransactions(profileId);
      labels = await getLabels(profileId);
    } catch (err) {
      isError = true;
    } finally {
      isLoading = false;
    }
  }

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold tracking-tight mb-4">Movimentações</h2>
      <TransactionsDataTable data={transactions} loading={isLoading} />

      <AddTransactionDialog labels={labels} open={isAddTransactionDialogOpen} />
      <ImportFilesDialog open={isImportFilesDialogOpen} />
    </div>
  );
}
