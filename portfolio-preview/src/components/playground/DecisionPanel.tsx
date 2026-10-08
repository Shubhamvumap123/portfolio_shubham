"use client";

import React, { useState } from "react";
import { Decision, DecisionOption } from "../../types/playground";

interface DecisionPanelProps {
  decisions: Decision[];
  onSelectOption: (decisionId: string, option: DecisionOption) => void;
  selectedOptions: Record<string, string>; // decisionId -> optionId
}

export const DecisionPanel: React.FC<DecisionPanelProps> = ({
  decisions,
  onSelectOption,
  selectedOptions,
}) => {
  return (
    <div
      style={{
        borderRadius: "14px",
        background: "rgba(15, 23, 42, 0.7)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        padding: "18px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "16px" }}>🎯</span>
        <span style={{ fontSize: "14px", fontWeight: 600, color: "#f8fafc" }}>
          Engineering Decision Crossroads
        </span>
      </div>

      {decisions.map((decision) => {
        const chosenOptionId = selectedOptions[decision.id];
        const chosenOption = decision.options.find((opt) => opt.id === chosenOptionId);

        return (
          <div key={decision.id} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "#e2e8f0",
                lineHeight: "1.4",
              }}
            >
              {decision.question}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {decision.options.map((option) => {
                const isSelected = chosenOptionId === option.id;

                return (
                  <button
                    key={option.id}
                    onClick={() => onSelectOption(decision.id, option)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      textAlign: "left",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      background: isSelected
                        ? option.correct
                          ? "rgba(16, 185, 129, 0.15)"
                          : "rgba(239, 68, 68, 0.12)"
                        : "rgba(30, 41, 59, 0.5)",
                      border: isSelected
                        ? option.correct
                          ? "1.5px solid #10b981"
                          : "1.5px solid #ef4444"
                        : "1px solid rgba(255, 255, 255, 0.08)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        width: "100%",
                      }}
                    >
                      <span
                        style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          border: `1.5px solid ${isSelected ? (option.correct ? "#10b981" : "#ef4444") : "#64748b"}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "10px",
                          color: isSelected ? (option.correct ? "#10b981" : "#ef4444") : "transparent",
                          flexShrink: 0,
                        }}
                      >
                        {isSelected ? "●" : ""}
                      </span>
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: isSelected ? "#f8fafc" : "#cbd5e1",
                        }}
                      >
                        {option.label}
                      </span>
                    </div>

                    {/* Consequence display if selected */}
                    {isSelected && (
                      <div
                        style={{
                          marginTop: "8px",
                          paddingLeft: "26px",
                          fontSize: "12px",
                          color: option.correct ? "#6ee7b7" : "#fca5a5",
                          lineHeight: "1.4",
                        }}
                      >
                        {option.consequence}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
