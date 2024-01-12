import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { useState } from "react";
import Reviews from "./pages/Review/Review";
import Rant from "./pages/Rant/Rant";
import PostReview from "./pages/Review/PostReview";
import PostRant from "./pages/Rant/PostRant";

function App() {

  const [isAuthorized, setIsAuthoirzed] = useState(localStorage.getItem('isAuthorized'))

  return (

    <Router>
    <div className="App">
      <Navbar isAuthorized={isAuthorized} setIsAuthorized={setIsAuthoirzed}></Navbar>

      <Routes>

        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login setIsAuthoirzed={setIsAuthoirzed}></Login>}/>
        <Route path='/reviews' element={<Reviews isAuthorized={isAuthorized}></Reviews>}/>
        <Route path='/rants' element={<Rant isAuthorized={isAuthorized}></Rant>}/>
        <Route path="/post-review" element={<PostReview isAuthorized={isAuthorized}></PostReview>}/>
        <Route path="/post-rant" element={<PostRant isAuthorized={isAuthorized}></PostRant>}/>

      </Routes>
    </div>
    </Router>
  );
}

export default App;
