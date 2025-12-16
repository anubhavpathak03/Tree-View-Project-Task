import {
  Background,
  Controls,
  // MiniMap,
  ReactFlow,
  // addEdge,
  // applyEdgeChanges,
  // applyNodeChanges
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useState } from 'react'
import './App.css';

import {treeData} from "./data/treeData.js";
import { buildingTreeLayout } from './logic/treeLayout.js';
import TreeNodeLayout from "./components/TreeNodeLayout.jsx"

const nodeTypes = {
  treeNode: TreeNodeLayout,
};

function App() {
  const [data, setData] = useState(treeData);

  
  
  // Toggle expand / collapse
  const toggleNode = (_, clickedNode) => {
    const toggle = (node) => {
      if (node.id === clickedNode.id) {
        node.expanded = !node.expanded;
      }
      node.children?.forEach(toggle);
    };
    
    const newData = structuredClone(data); // deep copy
    toggle(newData);
    setData(newData);
  };
  
  const nodes = [];
  const edges = [];

  buildingTreeLayout(data, 0, 0, nodes, edges, null, toggleNode) ;

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={toggleNode}
        nodeTypes={nodeTypes}
        fitView
      >
       

        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>

    </div>
  )
}

export default App
