import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

import type { TradingMetadata } from "@/nodes/actions/Lighter";
import { SUPPORTED_ASSETS } from "./TriggerSheet";
import type { NodeKind, NodeMetadata } from "./Workflow";

const SUPPORTED_ACTIONS = [
  { id: "hyperliquid", title: "Hyperliquid", description: "Place a trade on Hyperliquid" },
  { id: "lighter", title: "Lighter", description: "Place a trade on Hyperliquid" },
  { id: "backpack", title: "Backpack", description: "Place a trade on Hyperliquid" },
];

export const ActionSheet = ({
  onSelect,
}: {
  onSelect: (kind: NodeKind, metadata: NodeMetadata) => void;
}) => {
  const [selectedAction, setSelectedAction] = useState(SUPPORTED_ACTIONS[0].id);
  const [metadata, setMetadata] = useState<TradingMetadata | {}>({});

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>

      <SheetContent className="w-[420px]">
        <SheetHeader>
          <SheetTitle>Select Action</SheetTitle>
          <SheetDescription>
            Choose an action and configure its parameters.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-5">
          {/* Action selector */}
          <div>
            <label className="text-sm font-medium">Action</label>
            <Select
              value={selectedAction}
              onValueChange={(value) => setSelectedAction(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {SUPPORTED_ACTIONS.map(({ id, title }) => (
                    <SelectItem key={id} value={id}>
                      {title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Trade config */}
          {(selectedAction === "hyperliquid" ||
            selectedAction === "lighter" ||
            selectedAction === "backpack") && (
            <div className="space-y-4">
              {/* Type */}
              <div>
                <label className="text-sm font-medium">Type</label>
                <Select
                  value={(metadata as TradingMetadata)?.type}
                  onValueChange={(value) =>
                    setMetadata((m) => ({ ...m, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="long">LONG</SelectItem>
                    <SelectItem value="short">SHORT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Symbol */}
              <div>
                <label className="text-sm font-medium">Symbol</label>
                <Select
                  value={(metadata as TradingMetadata)?.symbol}
                  onValueChange={(value) =>
                    setMetadata((m) => ({ ...m, symbol: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select symbol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {SUPPORTED_ASSETS.map((asset) => (
                        <SelectItem key={asset} value={asset}>
                          {asset}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div>
                <label className="text-sm font-medium">Quantity</label>
                <Input
                  type="number"
                  value={(metadata as TradingMetadata)?.quantity ?? ""}
                  onChange={(e) =>
                    setMetadata((m) => ({
                      ...m,
                      quantity: Number(e.target.value),
                    }))
                  }
                  placeholder="Enter quantity"
                />
              </div>
            </div>
          )}
        </div>

        <SheetFooter className="mt-6">
          <Button
            type="submit"
            onClick={() => onSelect(selectedAction, metadata)}
          >
            Save Action
          </Button>

          <SheetClose asChild>
            <Button variant="outline">Back</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
