import React from "react";
import Link from "next/link";
import { getScenarioById, allScenarios } from "../../../data/scenarios";
import { InvestigationDashboard } from "../../../components/playground/InvestigationDashboard";

interface PageProps {
  params: Promise<{
    scenarioId: string;
  }>;
}

export async function generateStaticParams() {
  return allScenarios.map((scenario) => ({
    scenarioId: scenario.id,
  }));
}

export default async function ScenarioDetailPage({ params }: PageProps) {
  const { scenarioId } = await params;
  const scenario = getScenarioById(scenarioId);

  if (!scenario) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <div style={{ fontSize: "40px" }}>🔍</div>
        <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#f8fafc" }}>
          Scenario Not Found
        </h2>
        <p style={{ color: "#94a3b8", maxWidth: "400px" }}>
          The engineering scenario &quot;{scenarioId}&quot; could not be found or has not been loaded.
        </p>
        <Link
          href="/playground"
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            background: "#0ea5e9",
            color: "#ffffff",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "14px",
          }}
        >
          Return to Playground
        </Link>
      </div>
    );
  }

  return (
    <main style={{ minHeight: "100vh", paddingTop: "24px" }}>
      <InvestigationDashboard scenario={scenario} />
    </main>
  );
}
