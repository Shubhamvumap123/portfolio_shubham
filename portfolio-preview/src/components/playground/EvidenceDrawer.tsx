"use client";

import React from "react";
import { Evidence } from "../../types/playground";

interface EvidenceDrawerProps {
  evidenceList: Evidence[];
  unlockedEvidenceIds: string[];
}

export const EvidenceDrawer: React.FC<EvidenceDrawerProps> = ({
  evidenceList,
  unlockedEvidenceIds,
}) => {
  const unlockedCount = unlockedEvidenceIds.length;
  const totalCount = evidenceList.length;

  return (
    <div
      style={{
        borderRadius: "14px",
        background: "rgba(15, 23, 42, 0.7)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        padding: "18px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "16px" }}>🔍</span>
          <span style={{ fontSize: "14px", fontWeight: 600, color: "#f8fafc" }}>
            Discovered Evidence
          </span>
        </div>
        <span
          style={{
            fontSize: "12px",
            padding: "2px 8px",
            borderRadius: "10px",
            backgroundColor: unlockedCount === totalCount ? "rgba(16, 185, 129, 0.2)" : "rgba(56, 189, 248, 0.15)",
            color: unlockedCount === totalCount ? "#34d399" : "#38bdf8",
            border: "1px solid currentColor",
            fontWeight: 600,
          }}
        >
          {unlockedCount} / {totalCount} Found
        </span>
      </div>

      {/* Evidence Items */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {evidenceList.map((item, index) => {
          const isUnlocked = unlockedEvidenceIds.includes(item.id);

          return (
            <div
              key={item.id}
              style={{
                borderRadius: "10px",
                padding: "12px 14px",
                backgroundColor: isUnlocked ? "rgba(30, 41, 59, 0.8)" : "rgba(15, 23, 42, 0.4)",
                border: isUnlocked ? "1px solid rgba(56, 189, 248, 0.3)" : "1px dashed rgba(255, 255, 255, 0.1)",
                transition: "all 0.3s ease",
              }}
            >
              {isUnlocked ? (
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "6px",
                    }}
                  >
                    <span style={{ color: "#38bdf8", fontSize: "14px" }}>✓</span>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#e2e8f0" }}>
                      {item.title}
                    </span>
                    <span
                      style={{
                        marginLeft: "auto",
                        fontSize: "10px",
                        color: "#94a3b8",
                        textTransform: "uppercase",
                      }}
                    >
                      Evidence #{index + 1}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#94a3b8",
                      lineHeight: "1.5",
                      margin: 0,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#64748b",
                    fontSize: "12px",
                  }}
                >
                  <span>🔒</span>
                  <span>Clue #{index + 1} Locked — Inspect relevant nodes or make investigation choices to discover.</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
