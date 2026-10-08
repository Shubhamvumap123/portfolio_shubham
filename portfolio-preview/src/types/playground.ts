export type ScenarioCategory = "api" | "data" | "frontend" | "performance";

export interface PlaygroundScenario {
  id: string;
  title: string;
  category: ScenarioCategory;
  description: string;
  objective: string;
  technologies: string[];
  system: SystemNode[];
  investigationSteps: InvestigationStep[];
  evidence: Evidence[];
  decisions: Decision[];
  rootCause: RootCause;
  solution: Solution;
  impact: Impact;
  learningPoints: string[];
}

export interface SystemNode {
  id: string;
  label: string;
  type: "frontend" | "api" | "service" | "database" | "external";
  status: "healthy" | "warning" | "critical";
  metrics?: { label: string; value: string }[];
  connections: string[]; // ids of connected nodes
}

export interface InvestigationStep {
  id: string;
  targetNode: string; // node id to investigate
  evidenceIds: string[]; // ids of evidence unlocked by this step
  nextSteps: string[]; // ids of following steps
}

export interface Evidence {
  id: string;
  title: string;
  description: string;
}

export interface Decision {
  id: string;
  question: string;
  options: DecisionOption[];
}

export interface DecisionOption {
  id: string;
  label: string;
  consequence: string; // text shown after selection
  evidenceUnlocked?: string[]; // evidence ids unlocked
  correct?: boolean; // optional flag for guidance
}

export interface RootCause {
  id: string;
  description: string;
  confidence: number; // 0-100
}

export interface Solution {
  approach: string;
  technologies: string[];
  architectureChanges: string[];
  result: string;
}

export interface Impact {
  metric: string; // e.g., "Sync error reduction"
  before: string;
  after: string;
  unit?: string;
}
