import React, { useState } from "react";

const Donation = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [customCause, setCustomCause] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setCustomCause(""); // Reset custom cause when an option is selected from the dropdown
  };

  const handleCustomCauseChange = (event) => {
    setCustomCause(event.target.value);
    setSelectedOption(""); // Reset selected option when custom cause is entered
  };

  return (
    <div className="min-h-screen flex">
      {/* Image Section */}
      <div className="relative flex-1">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://cdn.pixabay.com/photo/2021/08/01/08/01/ecology-6513805_640.jpg")',
            filter: "brightness(0.6)", // Adjust the value to make it darker (0.7 is just an example)
          }}
        ></div>
        <div className="p-12 text-white flex items-center justify-center h-full relative z-10">
          <div className="max-w-md text-center">
            <h2 className="text-3xl font-bold mb-4">GreenTrackr Donations</h2>
            <p className="text-lg">Donate to a cause</p>
            {/* Longer statement emphasizing the importance of donating */}
            <p className="text-sm text-gray-300 mt-2">
              Making a donation is more than just giving money; it's about
              making a positive impact on the world around us. By donating to a
              cause, you're contributing to the greater good and helping those
              in need. Make a difference today!
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 p-12 flex items-center justify-center">
        <div className="max-w-md">
          <h2 className="text-3xl font-bold mb-8">Make a Donation</h2>
          {/* Your donation form here */}
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="purpose"
              >
                Purpose
              </label>
              <div className="relative">
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="purpose"
                  required // Form validation suggestion
                  value={selectedOption}
                  onChange={handleSelectChange}
                  disabled={!!customCause}
                >
                  <option value="" disabled>
                    Select or Type a Cause
                  </option>
                  <option value="environment">
                    Environmental Conservation
                  </option>
                  <option value="education">Education for All</option>
                  <option value="health">Healthcare Support</option>
                  <option value="poverty">Poverty Alleviation</option>
                  <option value="animal">Animal Welfare</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 5.293a1 1 0 011.414 0L10 9.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="customPurpose"
              >
                Or Enter Custom Cause
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  selectedOption && "cursor-not-allowed"
                }`}
                id="customPurpose"
                type="text"
                placeholder="Custom Cause"
                value={customCause}
                onChange={handleCustomCauseChange}
                disabled={!!selectedOption}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="amount"
                type="number"
              >
                Amount
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="amount"
                type="text"
                placeholder="Amount"
                required // Form validation suggestion
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="date"
              >
                Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="date"
                type="date"
                placeholder="Date"
                required // Form validation suggestion
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Donate Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Donation;
