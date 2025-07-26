export interface GraphNode {
  id: string;
  label: string;
  type: string;
}

export interface GraphLink {
  source: string;
  target: string;
  label?: string;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export const mockGraphData: GraphData = {
  nodes: [
    { id: "u1", label: "Alice", type: "User" },
    { id: "u2", label: "Bob", type: "User" },
    { id: "b1", label: "Book", type: "Item" },
    { id: "c1", label: "City", type: "Place" },
  ],
  links: [
    { source: "u1", target: "b1", label: "purchased" },
    { source: "u1", target: "c1", label: "lives_in" },
    { source: "u2", target: "b1", label: "viewed" },
  ],
};
