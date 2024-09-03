"use client";

import {
  capitalizeText,
  cn,
  formatDate,
  formatToBRLCurrency,
} from "@/lib/utils";
import { Button } from "../ui/button";
import {
  AddTransactionFormData,
  addTransactionSchema,
} from "@/schemas/add-transaction-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, Check, ChevronsUpDown, Text } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { ptBR } from "date-fns/locale";
import { createTransaction } from "@/app/actions/transactions";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { AdornedInput } from "../adorned-input";
import { useSession } from "next-auth/react";
import { PopoverClose } from "@radix-ui/react-popover";
import { Label, TransactionType } from "@prisma/client";

interface Props {
  labels: Label[];
}

export default function AddTransactionForm(
  props: React.ComponentProps<"form"> & Props
) {
  const { data: session } = useSession();
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState<TransactionType>(TransactionType.EXPENSE);

  const form = useForm<AddTransactionFormData>({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: {
      title: "",
      type: TransactionType.EXPENSE,
    },
  });

  async function addTransaction(data: AddTransactionFormData) {
    const profileId = session?.user.selectedProfile?.id;
    if (profileId) {
      await createTransaction(profileId, data);
      router.push(`/transactions`);
    }
  }

  const onTabChange = (value: string) => {
    const newTab = value === "EXPENSE" ? TransactionType.EXPENSE : TransactionType.INCOME;
    setSelectedTab(newTab);
    form.setValue("type", newTab);
  };

  return (
    <>
      <Tabs value={selectedTab} onValueChange={onTabChange}>
        <TabsList className="grid w-full grid-cols-2 mt-4">
          <TabsTrigger value={TransactionType.EXPENSE}>Saída</TabsTrigger>
          <TabsTrigger value={TransactionType.INCOME}>Entrada</TabsTrigger>
        </TabsList>
      </Tabs>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(addTransaction)}
          className={cn("grid items-start gap-5", props.className)}
        >
          <FormField
            control={form.control}
            name="valueBrl"
            render={({ field: { value, onChange } }) => (
              <FormItem className="w-full">
                <FormLabel>Valor</FormLabel>
                <FormControl>
                  <AdornedInput
                    autoFocus
                    autoComplete="off"
                    value={value}
                    placeholder="0,00"
                    onChange={(e) => {
                      const value = e.currentTarget.value;
                      onChange(formatToBRLCurrency(value));
                    }}
                    adornment={<p className="font-medium">R$</p>}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <AdornedInput
                    autoComplete="off"
                    adornment={<Text className="h-5 w-5" />}
                    placeholder="Título"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-row items-start gap-2">
            <div className="flex flex-col gap-2 w-full">
              <FormField
                control={form.control}
                name="occurredAt"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal flex justify-start",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="h-4 w-4 opacity-50" />
                            <span className="ml-5">
                              {field.value
                                ? formatDate(field.value)
                                : "Selecione uma data"}
                            </span>
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          locale={ptBR}
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date: Date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row items-center gap-2">
                <Badge
                  variant={"secondary"}
                  className="cursor-pointer"
                  onClick={() => form.setValue("occurredAt", new Date())}
                >
                  Hoje
                </Badge>
                <Badge
                  variant={"secondary"}
                  className="cursor-pointer"
                  onClick={() => {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    form.setValue("occurredAt", yesterday);
                  }}
                >
                  Ontem
                </Badge>
              </div>
            </div>

            <FormField
              control={form.control}
              name="labels"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Label</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          <Badge variant="outline">
                            {field.value?.[0].title}
                          </Badge>
                        ) : (
                          "Selecione uma label"
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Label" />
                        <CommandList>
                          <CommandEmpty>Sem resultados.</CommandEmpty>
                          <CommandGroup>
                            {props.labels.map((label) => (
                              <PopoverClose
                                key={label.id}
                                className="flex flex-col w-full"
                              >
                                <CommandItem
                                  className="w-full"
                                  value={label.title}
                                  onSelect={() =>
                                    form.setValue("labels", [label])
                                  }
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value?.[0] === label
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {capitalizeText(label.title)}
                                </CommandItem>
                              </PopoverClose>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="mt-2">Adicionar</Button>
        </form>
      </Form>
    </>
  );
}
