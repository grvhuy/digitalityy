import { Skeleton } from "@/components/ui/skeleton";

interface Cards {
  length: number;
  // width: number;
  // height: number;
}

export function SkeletonCard() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-[16rem] w-[16rem]" />
      <Skeleton className="h-4 w-[16rem]" />
    </div>
  );
}
