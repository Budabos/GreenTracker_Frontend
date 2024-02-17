import { Route, Routes } from "react-router-dom";
import Home from '../src/pages/Home'
import Login from '../src/pages/Login'
import Signup from '../src/pages/Signup'
import AboutUs from '../src/pages/AboutUs'
import ContactUs from '../src/pages/ContactUs'
import Faqs from "../src/pages/Faqs";
import Feedback from "../src/pages/Feedback";







function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/faqs" element={<Faqs />} />
      <Route path="/feedback" element={<Feedback />} />


      

    </Routes>
  );
}

export default App
