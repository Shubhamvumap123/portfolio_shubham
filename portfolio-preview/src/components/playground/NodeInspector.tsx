"use client";

import React from "react";
import { SystemNode } from "../../types/playground";

interface NodeInspectorProps {
  node: SystemNode | null;
  onInspectNode: (nodeId: string) => void;
  isInspected: boolean;
  onClose: () => void;
}

export const NodeInspector: React.FC<NodeInspectorProps> = ({
  node,
  onInspectNode,
  isInspected,
  onClose,
}) => {
  if (!node) {
    return (
      <div
        style={{
          borderRadius: "14px",
          background: "rgba(15, 23, 42, 0.7)",
          border: "1px dashed rgba(255, 255, 255, 0.1)",
          padding: "24px",
          textAlign: "center",
          color: "#94a3b8",
          fontSize: "13px",
        }}
      >
        Select any node on the System Topology Map above to inspect its real-time telemetry, error rates, and diagnostic logs.
      </div>
    );
  }

  const getStatusColor = (status: SystemNode["status"]) => {
    switch (status) {
      case "critical":
        return "#ef4444";
      case "warning":
        return "#f59e0b";
      case "healthy":
      default:
        return "#10b981";
    }
  };

  return (
    <div
      style={{
        borderRadius: "14px",
        background: "rgba(15, 23, 42, 0.85)",
        border: "1px solid rgba(56, 189, 248, 0.3)",
        padding: "18px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4)",
      }}
    >
      {/* Node Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: getStatusColor(node.status),
              boxShadow: `0 0 10px ${getStatusColor(node.status)}`,
            }}
          />
          <div>
            <h4
              style={{
                fontSize: "15px",
                fontWeight: 600,
                color: "#f8fafc",
                margin: 0,
              }}
            >
              {node.label}
            </h4>
            <span style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase" }}>
              Component Type: {node.type}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#94a3b8",
            cursor: "pointer",
            fontSize: "16px",
            padding: "4px 8px",
          }}
        >
          ✕
        </button>
      </div>

      {/* Telemetry Metrics */}
      {node.metrics && node.metrics.length > 0 && (
        <div>
          <div style={{ fontSize: "11px", fontWeight: 600, color: "#94a3b8", marginBottom: "8px", textTransform: "uppercase" }}>
            Live Telemetry & Diagnostics
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "8px" }}>
            {node.metrics.map((metric, idx) => (
              <div
                key={idx}
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  background: "rgba(30, 41, 59, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                <div style={{ fontSize: "10px", color: "#94a3b8" }}>{metric.label}</div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: node.status === "warning" && metric.label.includes("Error") ? "#f59e0b" : "#f8fafc",
                  }}
                >
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action to Inspect and Extract Evidence */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "4px" }}>
        <button
          onClick={() => onInspectNode(node.id)}
          disabled={isInspected}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            borderRadius: "8px",
            background: isInspected
              ? "rgba(16, 185, 129, 0.2)"
              : "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
            color: isInspected ? "#34d399" : "#ffffff",
            border: isInspected ? "1px solid rgba(16, 185, 129, 0.4)" : "none",
            fontSize: "12px",
            fontWeight: 600,
            cursor: isInspected ? "default" : "pointer",
            transition: "all 0.2s ease",
          }}
        >
          {isInspected ? "✓ Component Telemetry Analyzed" : "🔍 Deep Inspect Node"}
        </button>
      </div>
    </div>
  );
};
