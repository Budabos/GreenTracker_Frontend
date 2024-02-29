import React, { useState, useEffect } from "react";
const apiKey = "KYhhJrQclnJmPFzA4BEgZA	";

const Shipping = ({handleShippingData}) => {
  // State to store the carbon estimate data
  // const [carbonEstimate, setCarbonEstimate] = useState(null);
  // State to store input values
  const [inputValues, setInputValues] = useState({
    type:"",
    weightValue: "",
    weightUnit: "g",
    distanceValue: "",
    distanceUnit: "km",
    transportMethod: "truck", // Default transport method
  });

  // Function to fetch carbon estimate data from the API
  const fetchCarbonEstimate = async () => {
    const url = "https://www.carboninterface.com/api/v1/estimates";

    // Data to be sent in the POST request, including input values from state
    const data = {
      type: "shipping",
      weight_value: inputValues.weightValue,
      weight_unit: inputValues.weightUnit,
      distance_value: inputValues.distanceValue,
      distance_unit: inputValues.distanceUnit,
      transport_method: inputValues.transportMethod,
    };


    // Options for the POST request
    const options = {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      // Fetch data from the API
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result.data.attributes.carbon_g)
      console.log(result.data.type)

      handleShippingData(result,"Shipping"); 
    } catch (error) {
      console.error("Error:", error);
     
    }
  };

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchCarbonEstimate();
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  // Function to handle changes in input values
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    fetchCarbonEstimate(); // Fetch carbon estimate data
  };

  return (
    <div className="p-4 rounded-md">
      <form onSubmit={handleSubmit}>

        <div className="mb-4">
       
          <label
            htmlFor="weightValue"
            className="block text-white-800 font-semibold mb-2"
            style={{ color: "#ffff" }}
          >
            Weight
          </label>
          <input
            type="number"
            id="weightValue"
            name="weightValue"
            value={inputValues.weightValue}
            onChange={handleInputChange}
            className="px-3 py-2 border  text-blue-600 border-green-500 rounded-md focus:outline-none focus:border-green-700 w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="weightUnit"
            className="block text-white-800 font-semibold mb-2"
            style={{ color: "#ffff" }}
          >
            Weight Unit
          </label>
          <select
            id="weightUnit"
            name="weightUnit"
            value={inputValues.weightUnit}
            onChange={handleInputChange}
            className="px-3 py-2 border  text-blue-600 border-green-500 rounded-md focus:outline-none focus:border-green-700 w-full"
          >
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="lb">lb</option>
            <option value="mt">mt</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="distanceValue"
            className="block text-white-800 font-semibold mb-2"
            style={{ color: "#ffff" }}
          >
            Distance
          </label>
          <input
            type="number"
            id="distanceValue"
            name="distanceValue"
            value={inputValues.distanceValue}
            onChange={handleInputChange}
            className="px-3 py-2  text-blue-600 border border-green-500 rounded-md focus:outline-none focus:border-green-700 w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="distanceUnit"
            className="block text-white-800 font-semibold mb-2"
            style={{ color: "#ffff" }}
          >
            Distance Unit
          </label>
          <select
            id="distanceUnit"
            name="distanceUnit"
            value={inputValues.distanceUnit}
            onChange={handleInputChange}
            className="px-3 py-2 border  text-blue-600 border-green-500 rounded-md focus:outline-none focus:border-green-700 w-full"
          >
            <option value="km">km</option>
            <option value="mi">mi</option>
          </select>
        </div>

        {/* Transport Method selection */}
        <div className="mb-4">
          <label
            htmlFor="transportMethod"
            className="block text-white-800 font-semibold mb-2"
            style={{ color: "#ffff" }}
          >
            Means of Transport
          </label>
          <input
            type="text"
            id="transportMethod"
            name="transportMethod"
            value={inputValues.transportMethod}
            onChange={handleInputChange}
            className="px-3 py-2 border  text-blue-600 border-green-500 rounded-md focus:outline-none focus:border-green-700 w-full"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-[#245501] text-white px-4 py-2 rounded-md"
        >
          Calculate Carbon Estimate
        </button>
      </form>

   
    
    </div>
  );
};

export default Shipping;