import { SheetClose } from "@/components/ui/sheet";
import { ArrowLeft } from "lucide-react";

export function SheetBack({ children }: { children?: React.ReactNode }) {
  return (
    <SheetClose asChild>
      <button
        type="button"
        className="inline-flex items-center gap-2 text-sm font-medium"
      >
        <ArrowLeft className="h-4 w-4" />
        {children ?? "Back"}
      </button>
    </SheetClose>
  );
}
