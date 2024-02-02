import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { useState } from "react";
import Reviews from "./pages/Rant-Review/Review/Review";
import Rant from "./pages/Rant-Review/Rant/Rant";
import PostReview from "./pages/Rant-Review/Review/PostReview";
import PostRant from "./pages/Rant-Review/Rant/PostRant";
import News from "./pages/News/News";
import Maps from "./pages/Map/Map";
import Footer from "./Footer/Footer";
import FullRant from "./pages/Rant-Review/Rant/FullRant";
import UserProfile from "./pages/UsersProfile/UsersProfile";

function App() {

  const [isAuthorized, setIsAuthoirzed] = useState(localStorage.getItem('isAuthorized'))

  return (

    <Router>
    <div className="App">
      <Navbar isAuthorized={isAuthorized} setIsAuthorized={setIsAuthoirzed}></Navbar>

      <Routes>

        <Route path="/" element={<Home/>}/>
        <Route path="/Map" element={<Maps/>}></Route>
        <Route path="/news" element={<News/>}></Route>
        <Route path="/login" element={<Login setIsAuthoirzed={setIsAuthoirzed}></Login>}/>
        <Route path='/reviews' element={<Reviews isAuthorized={isAuthorized}></Reviews>}/>
        <Route path='/rants' element={<Rant isAuthorized={isAuthorized}></Rant>}/>
        <Route path="/post-review" element={<PostReview isAuthorized={isAuthorized}></PostReview>}/>
        <Route path="/post-rant" element={<PostRant isAuthorized={isAuthorized}></PostRant>}/>
        <Route path="/rant/:id" element={<FullRant></FullRant>}></Route>
        <Route path="/profile/:id" element={<UserProfile/>}/>

      </Routes>
    </div>

      <Footer></Footer>
    </Router>
  );
}

export default App;
