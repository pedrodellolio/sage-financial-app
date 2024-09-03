import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="flex-1 space-y-4 w-full">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Dashboard</h2>
        <Skeleton className="h-10 w-[250px] rounded-xl" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-[125px] rounded-xl" />
        <Skeleton className="h-[125px] rounded-xl" />
        <Skeleton className="h-[125px] rounded-xl" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Skeleton className="h-[400px] rounded-xl col-span-4" />
        <Skeleton className="h-[400px] rounded-xl col-span-2" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Skeleton className="h-[400px] rounded-xl col-span-4" />
      </div>
    </div>
  );
}
