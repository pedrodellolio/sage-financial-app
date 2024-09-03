import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function LabelSkeleton() {
  return (
    <>
      {Array.from({ length: 12 }, (_, i) => i).map((n) => {
        return (
          <div
            key={n}
            className={`flex flex-row items-center gap-4 border rounded-md px-4 w-36 py-3 cursor-pointer`}
          >
            <Skeleton className="h-4 w-[250px]" />
          </div>
        );
      })}
    </>
  );
}

export default LabelSkeleton;
