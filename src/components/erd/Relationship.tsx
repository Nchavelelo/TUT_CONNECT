
import React from "react";

interface Point {
  x: number;
  y: number;
}

interface RelationshipProps {
  start: Point;
  end: Point;
  startLabel?: string;
  endLabel?: string;
  startCardinality: "1" | "0..1" | "N" | "0..N";
  endCardinality: "1" | "0..1" | "N" | "0..N";
  curved?: boolean;
}

const Relationship: React.FC<RelationshipProps> = ({ 
  start, end, startLabel, endLabel, curved,
  startCardinality, endCardinality
}) => {
  // Calculate the mid point for the relationship label and curve control point
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;
  
  // For curved lines, calculate control point offset
  const controlPointOffset = curved ? 50 : 0;
  const controlX = midX + (curved ? controlPointOffset : 0);
  const controlY = midY - (curved ? controlPointOffset : 0);
  
  // Calculate path for the line
  const path = curved 
    ? `M${start.x},${start.y} Q${controlX},${controlY} ${end.x},${end.y}`
    : `M${start.x},${start.y} L${end.x},${end.y}`;

  // Calculate angle for proper positioning of cardinality markers
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const angle = Math.atan2(dy, dx);
  
  // Calculate positions for cardinality markers
  const startCardX = start.x + 20 * Math.cos(angle);
  const startCardY = start.y + 20 * Math.sin(angle);
  
  const endCardX = end.x - 20 * Math.cos(angle);
  const endCardY = end.y - 20 * Math.sin(angle);
  
  // Calculate positions for relationship labels
  const startLabelX = start.x + 40 * Math.cos(angle);
  const startLabelY = start.y + 40 * Math.sin(angle);
  
  const endLabelX = end.x - 40 * Math.cos(angle);
  const endLabelY = end.y - 40 * Math.sin(angle);
  
  return (
    <>
      {/* Line connecting the entities */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
        <path
          d={path}
          fill="none"
          stroke="blue"
          strokeWidth="2"
          strokeDasharray={curved ? "" : ""}
        />
      </svg>

      {/* Cardinality markers */}
      <div 
        className="absolute text-sm bg-white px-1 border border-blue-500 rounded-sm font-bold"
        style={{ 
          left: startCardX, 
          top: startCardY,
          transform: 'translate(-50%, -50%)'
        }}
      >
        {startCardinality}
      </div>
      
      <div 
        className="absolute text-sm bg-white px-1 border border-blue-500 rounded-sm font-bold"
        style={{ 
          left: endCardX, 
          top: endCardY,
          transform: 'translate(-50%, -50%)'
        }}
      >
        {endCardinality}
      </div>
      
      {/* Relationship verb labels */}
      {startLabel && (
        <div 
          className="absolute text-xs bg-white px-1"
          style={{ 
            left: startLabelX, 
            top: startLabelY - 10,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {startLabel}
        </div>
      )}
      
      {endLabel && (
        <div 
          className="absolute text-xs bg-white px-1"
          style={{ 
            left: endLabelX, 
            top: endLabelY - 10,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {endLabel}
        </div>
      )}
    </>
  );
};

export default Relationship;
