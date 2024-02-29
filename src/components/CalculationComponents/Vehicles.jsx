
import React, { useState } from "react";
import VehicleMakeSelect from "./Vehiclecomponents/VehicleMakeSelect";
import VehicleModelSelect from "./Vehiclecomponents/VehicleModelSelect";
import EstimateForm from "./Vehiclecomponents/EstimateForm";

const Vehicles = ({handleVehicleData}) => {
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
      
      <VehicleMakeSelect onSelect={handleMakeSelect} />
      {selectedMakeId && (
        <VehicleModelSelect
          makeId={selectedMakeId}
          onSelect={handleModelSelect}
        />
      )}
      {selectedModel && <EstimateForm model={selectedModel} handleVehicleData={handleVehicleData} />}
    </div>
  );
};

export default Vehicles;