import { Metadata } from "next";
import { columns } from "./_components/columns";
import { TransactionsDataTable } from "./_components/data-table";
import { Suspense } from "react";
import { useOptions } from "@/hooks/use-options";
import { getTransactions } from "@/app/actions/transactions";
import { getLabels } from "@/app/actions/labels";

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
  // const [transactions, labels] = await Promise.all([
  //   getTransactions(profileTitle),
  //   getLabels(profileTitle),
  // ]);
  const transactions = await getTransactions(profileTitle);
  const labels = await getLabels(profileTitle);
  console.log(transactions);
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
    </div>
  );
}
