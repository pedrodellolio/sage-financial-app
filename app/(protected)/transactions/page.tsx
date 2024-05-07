import { Metadata } from "next";
import { columns } from "./components/columns";
import { TransactionsDataTable } from "./components/data-table";
import { Suspense } from "react";
import { getTransactions } from "@/app/actions/transactions";
import { getLabels } from "@/app/actions/labels";
import AddTransactionDialog from "@/components/dialogs/add-transaction-dialog";

export const metadata: Metadata = {
  title: "Movimentações",
  description: "",
};

export default async function Transactions({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const profileTitle = searchParams["p"] as string | undefined;
  const isAddTransactionDialogOpen = !!searchParams["t"];

  const [transactions, labels] = await Promise.all([
    getTransactions(profileTitle),
    getLabels(profileTitle),
  ]);

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold tracking-tight mb-4">Movimentações</h2>
      <Suspense fallback={"Carregando..."}>
        <TransactionsDataTable
          data={transactions}
          columns={columns}
          labels={labels.map((l) => {
            return { id: l.id, title: l.title, hexColor: l.colorHex };
          })}
        />
      </Suspense>

      <AddTransactionDialog labels={labels} open={isAddTransactionDialogOpen} />
    </div>
  );
}
