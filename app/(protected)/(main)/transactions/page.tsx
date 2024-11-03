import { Metadata } from "next";
import {
  getTransactions,
  getTransactionsUniqueDate,
} from "@/app/actions/transactions";
import { getLabels } from "@/app/actions/labels";
import { columns } from "@/components/transactions/data-table/columns";
import { capitalizeText, getCurrentPeriod, parseNumber } from "@/lib/utils";
import { startOfMonth, endOfMonth } from "date-fns";
import { MONTHS } from "@/lib/date-utils";
import {
  FilterComboBox,
  ItemsList,
  MonthsList,
} from "@/components/combo-box/filter-combo-box";
import { DataTable } from "@/components/data-table/data-table";
import LabelFilterComboBox from "@/components/combo-box/label-filter-combo-box";
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
  const [currMonth, currYear] = getCurrentPeriod();
  const filteredYear =
    parseNumber(searchParams["year"]?.toString()) ?? currYear;
  const filteredMonth =
    parseNumber(searchParams["month"]?.toString()) ?? currMonth;
  const filteredLabelsTitle = searchParams["labels"]?.toString();
  const currDate = new Date(filteredYear, filteredMonth - 1, 1);
  const startDate = startOfMonth(currDate);
  const endDate = endOfMonth(currDate);

  const { years } = await getTransactionsUniqueDate();
  const transactions = await getTransactions(
    startDate,
    endDate,
    filteredLabelsTitle?.split(",")
  );
  const labels = await getLabels();

  return (
    <div>
      <DataTable
        columns={columns}
        labels={labels}
        data={transactions}
        headerContent={
          <>
            <FilterComboBox
              width={130}
              placeholder="Mês"
              data={MONTHS.map((m) => capitalizeText(m))}
              queryKey="month"
              selected={capitalizeText(MONTHS[filteredMonth - 1])}
              ItemsListComponent={MonthsList}
            />
            <FilterComboBox
              width={120}
              placeholder="Ano"
              data={years.sort()}
              queryKey="year"
              selected={filteredYear.toString()}
              ItemsListComponent={ItemsList}
            />
            <LabelFilterComboBox
              data={labels}
              selected={labels.find(
                (l) => l.title === filteredLabelsTitle?.split(",")[0]
              )}
              queryKey="labels"
            />
          </>
        }
        showFilterRow
        showPagination
      />
      <ImportFilesDialog />
    </div>
  );
}
