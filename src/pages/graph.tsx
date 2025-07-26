import React, { useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { GraphData } from "../data/mock-graph";
import { getGraph } from "../services/api";

export function GraphPage() {
  const navigate = useNavigate();
  const fgRef = useRef<any>();

  const [graphData, setGraphData] = React.useState<GraphData>({
    nodes: [],
    links: [],
  });

  const [hoveredNode, setHoveredNode] = React.useState<any | null>(null);

  React.useEffect(() => {
    getGraph()
      .then((res) => {
        const original: GraphData = res.data;
        const filteredNodes = original.nodes.filter(
          (n) => !n.label.toLowerCase().includes("test")
        );
        const validIds = new Set(filteredNodes.map((n) => n.id));
        const filteredLinks = original.links.filter(
          (l) => validIds.has(l.source) && validIds.has(l.target)
        );
        setGraphData({ nodes: filteredNodes, links: filteredLinks });
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Header */}
      <header className="relative z-10 bg-black/90 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center space-x-4">
          <button
            onClick={() => navigate("/")}
            className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Home</span>
          </button>
          <h1 className="text-xl font-bold">Knowledge Graph</h1>
        </div>
      </header>

      {/* Graph container */}
      <div className="w-full h-[calc(100vh-72px)]">
        {" "}
        {/* 72px header height */}
        <ForceGraph2D
          ref={fgRef as any}
          graphData={graphData as any}
          backgroundColor="transparent"
          nodeLabel={(node: any) => `${node.label} (${node.type})`}
          linkLabel={(link: any) => link.label || ""}
          nodeAutoColorBy="type"
          nodeCanvasObjectMode={() => "after"}
          nodeCanvasObject={(
            node: any,
            ctx: CanvasRenderingContext2D,
            globalScale: number
          ) => {
            const isHovered = node === hoveredNode;
            const label = isHovered
              ? node.label
              : node.label.length > 5
              ? `${node.label.slice(0, 5)}...`
              : node.label;
            const fontSize = 12 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#ffffff";
            ctx.fillText(label, node.x, node.y + 10);
          }}
          onNodeHover={(node: any | null) => setHoveredNode(node || null)}
          nodeRelSize={6}
          linkColor={() => "rgba(255,255,255,0.4)"}
          onNodeDragEnd={(node: any) => {
            node.fx = node.x;
            node.fy = node.y;
          }}
        />
      </div>
    </div>
  );
}
