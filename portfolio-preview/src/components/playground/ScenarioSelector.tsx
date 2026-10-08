"use client";

import React from "react";
import Link from "next/link";
import { allScenarios } from "../../data/scenarios";

export default function ScenarioSelector() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "24px",
        width: "100%",
        maxWidth: "1050px",
        margin: "0 auto",
      }}
    >
      {allScenarios.map((scenario) => (
        <div
          key={scenario.id}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: "16px",
            background: "linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            padding: "24px",
            boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
            transition: "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle top glow line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: "linear-gradient(90deg, transparent, #38bdf8, transparent)",
            }}
          />

          <div>
            {/* Header: Category Badge & System Node Count */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  padding: "4px 10px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(56, 189, 248, 0.15)",
                  color: "#38bdf8",
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                  letterSpacing: "0.05em",
                }}
              >
                {scenario.category} Architecture
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "#94a3b8",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span style={{ color: "#10b981" }}>●</span> {scenario.system.length} Nodes
              </span>
            </div>

            {/* Title */}
            <h3
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#f8fafc",
                marginBottom: "10px",
                lineHeight: "1.3",
              }}
            >
              {scenario.title}
            </h3>

            {/* Description */}
            <p
              style={{
                fontSize: "14px",
                color: "#94a3b8",
                lineHeight: "1.6",
                marginBottom: "18px",
              }}
            >
              {scenario.description}
            </p>

            {/* Tech Stack Chips */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                marginBottom: "24px",
              }}
            >
              {scenario.technologies.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontSize: "11px",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    background: "rgba(255, 255, 255, 0.05)",
                    color: "#cbd5e1",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Link Button */}
          <Link
            href={`/playground/${scenario.id}`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "100%",
              padding: "12px 20px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
              color: "#ffffff",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 600,
              boxShadow: "0 4px 14px rgba(14, 165, 233, 0.3)",
              transition: "opacity 0.2s ease, transform 0.2s ease",
            }}
          >
            <span>Launch Live Investigation</span>
            <span>→</span>
          </Link>
        </div>
      ))}
    </div>
  );
}
