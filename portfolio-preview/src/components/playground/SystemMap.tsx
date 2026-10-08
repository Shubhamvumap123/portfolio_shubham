"use client";

import React from "react";
import { SystemNode } from "../../types/playground";

interface SystemMapProps {
  nodes: SystemNode[];
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
  inspectedNodeIds: string[];
}

export const SystemMap: React.FC<SystemMapProps> = ({
  nodes,
  selectedNodeId,
  onSelectNode,
  inspectedNodeIds,
}) => {
  // Pre-calculated node layout coordinates for clean responsive rendering
  const nodePositions: Record<string, { x: number; y: number }> = {
    frontend: { x: 120, y: 190 },
    api: { x: 340, y: 190 },
    serviceA: { x: 560, y: 100 },
    serviceB: { x: 560, y: 280 },
    db: { x: 780, y: 190 },
  };

  const getStatusColor = (status: SystemNode["status"]) => {
    switch (status) {
      case "critical":
        return {
          border: "#ef4444",
          bg: "rgba(239, 68, 68, 0.12)",
          badge: "#ef4444",
          badgeBg: "rgba(239, 68, 68, 0.2)",
          text: "#fca5a5",
          glow: "rgba(239, 68, 68, 0.4)",
        };
      case "warning":
        return {
          border: "#f59e0b",
          bg: "rgba(245, 158, 11, 0.12)",
          badge: "#f59e0b",
          badgeBg: "rgba(245, 158, 11, 0.2)",
          text: "#fde68a",
          glow: "rgba(245, 158, 11, 0.4)",
        };
      case "healthy":
      default:
        return {
          border: "#10b981",
          bg: "rgba(16, 185, 129, 0.12)",
          badge: "#10b981",
          badgeBg: "rgba(16, 185, 129, 0.2)",
          text: "#6ee7b7",
          glow: "rgba(16, 185, 129, 0.3)",
        };
    }
  };

  const getTypeIcon = (type: SystemNode["type"]) => {
    switch (type) {
      case "frontend":
        return "💻";
      case "api":
        return "⚡";
      case "service":
        return "⚙️";
      case "database":
        return "🗄️";
      default:
        return "📦";
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        borderRadius: "16px",
        background: "radial-gradient(ellipse at center, rgba(16, 185, 129, 0.04) 0%, rgba(15, 23, 42, 0.6) 100%), #0c1220",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        overflow: "hidden",
        boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.5)",
      }}
    >
      {/* Topology Header Info */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          background: "rgba(255, 255, 255, 0.02)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "14px", color: "#10b981" }}>●</span>
          <span style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.05em", color: "#e2e8f0", textTransform: "uppercase" }}>
            Live System Topology
          </span>
          <span
            style={{
              fontSize: "11px",
              padding: "2px 8px",
              borderRadius: "10px",
              background: "rgba(16, 185, 129, 0.15)",
              color: "#34d399",
              border: "1px solid rgba(16, 185, 129, 0.3)",
            }}
          >
            Interactive
          </span>
        </div>
        <div style={{ fontSize: "12px", color: "#94a3b8" }}>
          Click nodes to inspect health & logs
        </div>
      </div>

      {/* SVG Canvas for Connectors and Graph */}
      <div style={{ position: "relative", width: "100%", height: "380px" }}>
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
          viewBox="0 0 900 380"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="healthyLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="warningLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Render Connections between nodes */}
          {nodes.flatMap((sourceNode) => {
            const sourcePos = nodePositions[sourceNode.id];
            if (!sourcePos) return [];

            return sourceNode.connections.map((targetId) => {
              const targetPos = nodePositions[targetId];
              if (!targetPos) return null;

              const isProblematic =
                sourceNode.status === "warning" || sourceNode.status === "critical";

              return (
                <g key={`${sourceNode.id}-${targetId}`}>
                  {/* Outer Glow Path */}
                  <line
                    x1={sourcePos.x}
                    y1={sourcePos.y}
                    x2={targetPos.x}
                    y2={targetPos.y}
                    stroke={isProblematic ? "rgba(245, 158, 11, 0.2)" : "rgba(16, 185, 129, 0.15)"}
                    strokeWidth="4"
                  />
                  {/* Main Connector Line */}
                  <line
                    x1={sourcePos.x}
                    y1={sourcePos.y}
                    x2={targetPos.x}
                    y2={targetPos.y}
                    stroke={isProblematic ? "url(#warningLine)" : "url(#healthyLine)"}
                    strokeWidth="2"
                    strokeDasharray={isProblematic ? "6, 4" : "4, 4"}
                  />
                </g>
              );
            });
          })}
        </svg>

        {/* Render Node Cards as Interactive Overlays */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          {nodes.map((node) => {
            const pos = nodePositions[node.id] || { x: 450, y: 190 };
            const isSelected = selectedNodeId === node.id;
            const isInspected = inspectedNodeIds.includes(node.id);
            const colors = getStatusColor(node.status);

            const leftPercent = (pos.x / 900) * 100;
            const topPercent = (pos.y / 380) * 100;

            return (
              <div
                key={node.id}
                onClick={() => onSelectNode(node.id)}
                style={{
                  position: "absolute",
                  left: `${leftPercent}%`,
                  top: `${topPercent}%`,
                  transform: "translate(-50%, -50%)",
                  cursor: "pointer",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  zIndex: isSelected ? 10 : 2,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "140px",
                    padding: "10px 12px",
                    borderRadius: "12px",
                    backgroundColor: isSelected ? "#1e293b" : "#0f172a",
                    border: `1.5px solid ${isSelected ? "#38bdf8" : colors.border}`,
                    boxShadow: isSelected
                      ? `0 0 25px rgba(56, 189, 248, 0.4), 0 8px 16px rgba(0, 0, 0, 0.6)`
                      : `0 4px 12px rgba(0, 0, 0, 0.3)`,
                    transform: isSelected ? "scale(1.08)" : "scale(1)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "6px",
                    }}
                  >
                    <span style={{ fontSize: "16px" }}>{getTypeIcon(node.type)}</span>
                    <span
                      style={{
                        fontSize: "9px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        padding: "2px 5px",
                        borderRadius: "5px",
                        backgroundColor: colors.badgeBg,
                        color: colors.badge,
                        border: `1px solid ${colors.badge}`,
                      }}
                    >
                      {node.status}
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#f8fafc",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      marginBottom: "4px",
                    }}
                  >
                    {node.label}
                  </div>

                  {node.metrics && node.metrics.length > 0 && (
                    <div
                      style={{
                        fontSize: "10px",
                        color: colors.text,
                        fontWeight: 500,
                        backgroundColor: colors.bg,
                        padding: "2px 5px",
                        borderRadius: "4px",
                        marginTop: "2px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>{node.metrics[0].label}:</span>
                      <strong>{node.metrics[0].value}</strong>
                    </div>
                  )}

                  {isInspected && (
                    <div
                      style={{
                        marginTop: "4px",
                        fontSize: "9px",
                        color: "#38bdf8",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <span>✓</span> Inspected
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
