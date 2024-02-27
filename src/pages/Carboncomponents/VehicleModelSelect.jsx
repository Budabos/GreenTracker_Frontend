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
    const modelId = e.target.value;
    setSelectedModelId(modelId);
    onSelect(modelId);
  };

  return (
    <div>
      <label
        htmlFor="modelSelect"
        className="block font-medium text-gray-700 mb-2"
        style={{ paddingTop: "10px", color: "#ffff" }}
      >
        Select Vehicle Model:
      </label>
      <select
        id="modelSelect"
        value={selectedModelId}
        onChange={handleModelChange}
        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-opacity-50"
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
