import { Handle, Position } from "@xyflow/react"
import type { TradingMetadata } from "./Lighter"



export function Backpack({data}:{
    data:{
        metadata: TradingMetadata
    }
}) {
    return (
        <div className=" text-black font-medium rounded-lg border bg-background p-3 space-y-1">
            Backpack Trade
            <div className="text-xs text-muted-foreground">
                TYPE: <span className="text-black font-medium">{data.metadata.type?.toUpperCase()}</span>
            </div>
            <div className="text-xs text-muted-foreground">
                Quantity: <span className="text-black font-medium">{data.metadata.quantity}</span>
            </div>
            <div className="text-xs text-muted-foreground">
                Symbol: <span className="text-black font-medium">{data.metadata.symbol}</span>
            </div>
            <Handle type="source" position={Position.Right}></Handle>
            <Handle type="target" position={Position.Left}></Handle>
        </div>
    )
}
