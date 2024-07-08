"use client";

import { capitalizeText, cn, formatToBRLCurrency } from "@/lib/utils";
import { Button } from "../ui/button";
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
import { BudgetType, Label } from "@/dto/types";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
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
import { Slider } from "@/components/ui/slider";
import { useSession } from "next-auth/react";
import { PopoverClose } from "@radix-ui/react-popover";
import {
  AddBudgetFormData,
  addBudgetSchema,
} from "@/schemas/add-budget-schema";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { AdornedInput } from "../adorned-input";

interface Props {
  labels: Label[];
}

export default function AddTransactionForm(
  props: React.ComponentProps<"form"> & Props
) {
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<AddBudgetFormData>({
    resolver: zodResolver(addBudgetSchema),
    defaultValues: {
      value: 0,
      type: BudgetType.PERCENTAGE,
    },
  });

  const [selectedTab, setSelectedTab] = useState<BudgetType>(
    BudgetType.PERCENTAGE
  );

  async function addBudget(data: AddBudgetFormData) {
    const profileId = session?.user.selectedProfile?.id;
    if (profileId) {
      // await createBudget(profileId, data);
      router.push(`/budget`);
    }
  }

  const onTabChange = (value: string) => {
    const newTab =
      value === "PERCENTAGE" ? BudgetType.PERCENTAGE : BudgetType.CURRENCY;
    setSelectedTab(newTab);
    form.setValue("type", newTab);
    form.setValue("value", 0);
  };

  return (
    <>
      <Tabs value={selectedTab} onValueChange={onTabChange}>
        <TabsList className="grid w-full grid-cols-2 mt-4">
          <TabsTrigger value={BudgetType.PERCENTAGE}>Porcentagem</TabsTrigger>
          <TabsTrigger value={BudgetType.CURRENCY}>Fixo</TabsTrigger>
        </TabsList>
      </Tabs>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(addBudget)}
          className={cn("grid items-start gap-5", props.className)}
        >
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
          <FormField
            control={form.control}
            name="value"
            render={({ field: { value, onChange } }) => {
              const type = form.getValues().type;
              return (
                <FormItem className="w-full">
                  <FormLabel className="flex justify-between">
                    <p>Valor</p>
                    {type === BudgetType.PERCENTAGE && <p>{value}%</p>}
                  </FormLabel>
                  <FormControl>
                    {type === BudgetType.PERCENTAGE ? (
                      <Slider
                        className="h-10"
                        onChange={onChange}
                        defaultValue={[value]}
                        max={100}
                        step={1}
                      />
                    ) : (
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
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit">Adicionar</Button>
          <small className="text-sm text-muted-foreground">O orçamento será criado para este e todos os meses subsequentes.</small>
        </form>
      </Form>
    </>
  );
}
