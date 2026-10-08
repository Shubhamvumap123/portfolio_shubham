import { dataSyncScenario } from "./data-sync";
import { databaseBottleneckScenario } from "./database-bottleneck";
import { PlaygroundScenario } from "../../types/playground";

export const allScenarios: PlaygroundScenario[] = [
  dataSyncScenario,
  databaseBottleneckScenario
];

export function getScenarioById(id: string): PlaygroundScenario | undefined {
  return allScenarios.find((scenario) => scenario.id === id);
}
