import { Route, Routes } from "react-router-dom";

import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";
import Footer from "./components/Footer";
import Donation from "./pages/Donation";
import AboutUs from "../src/pages/AboutUs";
import ContactUs from "../src/pages/ContactUs";
import Review from "./pages/Review";
import Profile from "./pages/Profile";
import Faqs from "../src/pages/Faqs";
import Feedback from "../src/pages/Feedback";
import Products from "./pages/Products";
import EducationalResources from "./pages/EducationalResources";
import { SustainableHabits } from "./pages/SustainableHabits";
import { Track } from "./pages/subpages/Track";
import { Reduce } from "./pages/subpages/Reduce";
import { Engage } from "./pages/subpages/Engage";
import Footprint from "./pages/Footprint";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/review" element={<Review />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/donations" element={<Donation />} />
        <Route path="/educational-resources" element={<EducationalResources />} />
        <Route path="/footprint" element={<Footprint />} />



        <Route path="/sustainable-habits" element={<SustainableHabits />} >
          <Route path="/sustainable-habits" element={<Track/>} />
          <Route path="/sustainable-habits/reduce" element={<Reduce/>} />
          <Route path="/sustainable-habits/engage" element={<Engage/>} />
        </Route>


      </Routes >
      <Footer />
    </>
  );
}

export default App;