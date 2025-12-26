
import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { useState } from "react";

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
import type { PriceTriggerMetadata } from "@/nodes/triggers/PriceTrigger";
import type { TimerNodeMetadata } from "@/nodes/triggers/Timer";
import type { NodeKind, NodeMetadata } from "./Workflow";
import { Input } from "./ui/input";


const SUPPORTED_TRIGGERS =[{
    id: "timer",
    title: "Timer",
    description: "Run this trigger every x seconds"
},{
    id:"price-trigger",
    title: "Price Trigger",
    description: "Runs whenever the price goes above or below a certain number for an asset"
}]

export const SUPPORTED_ASSETS = ["BTC", "DOGE", "ETH", "SOL", "BNB", "XRP"];

export const TriggerSheet = ({
    onSelect
}:{
    onSelect: (kind: NodeKind, metadata: NodeMetadata) => void
}) => {
    const [metadata, setMetadata] = useState<PriceTriggerMetadata | TimerNodeMetadata>({
        time: 3600
    });
    const [selectedTrigger, setSelectedTrigger] = useState(SUPPORTED_TRIGGERS[0].id)



    return(
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Open</Button>
            </SheetTrigger>


            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Select controller</SheetTitle>
                    <SheetDescription>
                        Select type
                        {/* {selectedTrigger} */}
                        <Select value={selectedTrigger} onValueChange={(value) => setSelectedTrigger(value)}>
                            <SelectTrigger className="w-45">
                                <SelectValue placeholder="Select a trigger" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                {/* <SelectLabel>Fruits</SelectLabel> */}
                                {SUPPORTED_TRIGGERS
                                    .map(
                                        ({id, title})=> <>
                                            {/* <SelectLabel>{title}</SelectLabel> */}
                                            <SelectItem key={id} value={id}>{title}</SelectItem>
                                        </>
                                        
                                    )
                                }
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        {
                            selectedTrigger === "timer" &&
                            <div>
                                <div>
                                    Number of seconds
                                </div>
                                <Input value={metadata.time} onChange={(e) => setMetadata(metadata => ({
                                    ...metadata,
                                    time: Number(e.target.value)
                                }))}></Input>
                            </div>
                        }

                        {
                            selectedTrigger === "price-trigger" &&
                            <div>
                                Price:
                                <Input type="text" onChange={(e) => setMetadata(m => ({
                                    ...m,
                                    price: Number (e.target.value)
                                }))}>
                                </Input>

                                Asset:
                                <Select value={metadata.asset} onValueChange={(value) => setMetadata(metadata => ({
                                    ...metadata,
                                    asset: value
                                }))}>
                                    <SelectTrigger className="w-45">
                                        <SelectValue placeholder="Select an asset" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {SUPPORTED_ASSETS.map(asset => (
                                                <SelectItem key={asset} value={asset}>
                                                {asset}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>


                            </div>
                        }
                    </SheetDescription>
                </SheetHeader>


                

                <SheetFooter>
                    <Button
                        onClick={() => {
                            onSelect(
                                selectedTrigger, 
                                metadata
                            )
                        }}
                        type="submit"
                    >
                        Save changes
                    </Button>

                    <SheetClose asChild>
                        <Button variant="outline">
                            Close
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
