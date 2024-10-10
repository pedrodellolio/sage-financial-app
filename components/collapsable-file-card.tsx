"use client";

import {
  ArrowRightLeft,
  ChevronsUpDown,
  FileSpreadsheet,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useEffect, useState } from "react";
import { formatBytes } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";
import { Combobox } from "./combobox";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FileMappingFormData,
  fileMappingSchema,
} from "@/schemas/file-mapping-schema";
import { useForm } from "react-hook-form";
import { Form, FormField } from "./ui/form";

interface Props {
  // file: UploadedFile;
  file: any;
  // handleMappingChange: (value: Mapping[]) => void;
  handleMappingChange: (value: any[]) => void;
}

export function CollapsibleFileCard({ file, handleMappingChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FileMappingFormData>({
    resolver: zodResolver(fileMappingSchema),
    defaultValues: {
      // mapping: columnsAlias.map((c) => {
      //   return {
      //     key: c as "title" | "occurredAt" | "valueBrl",
      //     value: "",
      //   };
      // }),
    },
  });

  useEffect(() => {
    handleMappingChange(form.getValues().mapping);
  }, [form.getValues().mapping]);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card>
        <CardContent className="py-4 px-4">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-4">
              <FileSpreadsheet className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium truncate w-[500px]">
                  {file.name}
                </p>
                <p className="text-muted-foreground text-sm">
                  {formatBytes(file.size)}
                </p>
              </div>
            </div>
            <div>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
                // onClick={() => handleRemoveFile(i)}
              >
                <span className="sr-only">Excluir arquivo</span>
                <X className="h-4 w-4" />
              </Button>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                  <ChevronsUpDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>
          <CollapsibleContent className="border rounded-md mt-6 px-4 py-4">
            <div className="flex flex-row items-center justify-between px-1">
              <p className={`text-xs text-muted-foreground`}>
                Coluna no sistema
              </p>
              <p className={`text-xs text-muted-foreground text-right`}>
                Coluna no seu arquivo
              </p>
            </div>
            {/* <Form {...form}>
              {columnsAlias.map((_, i) => (
                <div key={i} className="flex flex-row items-center gap-6 mt-2">
                  <FormField
                    control={form.control}
                    name={`mapping.${i}.key`}
                    render={({ field }) => (
                      <Combobox
                        disabled
                        selectedValue={{ key: field.value, value: i }}
                        options={columnsAlias.map((c) => {
                          return { key: c, value: columnsAlias.indexOf(c) };
                        })}
                      />
                    )}
                  />
                  <ArrowRightLeft className="h-10 w-10 text-muted-foreground" />
                  <FormField
                    control={form.control}
                    name={`mapping.${i}.value`}
                    render={({ field }) => (
                      <Combobox
                        handleSelect={field.onChange}
                        options={file.fields?.map((f, i) => {
                          return { key: f, value: i };
                        })}
                      />
                    )}
                  />
                </div>
              ))}
            </Form> */}
          </CollapsibleContent>
        </CardContent>
      </Card>
    </Collapsible>
  );
}
