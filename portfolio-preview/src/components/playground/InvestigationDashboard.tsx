"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PlaygroundScenario, DecisionOption } from "../../types/playground";
import { SystemMap } from "./SystemMap";
import { NodeInspector } from "./NodeInspector";
import { EvidenceDrawer } from "./EvidenceDrawer";
import { DecisionPanel } from "./DecisionPanel";
import { RootCauseReveal } from "./RootCauseReveal";

interface InvestigationDashboardProps {
  scenario: PlaygroundScenario;
}

export const InvestigationDashboard: React.FC<InvestigationDashboardProps> = ({ scenario }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>("serviceB");
  const [inspectedNodeIds, setInspectedNodeIds] = useState<string[]>([]);
  const [unlockedEvidenceIds, setUnlockedEvidenceIds] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [isResolved, setIsResolved] = useState<boolean>(false);

  // When user inspects a node
  const handleInspectNode = (nodeId: string) => {
    if (!inspectedNodeIds.includes(nodeId)) {
      setInspectedNodeIds((prev) => [...prev, nodeId]);
    }

    // Find if this node corresponds to an investigation step unlocking evidence
    const matchingStep = scenario.investigationSteps.find((step) => step.targetNode === nodeId);
    if (matchingStep) {
      setUnlockedEvidenceIds((prev) => {
        const newIds = matchingStep.evidenceIds.filter((id) => !prev.includes(id));
        return [...prev, ...newIds];
      });
    }
  };

  // When user chooses an option in DecisionPanel
  const handleSelectOption = (decisionId: string, option: DecisionOption) => {
    setSelectedOptions((prev) => ({ ...prev, [decisionId]: option.id }));

    if (option.evidenceUnlocked) {
      setUnlockedEvidenceIds((prev) => {
        const newIds = (option.evidenceUnlocked || []).filter((id) => !prev.includes(id));
        return [...prev, ...newIds];
      });
    }

    if (option.correct) {
      // Mark as resolved
      setIsResolved(true);
    }
  };

  const handleReset = () => {
    setSelectedNodeId("serviceB");
    setInspectedNodeIds([]);
    setUnlockedEvidenceIds([]);
    setSelectedOptions({});
    setIsResolved(false);
  };

  const selectedNode = scenario.system.find((n) => n.id === selectedNodeId) || null;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        padding: "0 16px 64px 16px",
      }}
    >
      {/* Top Navigation & Breadcrumbs */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Link
            href="/playground"
            style={{
              fontSize: "13px",
              color: "#38bdf8",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span>←</span> Scenarios
          </Link>
          <span style={{ color: "rgba(255, 255, 255, 0.2)" }}>/</span>
          <span style={{ fontSize: "13px", color: "#94a3b8" }}>{scenario.title}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              fontWeight: 600,
              padding: "4px 12px",
              borderRadius: "20px",
              backgroundColor: isResolved ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
              color: isResolved ? "#34d399" : "#fbbf24",
              border: `1px solid ${isResolved ? "rgba(16, 185, 129, 0.4)" : "rgba(245, 158, 11, 0.4)"}`,
            }}
          >
            <span style={{ fontSize: "8px" }}>●</span>
            {isResolved ? "Incident Resolved" : "Active Incident Investigation"}
          </span>

          <button
            onClick={handleReset}
            style={{
              background: "none",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "8px",
              padding: "4px 10px",
              color: "#94a3b8",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            ↻ Reset
          </button>
        </div>
      </div>

      {/* Incident Briefing Banner */}
      <div
        style={{
          borderRadius: "16px",
          background: "linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          padding: "20px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", padding: "2px 8px", borderRadius: "6px", background: "rgba(56, 189, 248, 0.15)", color: "#38bdf8" }}>
                Scenario: {scenario.category.toUpperCase()}
              </span>
              <h1 style={{ fontSize: "20px", fontWeight: 700, color: "#f8fafc", margin: 0 }}>
                {scenario.title}
              </h1>
            </div>
            <p style={{ fontSize: "14px", color: "#cbd5e1", margin: 0, lineHeight: "1.5" }}>
              {scenario.description}
            </p>
          </div>

          {/* Tech Stack Pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {scenario.technologies.map((tech) => (
              <span
                key={tech}
                style={{
                  fontSize: "11px",
                  padding: "3px 8px",
                  borderRadius: "6px",
                  background: "rgba(255, 255, 255, 0.05)",
                  color: "#94a3b8",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 14px",
            borderRadius: "8px",
            background: "rgba(56, 189, 248, 0.08)",
            border: "1px solid rgba(56, 189, 248, 0.2)",
            fontSize: "13px",
            color: "#e0f2fe",
          }}
        >
          <span style={{ fontSize: "16px" }}>🎯</span>
          <span>
            <strong>Investigation Objective:</strong> {scenario.objective}
          </span>
        </div>
      </div>

      {/* Main Investigation Canvas: System Topology Map */}
      <SystemMap
        nodes={scenario.system}
        selectedNodeId={selectedNodeId}
        onSelectNode={(id) => setSelectedNodeId(id)}
        inspectedNodeIds={inspectedNodeIds}
      />

      {/* Diagnostic & Evidence Inspection Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
        {/* Selected Node Telemetry & Diagnostic Inspector */}
        <NodeInspector
          node={selectedNode}
          onInspectNode={handleInspectNode}
          isInspected={selectedNode ? inspectedNodeIds.includes(selectedNode.id) : false}
          onClose={() => setSelectedNodeId(null)}
        />

        {/* Evidence Discovered Drawer */}
        <EvidenceDrawer
          evidenceList={scenario.evidence}
          unlockedEvidenceIds={unlockedEvidenceIds}
        />
      </div>

      {/* Decision Crossroads Panel */}
      <DecisionPanel
        decisions={scenario.decisions}
        onSelectOption={handleSelectOption}
        selectedOptions={selectedOptions}
      />

      {/* Root Cause & Resolution Panel (Reveals when resolved) */}
      {isResolved && (
        <RootCauseReveal
          rootCause={scenario.rootCause}
          solution={scenario.solution}
          impact={scenario.impact}
          learningPoints={scenario.learningPoints}
          onReset={handleReset}
        />
      )}
    </div>
  );
};
