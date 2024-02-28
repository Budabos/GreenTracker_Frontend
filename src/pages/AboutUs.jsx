import React from "react";
import { Fragment } from "react";

const AboutUs = () => {
  return (
    <Fragment>
      <section style={{ backgroundColor: "#f8f9fa" }}>
        <div className="text-center">
          <img
            src="https://youthincmag.com/wp-content/uploads/2019/11/Twitter-Climate-Action.jpg"
            alt="Your Image Alt Text"
            style={{ width: "100%", height: "20%" }}
          />
         <h1 style={{ color: "#28a745", fontSize: "2.5em", fontWeight: "bold", marginTop: "20px" }}>
            GreenTracker: Your Ultimate Destination for Sustainable Living!
          </h1>
        </div>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="col-lg-6 col-md-6 col-sm-12" style={{ marginTop: "20px" }}>
              <div
                className="card img-fluid rounded-start about-img"
                style={{
                  background: `url('https://stratheia.com/wp-content/uploads/2023/07/climate-change-backgrounder.jpg')`,
                  backgroundSize: "cover",
                  height: "300px",
                }}
              ></div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="about">
                <div className="abouthead text-center">
                  <h5 style={{ color: "#28a745", marginTop: "50px"  }}><b>Why We are Exceptional</b></h5>
                </div>
                <div className="aboutparagraph">
                  <p>
                    <b>Welcome to GreenTracker!</b> where passion for
                    sustainability meets innovation. We are more than just a
                    platform; we are a{" "}
                    <b>community of environmental enthusiasts</b> dedicated to
                    exploring sustainable living and eco-friendly practices. Our
                    journey began with a simple idea - to bring the joy of
                    sustainable living experiences to your fingertips. At
                    GreenTracker, we offer a range of tools and resources to
                    help individuals make eco-conscious choices in their daily
                    lives. From calculating your carbon footprint to discovering
                    eco-friendly products, we're here to support you on your
                    journey towards a greener future.
                    <p className="text-center font-weight-bold text-success">
                      <br />
                      <b>Our Aim is Your Satisfaction!!!</b>
                    </p>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div
                className="card img-fluid rounded-start mission-img"
                style={{
                  background: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7AEavl-gdX6MbgkuXKOocz_7A3JmkBKWUwgQsneunRCnYYROQSmwNRi1h3x1mYtoQqO0&usqp=CAU')`,
                  backgroundSize: "cover",
                  height: "300px",
                }}
              ></div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12" style={{ marginTop: "50px" }}>
              <h2 style={{ color: "#28a745"  }}><b>Our Mission</b></h2>
              <p>
                At GreenTracker, <b>our mission is to empower individuals to make
                informed choices that lead to a more sustainable future.</b> We
                strive to provide accessible tools and resources that enable
                users to calculate their carbon footprint, track sustainable
                habits, and engage with eco-friendly initiatives. By fostering a
                sense of community and providing educational materials, we aim
                to inspire and support users on their journey towards living a
                greener lifestyle.
              </p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div
                className="card img-fluid rounded-start vision-img"
                style={{
                  background: `url('https://imageio.forbes.com/specials-images/imageserve/628f9b452004fa9b704d8a2f/Sustainable-lifestyle-and-Environmental/960x0.jpg?height=473&width=711&fit=bounds')`,
                  backgroundSize: "cover",
                  height: "400px",
                }}
              ></div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12" style={{ marginTop: "70px" }}>
              <h2 style={{ color: "#28a745" }}><b>Our Vision</b></h2>
              <p>
                Our Vision at GreenTracker is <b>to create a world where
                every individual plays an active role in preserving our planet
                for future generations.</b> We envision a global community of
                environmentally-conscious citizens who are committed to reducing
                their carbon footprint and making sustainable choices in their
                daily lives. Through our app, we seek to empower individuals to
                become agents of positive change and contribute to the
                collective effort of combating climate change.
              </p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12" >
              <h2 style={{ textAlign: "center", color: "#28a745" }}><b>Our Goals</b></h2>
              <ul>
                <ol style={{ textAlign: "center" }}>Empower individuals to make sustainable choices</ol>
                <ol style={{ textAlign: "center" }}>Provide accessible tools for tracking carbon footprint</ol>
                <ol style={{ textAlign: "center" }}>Foster a sense of community around sustainability</ol>
                <ol style={{ textAlign: "center" }}>Offer educational resources on eco-friendly practices</ol>
                <ol style={{ textAlign: "center" }}>Promote positive environmental impact</ol>
              </ul>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <h2 style={{ textAlign: "center", color: "#28a745" }}><b>Our Core Values</b></h2>
              <ul>
                <ol style={{ textAlign: "center" }}>Environmental stewardship</ol>
                <ol style={{ textAlign: "center" }}>Community engagement</ol>
                <ol style={{ textAlign: "center" }}>Transparency and accountability</ol>
                <ol style={{ textAlign: "center" }}>Innovation and creativity</ol>
                <ol style={{ textAlign: "center" }}>Continuous improvement</ol>
              </ul>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", color: "#28a745" }}>
              <h1 style={{ fontWeight: "bold" }}>
                GreenTracker: Your Ultimate Destination for Sustainable Living!
              </h1>
            </div>
      </section>
    </Fragment>
  );
};

export default AboutUs;
