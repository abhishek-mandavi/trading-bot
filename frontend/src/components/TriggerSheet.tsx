
import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
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
import type { NodeKind } from "./Workflow";

type NodeMetadata = any;

const SUPPORTED_TRIGGERS =[{
    id: "timer",
    title: "timer",
    description: "Run this trigger every x seconds"
},{
    id:"price-trigger",
    title: "Price Trigger",
    description: "Runs whenever the price goes above or below a certain number for an asset"
}]

export const TriggerSheet = ({
    onSelect
}:{
    onSelect: (kind: NodeKind, metadata: NodeMetadata) => void
}) => {
    const [metadata, setMetadata] = useState({});
    return(
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Open</Button>
            </SheetTrigger>


            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Select controller</SheetTitle>
                    <SheetDescription>
                        Select type.

                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a fruit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Fruits</SelectLabel>
                                {SUPPORTED_TRIGGERS
                                    .map(
                                        ({id, title})=> <>
                                            <SelectLabel>{title}</SelectLabel>
                                            <SelectItem onSelect={() => onSelect(
                                                id,
                                                metadata
                                            )} value={id}>{title}</SelectItem>
                                        </>
                                        
                                    )
                                }
                                
                                
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </SheetDescription>
                </SheetHeader>


                

                <SheetFooter>
                    <Button type="submit">Save changes</Button>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
