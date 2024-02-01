import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Profile from "./components/profile";
import Events from "./components/events";
import Web3 from "web3";
import OrganizationABI from './organizations.json';

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="events" element={<Events />} />
        </Route>
        {/* <Route path="/" element={<Home />}/> */}
      </Routes>
    </BrowserRouter>

  );
}

export default App;
