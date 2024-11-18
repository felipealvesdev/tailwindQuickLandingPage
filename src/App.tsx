import Navbar from "./components/Navbar/Navbar.tsx";
import Footer from "./components/Footer/Footer.tsx";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.tsx";
import Reading from "./pages/reading/Reading.tsx";
import Readings from "./pages/readings/Readings.tsx";
import SignIn from "./pages/signin/SignIn.tsx";
import NotFound from "./pages/notFound/NotFound.tsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/readings/:id" element={<Reading />} />
        <Route path="/readings" element={<Readings />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
