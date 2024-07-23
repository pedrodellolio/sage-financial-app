"use client";

import { SystemLabel } from "@prisma/client";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  selected: SystemLabel[];
  setSelected: Dispatch<SetStateAction<SystemLabel[]>>;
};

export default function SuggestionLabelList({ selected, setSelected }: Props) {
  const [systemLabels, setSystemLabels] = useState<SystemLabel[]>([]);

  useEffect(() => {
    axios.get("/api/getAllSystemLabel").then((res) => {
      console.log(res);
      setSystemLabels(res.data);
    });
  }, []);

  const handleLabelSelection = (label: SystemLabel) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(label)) {
        return prevSelected.filter((item) => item !== label);
      } else {
        return [...prevSelected, label];
      }
    });
  };

  return (
    <div className="grid grid-cols-3 gap-4 mt-10">
      {systemLabels.length > 0 &&
        systemLabels.map((s) => {
          return (
            <div
              key={s.title}
              onClick={() => handleLabelSelection(s)}
              className={`flex flex-row items-center gap-4 border rounded-md px-4 w-36 py-3 cursor-pointer ${
                selected.includes(s) && "outline outline-primary"
              } `}
            >
              {/* <div className="border rounded-md p-2 text-primary">{s.icon}</div> */}
              <p className="text-sm">{s.title}</p>
            </div>
          );
        })}
    </div>
  );
}
