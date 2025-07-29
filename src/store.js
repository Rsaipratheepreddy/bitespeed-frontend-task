

import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  currentSelectId: null,
  setCurrentSelectId: (id) => {
    set({ currentSelectId: id });
  },
  error: null,
  setError: (error) => {
    set({ error });
  },
  validateNodes: () => {
    const { nodes, edges } = get();
    if (nodes.length <= 1) return true;
    const nodesWithEmptyTargets = nodes.filter(node => {
      const incomingEdges = edges.filter(edge => edge.target === node.id);
      return incomingEdges.length === 0;
    });

    if (nodesWithEmptyTargets.length > 1) {
      set({ error: 'Multiple nodes have empty target handles. Please connect them.' });
      return false;
    }
    set({ error: null });
    return true;
  },
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node]
    });
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge({ ...connection, type: 'smoothstep', animated: true, markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' } }, get().edges),
    });
  },
  updateNodeField: (nodeId, data) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = data;
        }

        return node;
      }),
    });
  },
}));
