import React, { useState, useEffect } from "react";


const apiKey = "KYhhJrQclnJmPFzA4BEgZA	";

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
                "Authorization": `Bearer ${apiKey}`
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
        className="block font-medium text-slate-950
        mb-2"
        style={{ paddingTop: "20px" }}
      >
        Select Vehicle Make:
      </label>
      <select
        id="makeSelect"
        value={selectedMakeId}
        onChange={handleMakeChange}
        className="block w-full  text-slate-950 px-4 py-2 border rounded-md shadow-sm"
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