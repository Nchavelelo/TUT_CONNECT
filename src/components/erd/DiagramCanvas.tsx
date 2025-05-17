
import React from "react";
import EntityBox from "./EntityBox";
import Relationship from "./Relationship";
import { entities, relationships } from "./ERData";

const DiagramCanvas: React.FC = () => {
  return (
    <div className="w-full overflow-auto bg-white p-4 rounded-lg border border-gray-200">
      <div className="min-w-[1000px] h-[650px] relative">
        {/* Render all entities */}
        {entities.map((entity, index) => (
          <EntityBox 
            key={index}
            title={entity.title}
            fields={entity.fields}
            x={entity.x}
            y={entity.y}
          />
        ))}
        
        {/* Render all relationships */}
        {relationships.map((rel, index) => (
          <Relationship
            key={index}
            start={rel.start}
            end={rel.end}
            startCardinality={rel.startCardinality}
            endCardinality={rel.endCardinality}
            startLabel={rel.startLabel}
            endLabel={rel.endLabel}
            curved={rel.curved}
          />
        ))}
      </div>
    </div>
  );
};

export default DiagramCanvas;
