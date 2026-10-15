"use client";

import DiagramFrame, { Arrow, Box, Caption } from "./DiagramFrame";

interface GenericDiagramProps {
  title?: string;
  description: string;
}

const GenericDiagram = ({ title = "System Architecture", description }: GenericDiagramProps) => {
  return (
    <DiagramFrame
      title={title}
      description={description}
      viewBox="0 0 760 160"
    >
      <Box x={20} y={40} w={170} h={80} label="Client / Interface" sub="User & API requests" order={1} />
      <Arrow d="M 190 80 L 280 80" order={2} />
      <Caption x={235} y={72} text="Ingest" />

      <Box x={280} y={40} w={200} h={80} label="Core Engine" sub="Agent logic & processing" accent order={3} />
      <Arrow d="M 480 80 L 570 80" order={4} />
      <Caption x={525} y={72} text="Dispatch" />

      <Box x={570} y={40} w={170} h={80} label="Storage & Services" sub="Database & external tools" order={5} />
    </DiagramFrame>
  );
};

export default GenericDiagram;
