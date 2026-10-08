import React from "react";
import ScenarioSelector from "../../components/playground/ScenarioSelector";

export const metadata = {
  title: "Engineering Playground | System Investigations",
  description:
    "Interactive engineering incident simulator: investigate distributed system anomalies, trace telemetry, and make architectural decisions.",
};

export default function PlaygroundPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 20px 80px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Header Container */}
      <div
        style={{
          maxWidth: "800px",
          textAlign: "center",
          marginBottom: "48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "4px 12px",
            borderRadius: "20px",
            background: "rgba(14, 165, 233, 0.12)",
            border: "1px solid rgba(14, 165, 233, 0.3)",
            color: "#38bdf8",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          <span>🧪</span> Live Technical Simulator
        </div>

        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 46px)",
            fontWeight: 800,
            color: "#f8fafc",
            margin: 0,
            letterSpacing: "-0.02em",
            lineHeight: "1.15",
          }}
        >
          Engineering Playground
        </h1>

        <p
          style={{
            fontSize: "16px",
            color: "#94a3b8",
            lineHeight: "1.6",
            maxWidth: "640px",
            margin: 0,
          }}
        >
          Don’t just read what I built. <strong>Investigate it.</strong> Step into real-world production incidents, inspect microservice health metrics, trace evidence, and test your engineering decisions.
        </p>
      </div>

      {/* Scenarios Grid */}
      <ScenarioSelector />
    </main>
  );
}
