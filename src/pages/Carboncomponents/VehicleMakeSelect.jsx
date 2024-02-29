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
      <label
        htmlFor="makeSelect"
        className="block font-medium text-gray-700 mb-2"
        style={{ paddingTop: "20px", color: "#ffff" }}
      >
        Select Vehicle Make:
      </label>
      <select
        id="makeSelect"
        value={selectedMakeId}
        onChange={handleMakeChange}
        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-opacity-50"
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
