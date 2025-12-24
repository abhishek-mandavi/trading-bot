import { PriceTrigger } from '@/nodes/triggers/PriceTrigger';
import { Timer } from '@/nodes/triggers/Timer';
import { ReactFlow, addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useState } from 'react';
import { TriggerSheet } from './TriggerSheet';

const nodeTypes ={
  "price-trigger": PriceTrigger,
  "timer": Timer
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

export type NodeMetadata = any;

interface Edge{
    id:string,
    source:string,
    target:string
}

export default function App() {
  const [nodes, setNodes] = useState<Nodetype[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
 
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
