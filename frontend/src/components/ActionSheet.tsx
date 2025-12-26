"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { TradingMetadata } from "@/nodes/actions/Lighter";
import { useState } from "react";
import { SUPPORTED_ASSETS } from "./TriggerSheet";
import { Input } from "./ui/input";
import type { NodeKind, NodeMetadata } from "./Workflow";

const SUPPORTED_ACTIONS = [
  { id: "hyperliquid", title: "Hyperliquid" },
  { id: "lighter", title: "Lighter" },
  { id: "backpack", title: "Backpack" },
];

export const ActionSheet = ({
  onSelect,
}: {
  onSelect: (kind: NodeKind, metadata: NodeMetadata) => void;
}) => {
  const [selectedAction, setSelectedAction] = useState(SUPPORTED_ACTIONS[0].id );

  const [metadata, setMetadata] = useState<TradingMetadata | null>(null);

  return (
    <Sheet open>
      <SheetContent className="flex flex-col gap-6">
        <SheetHeader className="space-y-2">
          <SheetTitle className="text-lg font-semibold">
            Select action
          </SheetTitle>

          <SheetDescription className="space-y-5">
            Select the action that you need  
            
            <Select
              value={selectedAction}
              onValueChange={(value) =>
                setSelectedAction(value as NodeKind)
              }
            >
              <SelectTrigger className="w-full">
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

            {(selectedAction === "hyperliquid" ||
              selectedAction === "lighter" ||
              selectedAction === "backpack") && (
              <div className="space-y-4">
                <div className="text-sm font-medium text-muted-foreground">
                  Type
                </div>

                <Select value={metadata?.type}  
                  onValueChange={(value) =>
                    setMetadata((metadata) => ({
                      ...metadata,
                      type: value,
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="long">LONG</SelectItem>
                      <SelectItem value="short">SHORT</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <div className="text-sm font-medium text-muted-foreground">
                  Symbol
                </div>

                <Select
                  value={metadata?.symbol}
                  onValueChange={(value) =>
                    setMetadata((metadata) => ({
                      ...metadata,
                      symbol: value,
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select asset" />
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

                <div className="text-sm font-medium text-muted-foreground">
                  Quantity
                </div>

                <Input
                  type="number"
                  className="w-full
                    [appearance:textfield]
                    [&::-webkit-outer-spin-button]:appearance-auto
                    [&::-webkit-inner-spin-button]:appearance-auto
                  "
                  value={metadata?.quantity}
                  onChange={(e) =>{
                    setMetadata((metadata) => ({
                      ...metadata,
                      quantity:Number(e.target.value),
                    }));
                  }}
                />
              </div>
            )}
          </SheetDescription>
        </SheetHeader>

        <SheetFooter className="flex gap-2 pt-4">
          <Button
            className="flex-1"
            onClick={() => {

              onSelect(selectedAction,metadata);
            }}
          >
            Save Changes
          </Button>

          {/* <SheetClose asChild>
            <Button variant="outline" className="flex-1">
              Close
            </Button>
          </SheetClose> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
