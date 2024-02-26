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
import Carbon from "./pages/Carbon";
import EducationalResources from "./pages/EducationalResources";
import Events from "./pages/Events";
import ProductById from "./pages/ProductById";
import Dashboard from "./pages/dashboard/Dashboard";
import AuthWrapper from "./components/AuthWrapper";
import DashboardEvents from "./pages/dashboard/DashboardEvents";
import DashboardProducts from "./pages/dashboard/DashboardProducts";
import DashboardUsers from "./pages/dashboard/DashboardUsers";
import DashboardBookings from "./pages/dashboard/DashboardBookings";

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
        <Route
          path="/educational-resources"
          element={<EducationalResources />}
        />
        <Route path="/events" element={<Events />} />
        <Route path="/carbon" element={<Carbon />} />
        <Route path="/products/:id" element={<ProductById />} />
        <Route element={<AuthWrapper />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/events" element={<DashboardEvents />} />
          <Route path="/dashboard/products" element={<DashboardProducts />} />
          <Route path="/dashboard/users" element={<DashboardUsers />} />
          <Route path="/dashboard/bookings" element={<DashboardBookings />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
