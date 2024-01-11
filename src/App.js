import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Home from "./pages/Home/Home";

function App() {
  return (

    <Router>
    <div className="App">
      <Navbar></Navbar>

      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
