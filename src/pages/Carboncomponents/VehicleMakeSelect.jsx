import React, { useState, useEffect } from "react";
import { API_KEY } from "@/lib/utils";

const VehicleMakeSelect = ({ onSelect }) => {
  const [vehicleMakes, setVehicleMakes] = useState([]);
  const [selectedMakeId, setSelectedMakeId] = useState("");

  useEffect(() => {
    const fetchVehicleMakes = async () => {
      try {
        const response = await fetch(
          "https://www.carboninterface.com/api/v1/vehicle_makes",
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
        setVehicleMakes(data);
      } catch (error) {
        console.error("Error fetching vehicle makes:", error);
      }
    };

    fetchVehicleMakes();
  }, []);

  const handleMakeChange = (e) => {
    const makeId = e.target.value;
    setSelectedMakeId(makeId);
    onSelect(makeId); // Pass the make ID to the onSelect callback
  };

  return (
    <div>
      <label htmlFor="makeSelect">Select Vehicle Make:</label>
      <select
        id="makeSelect"
        value={selectedMakeId}
        onChange={handleMakeChange}
      >
        <option value="">Select Vehicle Make</option>
        {vehicleMakes.map((make) => (
          <option key={make.data.id} value={make.data.id}>
            {make.data.attributes.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VehicleMakeSelect;
