
import React from "react";

const ERDLegend: React.FC = () => {
  return (
    <div className="mt-4 text-sm text-gray-700 p-3 bg-gray-50 rounded-md border border-gray-200">
      <p className="font-bold mb-1">Legend:</p>
      <div className="flex flex-wrap gap-4">
        <div>
          <span className="text-red-600 font-bold">PK</span> - Primary Key
        </div>
        <div>
          <span className="text-blue-600">FK</span> - Foreign Key
        </div>
        <div>
          <span className="font-bold">1</span> - One
        </div>
        <div>
          <span className="font-bold">N</span> - Many
        </div>
        <div>
          <span className="font-bold">0..1</span> - Zero or One
        </div>
        <div>
          <span className="font-bold">0..N</span> - Zero to Many
        </div>
      </div>
    </div>
  );
};

export default ERDLegend;
