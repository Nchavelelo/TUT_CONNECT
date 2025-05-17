
import React from "react";

interface EntityBoxProps {
  title: string;
  fields: string[];
  x: number;
  y: number;
}

const EntityBox: React.FC<EntityBoxProps> = ({ title, fields, x, y }) => {
  return (
    <div className="absolute border-2 border-blue-400 rounded-md bg-white shadow-md w-[200px]"
      style={{ left: x, top: y }}>
      <div className="bg-blue-400 text-white font-bold p-2">
        {title}
      </div>
      <div className="text-sm p-2">
        {fields.map((field, i) => (
          <div key={i} className="py-1 border-b border-gray-100 last:border-0">
            {field.includes("(FK)") ? (
              <span className="text-blue-600">{field}</span>
            ) : field.includes("(PK)") ? (
              <span className="text-red-600 font-bold">{field}</span>
            ) : (
              field
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EntityBox;
