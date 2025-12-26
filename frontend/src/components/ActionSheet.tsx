"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
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
  const [selectedAction, setSelectedAction] = useState<NodeKind>(
    SUPPORTED_ACTIONS[0].id as NodeKind
  );

  const [metadata, setMetadata] = useState<TradingMetadata>({
    type: "LONG",
    symbol: "",
    qty: 0,
  });

  return (
    <Sheet open>
      {/* <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger> */}
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select action</SheetTitle>
          <SheetDescription>
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
              <>
                <div className="pt-4">
                    Type
                </div>

                <Select
                    value={metadata?.type}
                    onValueChange={(value) =>
                        setMetadata((metadata) => ({
                        ...metadata,
                        type: value as "LONG" | "SHORT",
                        }))
                    }
                >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectItem value="long">LONG</SelectItem>
                        <SelectItem value="short">SHORT</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <div className="pt-4">
                    Symbol
                </div>
                  <Select value={metadata?.symbol} onValueChange={(value) => setMetadata(metadata => ({ ...metadata, symbol: value }))}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select symbol" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {SUPPORTED_ASSETS.map(
                                asset =>
                                <SelectItem key={asset} value={asset}>
                                    {asset}
                                </SelectItem>
                            )}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                

                <div className="pt-4">Quantity</div>
                <Input
                  value={metadata.quantity}
                  onChange={(e) =>
                    setMetadata(metadata => ({
                      ...metadata,
                      qty: Number(e.target.value),
                    }))
                  }
                />
              </>
            )}
          </SheetDescription>
        </SheetHeader>

        <SheetFooter>
          <Button
            onClick={() => {
              onSelect(selectedAction, metadata);
            }}
          >
            Save Changes
          </Button>

          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};


















