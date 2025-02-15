import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
   return (<>
      <h2 className="text-3xl font-semibold tracking-tight">Měření</h2>
      <div className="flex items-center space-x-4">
         <Skeleton className="h-12 w-12 rounded-full" />
         <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
         </div>
      </div>
   </>
   );
}
