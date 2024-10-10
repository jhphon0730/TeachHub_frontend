import { Skeleton } from "@/components/ui/skeleton"
import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h2 className="text-2xl font-semibold text-center">Loading content...</h2>
        <p className="text-muted-foreground text-center">Please wait while we fetch the data.</p>
        
        <div className="w-full max-w-md space-y-4 mt-8">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl mt-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
