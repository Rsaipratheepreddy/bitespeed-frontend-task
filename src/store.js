import { create } from "zustand";
import { v4 as uuidv4 } from 'uuid';
import dagre from 'dagre';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';

const nodeWidth = 172;
const nodeHeight = 36;

const getLayouted = (nodes, edges, direction = 'LR') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  return nodes.map((node) => {
    const { x, y } = dagreGraph.node(node.id);
    return { ...node, position: { x, y } };
  });
};

export const useStore = create((set, get) => ({
  reactFlowInstance: null,
  setReactFlowInstance: (inst) => set({ reactFlowInstance: inst }),
  nodes: [{ id: uuidv4(), type: 'account', position: { x: 250, y: 50 }, data: '' }],
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
  getNodeID: () => {
    return uuidv4();
  },

  addNode: (node) => {
    // ensure unique id
    if (get().nodes.find(n => n.id === node.id)) return;

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
  addChild: (parentId, childType) => {
    const { nodes, edges, reactFlowInstance, getNodeID } = get();
    const parent = nodes.find(n => n.id === parentId);
    if (!parent) return;

    const allowed = {
      account: ['loan', 'collateral'],
      loan: ['collateral'],
      collateral: [],
    };
    if (!allowed[parent.type].includes(childType)) return;

    const childId = getNodeID();
    const newNode = { id: childId, type: childType, position: { x: 0, y: 0 }, data: '' };
    const updatedNodes = [...nodes, newNode];
    const updatedEdges = [...edges, { id: `${parentId}-${childId}`, source: parentId, target: childId, type: 'smoothstep' }];
    const layouted = getLayouted(updatedNodes, updatedEdges);
    set({ nodes: layouted, edges: updatedEdges });
  },
  deleteNode: (nodeId) => {
    const { nodes, edges } = get();

    const toDelete = new Set([nodeId]);
    let added = true;
    while (added) {
      added = false;
      edges.forEach((edge) => {
        if (toDelete.has(edge.source) && !toDelete.has(edge.target)) {
          toDelete.add(edge.target);
          added = true;
        }
      });
    }

    set({
      nodes: nodes.filter((n) => !toDelete.has(n.id)),
      edges: edges.filter((e) => !toDelete.has(e.source) && !toDelete.has(e.target)),
      currentSelectId: null,
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
