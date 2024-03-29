import React, { useState } from "react";
import { API_KEY } from "@/lib/utils";

const EstimateForm = ({ model }) => {
  const [distanceUnit, setDistanceUnit] = useState("mi");
  const [distanceValue, setDistanceValue] = useState(100);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [estimateData, setEstimateData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://www.carboninterface.com/api/v1/estimates",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            type: "vehicle",
            distance_unit: distanceUnit,
            distance_value: parseFloat(distanceValue),
            vehicle_model_id: model,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setEstimateData(data.data.attributes); // Accessing nested attributes
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Vehicle Model Select */}
      <div className="mb-4"></div>

      {/* Estimate Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="distanceUnit"
            className="block font-medium text-gray-700"
            style={{ color: "#ffff" }}
          >
            Distance Unit:
          </label>
          <select
            id="distanceUnit"
            value={distanceUnit}
            onChange={(e) => setDistanceUnit(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-opacity-50"
          >
            <option value="km">km</option>
            <option value="mi">mi</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="distanceValue"
            className="block font-medium text-gray-700"
            style={{ color: "#ffff" }}
          >
            Distance Value:
          </label>
          <input
            type="number"
            id="distanceValue"
            value={distanceValue}
            onChange={(e) => setDistanceValue(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          className=" bg-[#245501] text-white py-2 px-4 rounded-md hover:bg-gray-800  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Get Estimate
        </button>
      </form>

      {/* Loading and Error Messages */}
      {loading && <p style={{ color: "#ffff" }}>Loading estimate data...</p>}
      {error && <p style={{ color: "#ffff" }}>Error Loading Vehicle {error}</p>}

      {/* Estimate Data */}
      {estimateData && (
        <div className="space-y-2" style={{ color: "#ffff" }}>
          <h2 className="text-lg font-medium">Estimate Data</h2>
          <p>Distance Value: {estimateData.distance_value}</p>
          <p>Vehicle Make: {estimateData.vehicle_make}</p>
          <p>Vehicle Model: {estimateData.vehicle_model}</p>
          {/* <p>Vehicle Year: {estimateData.vehicle_year}</p> */}
          <p>Distance Unit: {estimateData.distance_unit}</p>
          <p>Estimated At: {estimateData.estimated_at}</p>
          <p>Carbon (grams): {estimateData.carbon_g} g</p>
          <p>Carbon (pounds): {estimateData.carbon_lb} lb</p>
          <p>Carbon (kilograms)): {estimateData.carbon_kg} kg</p>
          <p>Carbon (metric tons): {estimateData.carbon_mt} mt</p>
        </div>
      )}
    </div>
  );
};

export default EstimateForm;
