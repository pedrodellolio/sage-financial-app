"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Dropzone, { useDropzone } from "react-dropzone";
import { ChevronRight, FileUp } from "lucide-react";
import { useCallback, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { usePapaParse } from "react-papaparse";
import { CollapsibleFileCard } from "../collapsable-file-card";
import { CSVFile, Label, MappedTransaction } from "@/dto/types";
import { createFiles } from "@/app/actions/files";
import { useSession } from "next-auth/react";
import {
  AddTransactionDTO,
  createTransactions,
} from "@/app/actions/transactions";
import { fileDataToTransactions } from "@/lib/utils";
import { TransactionType } from "@prisma/client";

interface Props {
  open: boolean;
}

export default function ImportFilesDialog(props: Props) {
  const { data: session } = useSession();
  const profileId = session?.user.selectedProfile?.id;

  const { readString } = usePapaParse();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const readFile = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          resolve(content);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
      });
    };

    for (const file of acceptedFiles) {
      try {
        const content = await readFile(file);
        parseCSVString(content, file);
      } catch (error) {
        console.error("Error reading file:", error);
      }
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
  });

  const [files, setFiles] = useState<CSVFile[]>([]);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const parseCSVString = (csv: string, file: File) => {
    readString(csv, {
      worker: true,
      dynamicTyping: true,
      header: true,
      complete: ({ data, meta }) => {
        setFiles((prevState) => {
          return [
            ...prevState,
            {
              name: file.name,
              size: file.size,
              data,
              fields: meta.fields ?? [],
              mapping: [],
            },
          ];
        });
      },
    });
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.delete("i");
      const search = current.toString();
      const query = search ? `?${search}` : "";
      router.push(`${pathname}${query}`);
    }
  };

  // const handleRemoveFile = (index: number) => {
  //   setFiles((prevFiles) => prevFiles?.filter((_, i) => i !== index));
  // };

  const handleUploadFiles = async () => {
    if (profileId) {
      const filesArray = files.map((f) => {
        return { profileId: profileId, name: f.name };
      });
      const teste = await createFiles(profileId, filesArray);
      console.log(teste);
      const filesData = files.map((file) =>
        fileDataToTransactions(file.data, file.mapping)
      );
      for (const transactions of filesData) {
        console.log(transactions);
        await createTransactions(profileId, transactions);
      }
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={props.open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Importar arquivos</DialogTitle>
            <DialogDescription>
              Importe suas movimentações de um arquivo Excel.
            </DialogDescription>
          </DialogHeader>
          <Dropzone onDrop={onDrop}>
            {() => (
              <>
                <div
                  className="border-2 border-dashed rounded-md h-64"
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <div className="h-full flex flex-col justify-center items-center gap-4">
                    <FileUp
                      strokeWidth={1.25}
                      className="w-14 h-14 text-muted-foreground"
                    />
                    <div className="text-center">
                      <p>
                        Arraste e solte os arquivos, ou{" "}
                        <span className="underline">clique aqui</span>
                      </p>
                      <p className="text-muted-foreground text-sm leading-6 ">
                        Permitido somente arquivos .csv
                      </p>
                    </div>
                  </div>
                </div>
                <ScrollArea className="h-[315px]">
                  {files.length > 0 ? (
                    <ul>
                      {files.map((f, i) => {
                        return (
                          <li key={i} className="mb-2">
                            <CollapsibleFileCard
                              file={f}
                              handleMappingChange={(value) =>
                                setFiles((prevState) => {
                                  const array = [...prevState];
                                  array[i].mapping = value;
                                  return array;
                                })
                              }
                            />
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <div className="flex justify-center items-center border rounded-md h-[315px]">
                      <p className="text-sm text-muted-foreground">
                        Os arquivos selecionados aparecerão aqui.
                      </p>
                    </div>
                  )}
                </ScrollArea>
              </>
            )}
          </Dropzone>
          <DialogFooter>
            <Button
              type="button"
              disabled={files.length === 0}
              size={"sm"}
              onClick={() => handleUploadFiles()}
            >
              Importar arquivos
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={props.open}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DialogTitle>Adicionar categoria</DialogTitle>
          <DialogDescription>
            Crie uma categoria de movimentações.
          </DialogDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
