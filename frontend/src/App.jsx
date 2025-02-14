
import './App.css'
import Landing from "./pages/Landing"
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import About from './components/About'
import Problem from './pages/Problem'
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
            <Route path="/problem" element={<Problem />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App
