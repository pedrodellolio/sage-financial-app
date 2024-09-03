import { Metadata } from "next";
import { getTransactions } from "@/app/actions/transactions";
import AddTransactionDialog from "@/components/dialogs/add-transaction-dialog";
import { getLabels } from "@/app/actions/labels";
import { endOfMonth, startOfMonth } from "date-fns";
import { TransactionsDataTable } from "@/components/transactions/data-table/data-table";

export const metadata: Metadata = {
  title: "Movimentações",
  description: "",
};

export default async function Transactions({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const isAddTransactionDialogOpen = !!searchParams["t"];
  const isImportFilesDialogOpen = !!searchParams["i"];

  const today = new Date();
  const labels = await getLabels();
  const transactions = await getTransactions(
    startOfMonth(today),
    endOfMonth(today)
  );

  return (
    <div>
      <TransactionsDataTable data={transactions} />
      <AddTransactionDialog labels={labels} open={isAddTransactionDialogOpen} />
      {/* <ImportFilesDialog open={isImportFilesDialogOpen} /> */}
    </div>
  );
}
