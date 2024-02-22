import React, { useState, useEffect } from 'react';

const CarbonEstimate = () => {
    // State to store the carbon estimate data
    const [carbonEstimate, setCarbonEstimate] = useState(null);
    // State to store input values
    const [inputValues, setInputValues] = useState({
        weightValue: 200,
        distanceValue: 2000
    });

    // Function to fetch carbon estimate data from the API
    const fetchCarbonEstimate = async () => {
        const API_KEY = 'YOUR_API_KEY'; // Replace 'YOUR_API_KEY' with your actual API key
        const url = 'https://www.carboninterface.com/api/v1/estimates';

        // Data to be sent in the POST request, including input values from state
        const data = {
            type: 'shipping',
            weight_value: inputValues.weightValue,
            weight_unit: 'g',
            distance_value: inputValues.distanceValue,
            distance_unit: 'km',
            transport_method: 'truck'
        };

        // Options for the POST request
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        try {
            // Fetch data from the API
            const response = await fetch(url, options);
            const result = await response.json();
            setCarbonEstimate(result); // Update state with the fetched data
        } catch (error) {
            console.error('Error:', error);
            // Handle errors
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
            [name]: value
        });
    };

    return (
        <div className="bg-green-100 p-4 rounded-md">
            {/* Title */}
            <h1 className="text-green-800 text-2xl font-bold mb-4">Carbon Estimate</h1>

            {/* Input fields */}
            <div className="mb-4">
                <label htmlFor="weightValue" className="block text-green-800 font-semibold mb-2">Weight (g)</label>
                <input
                    type="number"
                    id="weightValue"
                    name="weightValue"
                    value={inputValues.weightValue}
                    onChange={handleInputChange}
                    className="px-3 py-2 border border-green-500 rounded-md focus:outline-none focus:border-green-700 w-full"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="distanceValue" className="block text-green-800 font-semibold mb-2">Distance (km)</label>
                <input
                    type="number"
                    id="distanceValue"
                    name="distanceValue"
                    value={inputValues.distanceValue}
                    onChange={handleInputChange}
                    className="px-3 py-2 border border-green-500 rounded-md focus:outline-none focus:border-green-700 w-full"
                />
            </div>

            {/* Carbon estimate result */}
            {carbonEstimate && (
                <div>
                    <p className="text-green-700">Carbon footprint: {carbonEstimate.carbon_kg} kg</p>
                    {/* Display additional data as needed */}
                </div>
            )}
        </div>
    );
};

export default CarbonEstimate;
