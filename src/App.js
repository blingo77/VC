import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { useState } from "react";

function App() {

  const [isAuthorized, setIsAuthoirzed] = useState(localStorage.getItem('isAuthorized'))

  return (

    <Router>
    <div className="App">
      <Navbar isAuthorized={isAuthorized} setIsAuthorized={setIsAuthoirzed}></Navbar>

      <Routes>

        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login setIsAuthoirzed={setIsAuthoirzed}></Login>}/>

      </Routes>
    </div>
    </Router>
  );
}

export default App;
