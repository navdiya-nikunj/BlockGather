import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Profile from "./components/profile";
import Events from "./components/events";


function App() {
  return (
 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="events" element={<Events />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
