import { Skeleton } from "@/components/ui/skeleton";

interface Cards {
  length: number;
}

export function SkeletonCard(props: Cards) {
  return Array(props.length)
    .fill(0)
    .map((_, i) => (
      <div key={i} className="flex ">
        <Skeleton className="h-[22rem] w-[15rem]" />
      </div>
    ));
}
