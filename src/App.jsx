import { Route, Routes } from "react-router-dom";

import AboutUs from "../src/pages/AboutUs";
import ContactUs from "../src/pages/ContactUs";
import Faqs from "../src/pages/Faqs";
import Feedback from "../src/pages/Feedback";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";
import Footer from "./components/Footer";
import Carbon from "./pages/Carbon";
import Donation from "./pages/Donation";
import EducationalResources from "./pages/EducationalResources";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Review from "./pages/Review";

// import { Track } from "./pages/subpages/Track";
// import { Reduce } from "./pages/subpages/Reduce";
// import { Engage } from "./pages/subpages/Engage";

import Events from "./pages/Events";
import ProductById from "./pages/ProductById";

import AuthWrapper from "./components/AuthWrapper";
import CarbonCalculator from "./pages/CarbonCalculator";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardEvents from "./pages/dashboard/DashboardEvents";
import DashboardProducts from "./pages/dashboard/DashboardProducts";
import DashboardUsers from "./pages/dashboard/DashboardUsers";

import CalculationPage from "./pages/CalculationPage";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

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
        <Route path="/carbon-calculation" element={<CalculationPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />

        <Route
          path="/educational-resources"
          element={<EducationalResources />}
        />
        {/* <Route path="/footprint" element={<Footprint />} />

     
{/* 
        <Route path="/vehicle" element={<Vehicles/>} > */}

        {/* </Route> */}
        {/* <Route path="/sustainable-habits" element={<Track/>} />
          <Route path="/sustainable-habits/reduce" element={<Reduce/>} />

 




          <Route path="/sustainable-habits/engage" element={<Engage/>} />
        </Route> */}

        <Route
          path="/educational-resources"
          element={<EducationalResources />}
        />
        <Route path="/events" element={<Events />} />
        <Route path="/carbon" element={<Carbon />} />
        <Route path="/products/:id" element={<ProductById />} />

        <Route path="/carbon-calculation" element={<CarbonCalculator />} />

        <Route element={<AuthWrapper />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/events" element={<DashboardEvents />} />
          <Route path="/dashboard/products" element={<DashboardProducts />} />
          <Route path="/dashboard/users" element={<DashboardUsers />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
