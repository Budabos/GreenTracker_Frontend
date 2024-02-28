import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  const sliderRef = useRef(null); // Ref for accessing the Slider component

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
    },
  };

  const [currentSlide, setCurrentSlide] = React.useState(0);

  const slides = [
    {
      title:
        "Welcome to Greentrackr, your new favourite sustainability tracking app",
      description:
        "Join GreenTrack, the app that transforms your daily choices into impactful steps towards a greener future. From reducing your carbon footprint to tracking your eco-friendly habits, every action you take counts towards a more sustainable lifestyle. ",
      imageSrc:
        "https://images.pexels.com/photos/6124232/pexels-photo-6124232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Discover Sustainable Living",
      description:
        "Dive into a world of sustainable living where every choice makes a positive impact. Explore a wide array of eco-friendly products and services designed to support a healthier planet.",
      imageSrc:
        "https://images.pexels.com/photos/11573790/pexels-photo-11573790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Track Your Impact",
      description:
        "Monitor your carbon footprint reduction and see the positive impact of your sustainable choices over time.",
      imageSrc:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1613&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Set Personal Goals",
      description:
        "Set achievable sustainability goals and receive personalized tips and reminders to help you stay on track.Empower yourself to make a difference by setting personalized sustainability goals.",
      imageSrc:
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1575&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Join Community Challenges",
      description:
        "Participate in challenges with friends and community members to collectively make a bigger impact.",
      imageSrc:
        "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Stay Informed",
      description:
        "Access the latest sustainability news, tips, and articles to stay informed and inspired.",
      imageSrc:
        "https://images.pexels.com/photos/3850571/pexels-photo-3850571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    // Add more slides as needed
  ];

  const objectives = [
    {
      title: "Carbon Footprint Calculation",
      description:
        "Gain deep insight into your carbon footprint and embark on a transformative journey to reduce it with our intuitive carbon calculation tool. Our platform empowers you to understand the intricate details of your emissions. Armed with this knowledge, you'll discover actionable steps tailored to your lifestyle, facilitating meaningful reductions in your environmental impact. Join us in fostering a greener, more sustainable future for generations to come.",
      imageSrc:
        "https://images.unsplash.com/photo-1611270418597-a6c77f4b7271?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D",
      link: "/about",
    },
    {
      title: "Impact Tracking",
      description:
        "Embark on a journey of self-discovery and environmental stewardship with our comprehensive impact tracking feature. Seamlessly monitor your emissions over time, gaining invaluable insights into their trends and patterns. Armed with this knowledge, you'll uncover effective strategies to minimize your ecological footprint and contribute to a healthier planet.",
      imageSrc:
        "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VzdGFpbmFiaWxpdHl8ZW58MHx8MHx8fDA%3D",
      link: "/about",
    },
    {
      title: "Educational Resources",
      description:
        "Dive deep into a wealth of educational materials meticulously curated to deepen your understanding of sustainability and eco-conscious behaviors. Our platform offers a diverse array of resources, ranging from informative articles and engaging videos to interactive workshops and insightful webinars. Empower yourself and others with knowledge.",
      imageSrc:
        " https://images.unsplash.com/photo-1572202808998-93788f6d39da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8",
      link: "/about",
    },
    {
      title: "Eco-Friendly Shopping Guide",
      description:
        "Embark on a journey towards sustainable living with our comprehensive eco-friendly shopping guide. Navigate through a curated selection of products and services designed to promote a more environmentally conscious lifestyle. From household essentials to personal care items, discover alternatives that not only meet your needs but also support the well-being of both people and the planet.",
      imageSrc:
        "https://images.pexels.com/photos/3806752/pexels-photo-3806752.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      link: "/about",
    },
    {
      title: "Community Engagement",
      description:
        "Join a vibrant community of like-minded individuals committed to making a positive impact on the planet. Participate in engaging challenges and collaborative initiatives aimed at collectively reducing our environmental footprint. Through shared experiences and mutual support, we inspire and motivate each other to adopt greener practices and lead by example. Together, we can harness the power of community to create meaningful change.",
      imageSrc:
        "https://images.pexels.com/photos/8543606/pexels-photo-8543606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "/about",
    },
  ];

  const handleImageClick = () => {
    // Move to the next slide when the image is clicked
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section" style={{ position: "relative" }}>
        <Slider {...settings} ref={sliderRef}>
          {slides.map((slide, index) => (
            <div
              key={index}
              onClick={handleImageClick}
            >
              {" "}
              {/* Attach click handler */}
              <img
                src={slide.imageSrc}
                alt={`Carousel Image ${index + 1}`}
                style={{ width: "100%", height: "100vh" }}
              />
            </div>
          ))}
        </Slider>

        <div
          className="text-overlay"
          style={{
            position: "absolute",
            bottom: "70px", // Adjust this value to move the text higher
            left: 0,
            textAlign: "left",
            width: "100%",
            color: "white",
            padding: "30px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
        >
          <h1 style={{ fontSize: "20px" }}>{slides[currentSlide].title} </h1>
          <br />
          <div style={{ width: "50%" }}>
            <p style={{ fontSize: "15px" }}>
              {slides[currentSlide].description}
            </p>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />

      {/* Objectives */}
      <div className="objectives-section bg-gray-100 py-12">
        <div className="container mx-auto">
          <button className="text-3xl font-bold mb-8">Our objectives</button>
          <div className="flex flex-wrap">
            {objectives.map((objective, index) => (
              <div
                key={index}
                className="w-full md:w-1/2 lg:w-1/3 p-4 flex"
                style={{ width: "70%", height: "70vh" }}
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden flex-1">
                  <img
                    src={objective.imageSrc}
                    alt={objective.title}
                    className="w-full h-48 object-cover object-center"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <div className="p-4 flex-1" style={{ paddingLeft: "100px" }}>
                  <h2 className="text-xl font-bold mb-2">{objective.title}</h2>
                  <p className="text-gray-700">{objective.description}</p>

                  <div>
                    <Link to={objective.link}>
                      <p>Read More...</p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
