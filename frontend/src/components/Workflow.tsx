import Backpack from '@/nodes/actions/Backpack';
import Hyperliquid from '@/nodes/actions/Hyperliquid';
import type { TradingMetadata } from '@/nodes/actions/Lighter';
import { Lighter } from '@/nodes/actions/Lighter';
import { PriceTrigger, type PriceTriggerMetadata } from '@/nodes/triggers/PriceTrigger';
import { Timer, type TimerNodeMetadata } from '@/nodes/triggers/Timer';
import { ReactFlow, addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useState } from 'react';
import { ActionSheet } from './ActionSheet';
import { TriggerSheet } from './TriggerSheet';


const nodeTypes ={
  "price-trigger": PriceTrigger,
  "timer": Timer,
  lighter: Lighter,
  hyperliquid: Hyperliquid,
  backpack: Backpack,
}

export type NodeKind = "price-trigger" | "timer" | "hyperliquid" | "backpack" | "lighter"

interface Nodetype{
  type:  NodeKind,
  data:{ 
    kind: "action" | "trigger",
    metadata: NodeMetadata,
    // label: string
  },
  id: string, 
  position: { x: number, y: number},
}

export type NodeMetadata = TradingMetadata | PriceTriggerMetadata | TimerNodeMetadata;

interface Edge{
    id:string,
    source:string,
    target:string
}

export default function App() {
  const [nodes, setNodes] = useState<Nodetype[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectAction, setSelectedAction] = useState<{
    position:{
      x:number,
      y:number,
    },
    startingNodeId: string,
  } | null>(null);
 
  const onNodesChange = useCallback(
    (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );

  const onConnect = useCallback(
    (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  const onConnectEnd = useCallback(
    (params,connectionInfo) =>{
      if(!connectionInfo.isValid){
        setSelectedAction({
          startingNodeId: connectionInfo.fromNode.id,
          position: connectionInfo.fromNode.to
        })
        console.log(connectionInfo.fromNode.id)
        console.log(connectionInfo.fromNode.to)
      }
    },
    []
  )

  return (
    <div 
      style={{ width: '100vw', height: '100vh' }}
    >
      {!nodes.length && <TriggerSheet onSelect={(type,metadata) => {
        setNodes([...nodes,{
          id: Math.random().toString(),
          type,
          data: {
            kind: "trigger",
            metadata,
                // label: kind
          },
          position: {x:0, y:0}
                
        }])
      }}/>}

      {
        selectAction && 
        <ActionSheet
          onSelect={(type,metadata) => {
            const nodeId = Math.random().toString();
            setNodes([...nodes,{
              id: nodeId,
              type,
              data: {
                kind: "action",
                metadata,
              },
              position: selectAction.position
                    
            }]);
            setEdges([...edges,{
              id: `${selectAction.startingNodeId}-${nodeId}`,
              source: selectAction.startingNodeId,
              target: nodeId,
            }])
            setSelectedAction(null);
          }}
        />
      }


      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        fitView
      />
    </div>
  );
}
