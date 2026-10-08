import { PlaygroundScenario } from "../../types/playground";

export const dataSyncScenario: PlaygroundScenario = {
  id: "data-sync",
  title: "Data Synchronization Issue",
  category: "data",
  description: "Multiple services return inconsistent information, causing downstream errors.",
  objective: "Identify where the inconsistency is occurring and propose a fix.",
  technologies: ["Node.js", "Express", "PostgreSQL", "Redis"],
  system: [
    {
      id: "frontend",
      label: "Frontend",
      type: "frontend",
      status: "healthy",
      metrics: [{ label: "FPS", value: "60" }],
      connections: ["api"]
    },
    {
      id: "api",
      label: "API Gateway",
      type: "api",
      status: "healthy",
      metrics: [{ label: "Latency", value: "120ms" }],
      connections: ["serviceA", "serviceB"]
    },
    {
      id: "serviceA",
      label: "Service A",
      type: "service",
      status: "healthy",
      metrics: [{ label: "Sync Errors", value: "0" }],
      connections: ["db"]
    },
    {
      id: "serviceB",
      label: "Service B",
      type: "service",
      status: "warning",
      metrics: [{ label: "Sync Errors", value: "47" }],
      connections: ["db"]
    },
    {
      id: "db",
      label: "PostgreSQL DB",
      type: "database",
      status: "healthy",
      metrics: [{ label: "Connections", value: "82%" }],
      connections: []
    }
  ],
  investigationSteps: [
    {
      id: "step-1",
      targetNode: "api",
      evidenceIds: ["e1"],
      nextSteps: ["step-2"]
    },
    {
      id: "step-2",
      targetNode: "serviceB",
      evidenceIds: ["e2"],
      nextSteps: ["step-3"]
    },
    {
      id: "step-3",
      targetNode: "db",
      evidenceIds: ["e3"],
      nextSteps: []
    }
  ],
  evidence: [
    { id: "e1", title: "API response normal", description: "All API endpoints returned expected status codes and latencies." },
    { id: "e2", title: "Service B warning", description: "Service B shows elevated sync error count." },
    { id: "e3", title: "Database healthy", description: "No latency spikes or connection issues observed." }
  ],
  decisions: [
    {
      id: "d1",
      question: "Which component should we inspect next?",
      options: [
        { id: "opt-1", label: "API request lifecycle", consequence: "You check the API logs.", evidenceUnlocked: ["e1"], correct: true },
        { id: "opt-2", label: "Service synchronization", consequence: "You look at service sync metrics.", evidenceUnlocked: ["e2"], correct: true },
        { id: "opt-3", label: "Database queries", consequence: "You examine DB query logs.", evidenceUnlocked: ["e3"], correct: false }
      ]
    }
  ],
  rootCause: { id: "rc1", description: "Stale cache in Service B caused outdated data to be served.", confidence: 92 },
  solution: {
    approach: "Introduce Redis cache invalidation and add periodic health checks.",
    technologies: ["Redis", "Node.js"],
    architectureChanges: ["Add cache layer between Service B and DB", "Add TTL for sync data"],
    result: "Reduced sync errors by 40% and improved latency by 200ms."
  },
  impact: { metric: "Sync error reduction", before: "100%", after: "60%", unit: "%" },
  learningPoints: [
    "Importance of cache invalidation",
    "Monitoring sync health metrics",
    "Coordinated rollout of cache changes"
  ]
};
