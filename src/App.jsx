import { Route, Routes } from "react-router-dom";
import Home from '../src/pages/Home'
import Login from '../src/pages/Login'
import Signup from '../src/pages/Signup'
import AboutUs from '../src/pages/AboutUs'
import ContactUs from '../src/pages/ContactUs'
import Review from "./pages/Review";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import EducationalResources from "./pages/EducationalResources";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/products" element={<Products />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/review" element={<Review />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/educational-resources" element={<EducationalResources />} />
    </Routes>
  );
}

export default App;
