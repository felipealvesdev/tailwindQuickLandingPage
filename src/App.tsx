import Navbar from './components/Navbar/Navbar.js'
import Footer from './components/Footer/Footer.js'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home.js'
import Reading from './pages/reading/Reading.js'
import Readings from './pages/readings/Readings.js'
import SignIn from './pages/signin/Signin.js'
import NotFound from './pages/notFound/NotFound.js'


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
  )
}

export default App
