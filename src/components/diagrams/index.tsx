import type { CaseStudy } from "@/data/case-studies";
import GenericDiagram from "./GenericDiagram";

/** Resolves a case study's diagram key to its component. */
const CaseStudyDiagram = ({ diagram, description }: { diagram: CaseStudy["diagram"]; description?: string }) => {
  if (!diagram) return null;
  return <GenericDiagram description={description || "Architecture overview diagram."} />;
};

export default CaseStudyDiagram;
