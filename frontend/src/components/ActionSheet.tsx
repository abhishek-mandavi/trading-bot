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
import { SUPPORTED_ASSETS } from "./TriggerSheet";
import type { NodeKind, NodeMetadata } from "./Workflow";
import { Input } from "./ui/input";



const SUPPORTED_ACTIONS =[{
    id: "hyperliquid",
    title: "Hyperliquid",
    description: "Place a trade on hyperliquid",
},{
    id:"lighter",
    title: "Lighter",
    description: "Place a trade on hyperliquid"
},{
    id:"backpack",
    title: "Backpack",
    description: "Place a trade on hyperliquid"
}]



export const ActionSheet = ({
    onSelect
}:{
    onSelect: (kind: NodeKind, metadata: NodeMetadata) => void
}) => {
    const [metadata, setMetadata] = useState<PriceTriggerMetadata | TimerNodeMetadata>({
        time: 3600
    });
    const [selectedTrigger, setSelectedTrigger] = useState(SUPPORTED_ACTIONS[0].id)



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
                                {SUPPORTED_ACTIONS
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
