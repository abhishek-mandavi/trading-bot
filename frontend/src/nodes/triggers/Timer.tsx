import { Handle, Position } from "@xyflow/react";

export type TimerNodeMetadata ={
    time: number;
};

export function Timer ({data}:{
    data:{
        metadata: TimerNodeMetadata
    },
    isConnectable: boolean
}) {
    return(
        <div className="text-black font-medium rounded-lg border bg-background p-3 space-y-1">
            Timer
            <div className="text-xs text-muted-foreground">
                Every {data.metadata.time} seconds
               <Handle type="source" position={Position.Right}></Handle>
            </div>
        </div>
    )
}