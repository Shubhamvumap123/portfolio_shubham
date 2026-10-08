import { PlaygroundScenario } from "../../types/playground";

export const databaseBottleneckScenario: PlaygroundScenario = {
  id: "database-bottleneck",
  title: "High-Concurrency DB Connection Exhaustion",
  category: "performance",
  description: "During peak traffic surges, ticket creation API latency spikes to 4,500ms and database connection pools become saturated.",
  objective: "Investigate connection pool queuing, identify missing composite indexes, and deploy connection pooling & caching controls.",
  technologies: ["Node.js", "Express", "MongoDB", "Mongoose", "Redis"],
  system: [
    {
      id: "client",
      label: "React Client Portal",
      type: "frontend",
      status: "healthy",
      metrics: [{ label: "User Session FPS", value: "60" }],
      connections: ["gateway"]
    },
    {
      id: "gateway",
      label: "Express API Gateway",
      type: "api",
      status: "warning",
      metrics: [{ label: "Tail Latency (p99)", value: "1,850ms" }],
      connections: ["ticketWorker", "authService"]
    },
    {
      id: "ticketWorker",
      label: "Ticket Processing Worker",
      type: "service",
      status: "critical",
      metrics: [{ label: "Connection Pool Queue", value: "128 waiting" }],
      connections: ["mongodb", "redis"]
    },
    {
      id: "authService",
      label: "JWT Auth Service",
      type: "service",
      status: "healthy",
      metrics: [{ label: "Token Verify Time", value: "4ms" }],
      connections: ["redis"]
    },
    {
      id: "mongodb",
      label: "MongoDB Primary Cluster",
      type: "database",
      status: "critical",
      metrics: [{ label: "Active Connections", value: "100 / 100" }, { label: "Scan / Doc Ratio", value: "12,500 : 1" }],
      connections: []
    },
    {
      id: "redis",
      label: "Redis Cache Layer",
      type: "database",
      status: "healthy",
      metrics: [{ label: "Hit Ratio", value: "98.4%" }],
      connections: []
    }
  ],
  investigationSteps: [
    {
      id: "step-1",
      targetNode: "gateway",
      evidenceIds: ["e1"],
      nextSteps: ["step-2"]
    },
    {
      id: "step-2",
      targetNode: "ticketWorker",
      evidenceIds: ["e2"],
      nextSteps: ["step-3"]
    },
    {
      id: "step-3",
      targetNode: "mongodb",
      evidenceIds: ["e3"],
      nextSteps: []
    }
  ],
  evidence: [
    {
      id: "e1",
      title: "Gateway HTTP 504 Gateway Timeouts",
      description: "API Gateway logs show elevated HTTP 504 Timeouts under >5,000 QPS load. Request queue depth exceeds 200 items."
    },
    {
      id: "e2",
      title: "Mongoose maxPoolSize Reached",
      description: "Worker logs display 'MongoServerSelectionError: connection pool maxPoolSize=100 reached'. New DB requests are blocking on connection acquisition."
    },
    {
      id: "e3",
      title: "Unindexed COLLSCAN Query Execution Plan",
      description: "MongoDB profiler reveals 'db.tickets.find({ status: \"OPEN\", priority: \"HIGH\" })' is executing a full COLLSCAN over 500,000 documents without an index."
    }
  ],
  decisions: [
    {
      id: "d1",
      question: "Which component is causing the primary bottleneck under load?",
      options: [
        {
          id: "opt-1",
          label: "Express Gateway Routing Overhead",
          consequence: "You scale API Gateway replicas, but latency remains above 4,000ms because backend database queries are still blocking.",
          evidenceUnlocked: ["e1"],
          correct: false
        },
        {
          id: "opt-2",
          label: "Unindexed MongoDB COLLSCAN & Connection Pool Saturation",
          consequence: "You inspect MongoDB query profiler logs and confirm full collection scans are holding DB sockets open for several seconds.",
          evidenceUnlocked: ["e2", "e3"],
          correct: true
        },
        {
          id: "opt-3",
          label: "JWT Token Signing Bottleneck",
          consequence: "JWT Auth Service telemetry shows 4ms token verification times, ruling out auth as the bottleneck.",
          evidenceUnlocked: ["e1"],
          correct: false
        }
      ]
    }
  ],
  rootCause: {
    id: "rc2",
    description: "Missing compound index on { status: 1, priority: 1 } caused queries to perform full 500,000 document COLLSCANs, holding connection pool sockets open and causing pool exhaustion.",
    confidence: 98
  },
  solution: {
    approach: "Create MongoDB compound index on { status: 1, priority: 1, createdAt: -1 }, increase Mongoose maxPoolSize, and cache high-frequency ticket counts in Redis.",
    technologies: ["MongoDB", "Mongoose", "Redis", "Express"],
    architectureChanges: [
      "Add compound index db.tickets.createIndex({ status: 1, priority: 1 })",
      "Configure maxPoolSize: 50 with minPoolSize: 10 and maxIdleTimeMS: 30000",
      "Offload ticket summary aggregates to Redis with 30-second TTL invalidation"
    ],
    result: "Query response time dropped from 4,500ms to 8ms. Connection pool utilization stabilized at 22% under peak load."
  },
  impact: {
    metric: "Latency & Connection Pool Health",
    before: "4,500ms (100% DB Pool)",
    after: "8ms (22% DB Pool)",
    unit: "ms"
  },
  learningPoints: [
    "Always create compound indexes for frequently filtered multi-field queries in MongoDB",
    "Monitor MongoDB COLLSCAN ratio vs index hit ratio under load",
    "Properly size Mongoose connection pools to match database thread capacity"
  ]
};
