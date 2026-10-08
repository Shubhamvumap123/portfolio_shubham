"use client";

import React from "react";
import { RootCause, Solution, Impact } from "../../types/playground";

interface RootCauseRevealProps {
  rootCause: RootCause;
  solution: Solution;
  impact: Impact;
  learningPoints: string[];
  onReset: () => void;
}

export const RootCauseReveal: React.FC<RootCauseRevealProps> = ({
  rootCause,
  solution,
  impact,
  learningPoints,
  onReset,
}) => {
  return (
    <div
      style={{
        borderRadius: "16px",
        background: "radial-gradient(ellipse at top left, rgba(16, 185, 129, 0.1) 0%, rgba(15, 23, 42, 0.9) 100%), #0c1220",
        border: "1.5px solid rgba(16, 185, 129, 0.4)",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.6)",
      }}
    >
      {/* Solved Header Banner */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          paddingBottom: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "22px" }}>🏆</span>
          <div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#34d399",
                margin: 0,
              }}
            >
              Incident Successfully Diagnosed & Resolved!
            </h3>
            <span style={{ fontSize: "12px", color: "#94a3b8" }}>
              Root cause isolated with high diagnostic confidence.
            </span>
          </div>
        </div>
        <button
          onClick={onReset}
          style={{
            padding: "6px 14px",
            borderRadius: "8px",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            color: "#e2e8f0",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          ↻ Replay Scenario
        </button>
      </div>

      {/* Root Cause Box */}
      <div
        style={{
          padding: "16px",
          borderRadius: "12px",
          backgroundColor: "rgba(16, 185, 129, 0.08)",
          border: "1px solid rgba(16, 185, 129, 0.25)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "#6ee7b7" }}>
            Root Cause Diagnosis
          </span>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: "12px",
              background: "rgba(16, 185, 129, 0.25)",
              color: "#34d399",
            }}
          >
            {rootCause.confidence}% Confidence
          </span>
        </div>
        <p style={{ margin: 0, fontSize: "14px", color: "#f8fafc", lineHeight: "1.5" }}>
          {rootCause.description}
        </p>
      </div>

      {/* Engineering Solution & Architecture Changes */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
        {/* Solution Approach */}
        <div
          style={{
            padding: "16px",
            borderRadius: "12px",
            backgroundColor: "rgba(30, 41, 59, 0.5)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "#38bdf8", marginBottom: "8px" }}>
            Engineered Solution
          </div>
          <p style={{ margin: "0 0 12px 0", fontSize: "13px", color: "#cbd5e1", lineHeight: "1.5" }}>
            {solution.approach}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {solution.technologies.map((tech, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: "11px",
                  padding: "3px 8px",
                  borderRadius: "6px",
                  background: "rgba(56, 189, 248, 0.15)",
                  color: "#38bdf8",
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Architecture Changes */}
        <div
          style={{
            padding: "16px",
            borderRadius: "12px",
            backgroundColor: "rgba(30, 41, 59, 0.5)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "#a78bfa", marginBottom: "8px" }}>
            Architectural Changes
          </div>
          <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "13px", color: "#cbd5e1", lineHeight: "1.6" }}>
            {solution.architectureChanges.map((change, idx) => (
              <li key={idx}>{change}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Measured Impact Bar */}
      <div
        style={{
          padding: "16px",
          borderRadius: "12px",
          backgroundColor: "rgba(30, 41, 59, 0.6)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "#f59e0b", marginBottom: "12px" }}>
          Production Impact: {impact.metric}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "11px", color: "#94a3b8" }}>Before</div>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "#ef4444" }}>{impact.before}</div>
          </div>
          <div style={{ flex: 1, height: "8px", borderRadius: "4px", background: "rgba(255, 255, 255, 0.1)", overflow: "hidden", position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: "60%",
                background: "linear-gradient(90deg, #ef4444 0%, #10b981 100%)",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "11px", color: "#94a3b8" }}>After Fix</div>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "#10b981" }}>{impact.after}</div>
          </div>
        </div>
        <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "8px", textAlign: "center" }}>
          {solution.result}
        </div>
      </div>

      {/* Key Learning Points */}
      <div>
        <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "#94a3b8", marginBottom: "8px" }}>
          Core Engineering Takeaways
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {learningPoints.map((point, idx) => (
            <div
              key={idx}
              style={{
                fontSize: "12px",
                color: "#e2e8f0",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                padding: "6px 12px",
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              💡 {point}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
