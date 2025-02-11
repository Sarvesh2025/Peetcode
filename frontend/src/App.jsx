
import './App.css'
import Landing from "./pages/Landing"
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import About from './components/About'
import Practice from './pages/Practice'
import Problems from './pages/Problems'


function App() {


  return (
    <>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/practice" element={<Practice />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App
