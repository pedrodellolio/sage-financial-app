"use client";

import { SystemLabel } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import LabelSkeleton from "../label/label-skeleton";
import { AddLabelDTO } from "@/dto/types";

interface Props {
  onLabelClick: (label: SystemLabel) => void;
  selected: AddLabelDTO[];
}

export default function SuggestionLabelList({ onLabelClick, selected }: Props) {
  const [systemLabels, setSystemLabels] = useState<SystemLabel[]>([]);

  useEffect(() => {
    axios.get("/api/getAllSystemLabel").then((res) => {
      setSystemLabels(res.data);
    });
  }, []);

  console.log(selected);
  return (
    <div className="grid grid-cols-3 gap-4 mt-10">
      {systemLabels.length > 0 ? (
        systemLabels.map((s) => {
          const isSelected = selected.some((label) => label.title === s.title);
          return (
            <div
              key={s.title}
              onClick={() => onLabelClick(s)}
              className={`flex flex-row items-center gap-4 border rounded-md px-4 w-36 py-3 cursor-pointer ${
                isSelected && "outline outline-primary"
              } `}
            >
              {/* <div className="border rounded-md p-2 text-primary">{s.icon}</div> */}
              <p className="text-sm">{s.title}</p>
            </div>
          );
        })
      ) : (
        <LabelSkeleton />
      )}
    </div>
  );
}
