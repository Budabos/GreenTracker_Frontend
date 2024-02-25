import React, { useState, useEffect } from 'react';

const Carbon = () => {
    // State variables to manage form data and carbon footprints
    const [formData, setFormData] = useState({
        user_id: '',
        carbon_value: '',
        date: ''
    });
    const [footprints, setFootprints] = useState([]);

    // Event handler for form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Event handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://your-api-url/carbon-footprint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                console.log('Carbon footprint count created successfully');
                // Refresh footprint list
                fetchFootprints();
            } else {
                console.error('An error occurred while creating carbon footprint count');
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Function to fetch carbon footprints from the API
    const fetchFootprints = async () => {
        try {
            const response = await fetch('http://your-api-url/carbon-footprint');
            if (response.ok) {
                const data = await response.json();
                setFootprints(data);
            } else {
                console.error('An error occurred while fetching carbon footprints');
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Fetch carbon footprints when the component mounts
    useEffect(() => {
        fetchFootprints();
    }, []);

    // JSX structure with Tailwind CSS classes for styling
    return (
        <div className="container mx-auto p-4">
            {/* Title */}
            <h1 className="text-3xl font-bold mb-4">Carbon Footprint Tracker</h1>
            {/* Carbon footprint form */}
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="flex flex-col mb-4">
                    <label htmlFor="user_id" className="mb-2">User ID</label>
                    <input type="number" name="user_id" value={formData.user_id} onChange={handleChange} className="border border-gray-300 rounded p-2" placeholder="User ID" required />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="carbon_value" className="mb-2">Carbon Value</label>
                    <input type="text" name="carbon_value" value={formData.carbon_value} onChange={handleChange} className="border border-gray-300 rounded p-2" placeholder="Carbon Value" required />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="date" className="mb-2">Date</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} className="border border-gray-300 rounded p-2" placeholder="Date" />
                </div>
                <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">Submit</button>
            </form>
            {/* List of carbon footprints */}
            <h2 className="text-2xl font-bold mb-2">Carbon Footprints</h2>
            <ul className="list-disc list-inside">
                {footprints.map((footprint) => (
                    <li key={footprint.id} className="mb-2">User ID: {footprint.user_id}, Carbon Value: {footprint.carbon_value}, Date: {footprint.date}</li>
                ))}
            </ul>
        </div>
    );
};

export default Carbon;
