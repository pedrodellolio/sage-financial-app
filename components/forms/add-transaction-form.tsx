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
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, Check, ChevronsUpDown, Plus, Text } from "lucide-react";
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
import { AdornedInput } from "../adorned-input";
import { PopoverClose } from "@radix-ui/react-popover";
import { Label, TransactionType } from "@prisma/client";
import { toast } from "sonner";

interface Props {
  labels: Label[];
  dialog: boolean;
}

export default function AddTransactionForm(
  props: React.ComponentProps<"form"> & Props
) {
  const router = useRouter();

  const form = useForm<AddTransactionFormData>({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: {
      title: "",
      type: TransactionType.EXPENSE,
    },
  });

  async function addTransaction(data: AddTransactionFormData) {
    try {
      await createTransaction(data);
      form.reset();
      router.push(`/transactions`);
      toast.success("Criado com sucesso!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Ocorreu um erro inesperado!";
      toast.error(errorMessage);
    }
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(addTransaction)}
          className={cn(
            "flex flex-row items-center gap-2 my-4 w-full",
            props.className
          )}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <AdornedInput
                    className="text-xs h-8 focus-visible:ring-offset-0 focus-visible:ring-transparent"
                    autoComplete="off"
                    adornment={<Text className="h-4 w-4" />}
                    placeholder="Título"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-row items-center w-full gap-2">
            <FormField
              control={form.control}
              name="labels"
              render={({ field }) => (
                <FormItem className="w-full max-w-[300px]">
                  {/* <FormLabel>Label</FormLabel> */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        size={"sm"}
                        className={cn(
                          "justify-between w-full",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          <Badge variant="outline">
                            {field.value?.[0].title}
                          </Badge>
                        ) : (
                          "Categoria"
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

            <FormField
              control={form.control}
              name="occurredAt"
              render={({ field }) => (
                <FormItem className="w-full max-w-[300px]">
                  {/* <FormLabel>Data</FormLabel> */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          size={"sm"}
                          className={cn(
                            "pl-3 w-full text-left font-normal flex justify-start",
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

            <FormField
              control={form.control}
              name="valueBrl"
              render={({ field: { value, onChange } }) => (
                <FormItem className="w-full max-w-[200px]">
                  {/* <FormLabel>Valor</FormLabel> */}
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
                      className="text-xs h-8 focus-visible:ring-offset-0 focus-visible:ring-transparent"
                      adornment={<p className="font-medium">R$</p>}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant={"secondary"} size={"sm"}>
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
