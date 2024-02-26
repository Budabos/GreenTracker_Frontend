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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="distanceUnit">Distance Unit:</label>
          <input
            type="text"
            id="distanceUnit"
            value={distanceUnit}
            onChange={(e) => setDistanceUnit(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="distanceValue">Distance Value:</label>
          <input
            type="number"
            id="distanceValue"
            value={distanceValue}
            onChange={(e) => setDistanceValue(e.target.value)}
          />
        </div>
        <button type="submit">Get Estimate</button>
      </form>
      {loading && <p>Loading estimate data...</p>}
      {error && <p>Error Loading Vehicle {error}</p>}
      {estimateData && (
        <div>
          <h2>Estimate Data</h2>
          <p>Distance Value: {estimateData.distance_value}</p>
          <p>Vehicle Make: {estimateData.vehicle_make}</p>
          <p>Vehicle Model: {estimateData.vehicle_model}</p>
          {/* <p>Vehicle Year: {estimateData.vehicle_year}</p> */}
          <p>Distance Unit: {estimateData.distance_unit}</p>
          <p>Estimated At: {estimateData.estimated_at}</p>
          <p>Carbon (g): {estimateData.carbon_g}</p>
          <p>Carbon (lb): {estimateData.carbon_lb}</p>
          <p>Carbon (kg): {estimateData.carbon_kg}</p>
          <p>Carbon (mt): {estimateData.carbon_mt}</p>
        </div>
      )}
    </div>
  );
};

export default EstimateForm;
