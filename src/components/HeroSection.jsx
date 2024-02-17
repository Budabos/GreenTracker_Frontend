import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      imageSrc:
        "https://images.pexels.com/photos/6124232/pexels-photo-6124232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Welcome to our Sustainable Living Hub",
      summary: "Where every action counts towards a greener future!",
    },
    {
      imageSrc:
        "https://images.pexels.com/photos/11573790/pexels-photo-11573790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Explore Our Objectives",
      summary:
        "Understand your carbon footprint and take steps to reduce it with our carbon calculation tool. Track your emissions and discover ways to minimize your environmental impact.",
    },
    // Add more slides as needed
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (current, next) => {
      setCurrentSlide(next);
      setTimeout(() => {
        setCurrentSlide(next);
      }, 500);
    },
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section" style={{ position: "relative" }}>
        <Slider {...settings} style={{ paddingTop: "20px" }}>
          {slides.map((slide, index) => (
            <div key={index}>
              <img
                src={slide.imageSrc}
                alt={`Carousel Image ${index + 1}`}
                style={{ width: "100%", height: "80vh", opacity: "70%" }}
              />
            </div>
          ))}
        </Slider>
        <div
          className="text-overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            textAlign: "left",
            width: "100%",
            color: "white",
            padding: "20px",
            display: currentSlide === 0 ? "none" : "block",
          }}
        >
          <h1>{slides[currentSlide].title}</h1>
          <p>{slides[currentSlide].summary}</p>
        </div>
      </div>

      {/* Objectives */}
      <div className="objectives-section">
        <Button text="Explore Our Objectives" />
        <div className="objectives">
          {/* Objective components go here */}
          <div
            title="Carbon Calculation"
            summary="Understand your carbon footprint and take steps to reduce it with our carbon calculation tool. Track your emissions and discover ways to minimize your environmental impact."
            imageSrc="/carbon_calculation.jpg"
          />
          {/* Add more Objective components as needed */}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
