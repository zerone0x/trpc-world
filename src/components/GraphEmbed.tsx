import React from "react";
import ForceGraph2D from "react-force-graph-2d";
import { GraphData } from "../data/mock-graph";
import { getGraph } from "../services/api";

export function GraphEmbed() {
  const fgRef = React.useRef<any>();
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

  const height = typeof window !== "undefined" ? window.innerHeight - 80 : 600;

  return (
    <div className="w-full h-full bg-black">
      <ForceGraph2D
        ref={fgRef as any}
        width={450}
        height={height}
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
  );
}
