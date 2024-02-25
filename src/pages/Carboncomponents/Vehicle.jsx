import React, { useState } from "react";
import VehicleMakeSelect from "./VehicleMakeSelect";
import VehicleModelSelect from "./VehicleModelSelect";
import EstimateForm from "./EstimateForm";

const Vehicle = () => {
  const [selectedMakeId, setSelectedMakeId] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);

  const handleMakeSelect = (makeId) => {
    setSelectedMakeId(makeId);
    setSelectedModel(null); // Reset selected model when make changes
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
  };

  return (
    <div>
      <h2>Vehicle Information</h2>
      <VehicleMakeSelect onSelect={handleMakeSelect} />
      {selectedMakeId && (
        <VehicleModelSelect
          makeId={selectedMakeId}
          onSelect={handleModelSelect}
        />
      )}
      {selectedModel && <EstimateForm model={selectedModel} />}
    </div>
  );
};

export default Vehicle;
