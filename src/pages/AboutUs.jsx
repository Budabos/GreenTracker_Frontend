import { Fragment } from "react";

const AboutUs = () => {
  return (
    <Fragment>
      <section className="bg-white-100">
        <div className="text-center">
          <h3>About Us</h3>
        </div>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="card img-fluid rounded-start about-img"></div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="about">
                <div className="abouthead text-center">
                  <h5>Why We are Exceptional</h5>
                </div>
                <div className="aboutparagraph">
                  <p>
                    <b>🌿🌱Welcome to GreenTracker!🌱🌿</b> At GreenTracker where passion for
                    sustainability meets innovation. We are more than just a
                    platform; we are a{" "}
                    <b>community of environmental enthusiasts🌍</b> dedicated to
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
                      <b>Our Aim is Your Satisfaction!!! 🌍</b>
                    </p>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h5 className="text-center text-success">Our Mission</h5>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <p>
                At GreenTracker, our mission is to empower individuals to make
                informed choices that lead to a more sustainable future. We
                strive to provide accessible tools and resources that enable
                users to calculate their carbon footprint, track sustainable
                habits, and engage with eco-friendly initiatives🌿. By fostering a
                sense of community and providing educational materials, we aim
                to inspire and support users on their journey towards living a
                greener lifestyle🌱.
              </p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="card img-fluid rounded-start mission-img"></div>
            </div>
            <div>
              <h5 className="text-success text-center">Our Vision</h5>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="card img-fluid rounded-start vision-img"></div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <p>
                🌟Our <b>Vision at GreenTracker </b>is to create a world where
                every individual plays an active role in preserving our planet
                for future generations🌍. We envision a global community of
                environmentally-conscious citizens who are committed to reducing
                their carbon footprint and making sustainable choices in their
                daily lives🌱. Through our app, we seek to empower individuals to
                become agents of positive change and contribute to the
                collective effort of combating climate change🌿.
              </p>
            </div>
            <div>
              <h5 className="text-center text-success">Our Goals</h5>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <ul>
                <li>Empower individuals to make sustainable choices🌱</li>
                <li>Provide accessible tools for tracking carbon footprint🌍</li>
                <li>Foster a sense of community around sustainability🌿</li>
                <li>Offer educational resources on eco-friendly practices📚</li>
                <li>Promote positive environmental impact 🌟</li>
                <li>Facilitate community-driven environmental projects🌿</li>
                <li>Organize eco-conscious events and workshops🌱</li>
                <li>Partner with eco-friendly brands and organizations🌍</li>
              </ul>
            </div>
            <div>
              <h5 className="text-center text-success">Our Core Values</h5>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <ul>
                <li>Environmental stewardship🌿</li>
                <li>Community engagement 🌱</li>
                <li>Transparency and accountability🌍</li>
                <li>Innovation and creativity🚀</li>
                <li>Continuous improvement 🌟</li>
                <li>Social responsibility🌱</li>
                <li>Equity and inclusivity🌍</li>
              </ul>
            </div>
            <div className="text-center text-success font-italic">
              <h5>
                GreenTracker: Your Ultimate Destination for Sustainable Living!🌿🌱🌍
              </h5>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default AboutUs;
