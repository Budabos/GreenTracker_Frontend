import React, { useState } from "react";
import Vehicle from "./Vehicle"; // Import your Vehicle component
import Shipping from "../Shipping";

const ContainerComponent = () => {
  const [currentSection, setCurrentSection] = useState(1); // Track the current section

  // Function to handle navigation to the next section
  const handleNext = () => {
    setCurrentSection((prevSection) => prevSection + 1); // Increment current section
  };

  // Function to handle navigation to the previous section
  const handleBack = () => {
    setCurrentSection((prevSection) => prevSection - 1); // Decrement current section
  };

  // Function to render the current section based on currentSection state
  const renderSection = () => {
    switch (currentSection) {
      case 1:
        return <Vehicle />;
      case 2:
        return <Shipping />;
      // Render other sections for electricity consumption, flight information, shipping information
      default:
        return null;
    }
  };

  return (
    <div
      className="container mx-auto relative"
      style={{
        paddingBottom: "40vh",
        paddingRight: "45vh",
        paddingLeft: "45vh",
        paddingTop: "5vh",
        position: "relative", // Ensure positioning context for absolutely positioned children
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.01)), url("https://images.unsplash.com/photo-1611270418597-a6c77f4b7271?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhcmJvbnxlbnwwfHwwfHx8MA%3D%3D")`, // Adjust opacity here
          backgroundSize: "cover", // Ensure the background image covers the entire container
          backgroundPosition: "center", // Center the background image
          filter: "brightness(0.3)",
          marginRight: "40vh",
          marginLeft: "40vh",
          marginTop: "5vh",
          marginBottom: "40vh",
          borderRadius: "50px",
        }}
      ></div>
      <div
        className="mt-8 relative z-10"
        style={{
          paddingTop: "5vh",
          paddingRight: "10vh",
          paddingBottom: "10vh",
          paddingLeft: "10vh",
        }}
      >
        {/* Render the current section */}
        {renderSection()}
        {/* Buttons for navigation */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            disabled={currentSection === 1} // Disable button if already on the first section
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="bg-[#245501] px-4 py-2 text-white rounded hover:bg-green-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContainerComponent;
