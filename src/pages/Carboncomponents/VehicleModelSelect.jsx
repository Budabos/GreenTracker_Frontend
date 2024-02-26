import React, { useState, useEffect } from "react";
import { API_KEY } from "@/lib/utils";

const VehicleModelSelect = ({ makeId, onSelect }) => {
  const [vehicleModels, setVehicleModels] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState("");

  useEffect(() => {
    if (makeId) {
      const fetchVehicleModels = async () => {
        try {
          const response = await fetch(
            `https://www.carboninterface.com/api/v1/vehicle_makes/${makeId}/vehicle_models`,
            {
              headers: {
                Authorization: `Bearer ${API_KEY}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          const data = await response.json();
          setVehicleModels(data);
        } catch (error) {
          console.error("Error fetching vehicle models:", error);
        }
      };

      fetchVehicleModels();
    }
  }, [makeId]);

  const handleModelChange = (e) => {
    // store id in this variable
    const modelId = e.target.value;
    setSelectedModelId(modelId);

    // pass the model id here when one selects the car make
    onSelect(modelId);
  };

  return (
    <div>
      <label htmlFor="modelSelect">Select Vehicle Model:</label>
      <select
        id="modelSelect"
        value={selectedModelId}
        onChange={handleModelChange}
      >
        <option value="">Select Vehicle Model</option>
        {vehicleModels.map((model) => (
          <option key={model.data.id} value={model.data.id}>
            {model.data.attributes.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VehicleModelSelect;
