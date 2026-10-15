/**
 * Initialize and register all portfolio tools
 */

import { toolRegistry } from "./tool-registry";
import { contextAwareToolRegistry } from "./context-aware-tool-registry";
// Concrete tools are ported in Task 4.2
// Stubs allow initializeAllTools() to execute cleanly with zero tools

/**
 * Initialize all data access tools and register them (ported in Task 4.2)
 */
export function initializeDataAccessTools(): void {
  // Concrete data access tools registered in Task 4.2
}

/**
 * Initialize all navigation tools and register them (ported in Task 4.2)
 */
export function initializeNavigationTools(): void {
  // Concrete navigation tools registered in Task 4.2
}

/**
 * Initialize all UI control tools and register them (ported in Task 4.2)
 */
export function initializeUIControlTools(): void {
  // Concrete UI control tools registered in Task 4.2
}

/**
 * Initialize all portfolio tools
 */
export function initializeAllTools(): void {
  // Clear existing tools
  toolRegistry.clearExecutionHistory();
  toolRegistry.clearAllTools();
  contextAwareToolRegistry.clearAllTools();

  // Initialize data access tools
  initializeDataAccessTools();

  // Initialize navigation tools
  initializeNavigationTools();

  // Initialize UI control tools
  initializeUIControlTools();

  console.log(
    `✅ Initialized ${
      toolRegistry.getAll().length
    } portfolio tools with contextual awareness`
  );
}

/**
 * Get initialization status
 */
export function getToolInitializationStatus(): {
  isInitialized: boolean;
  toolCount: number;
  toolNames: string[];
} {
  const tools = toolRegistry.getAll();
  return {
    isInitialized: tools.length > 0,
    toolCount: tools.length,
    toolNames: tools.map((tool) => tool.name),
  };
}
