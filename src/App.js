import React from 'react'
import "../src/dist/styles.css";
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import CoinPage from './pages/CoinPage';

function App() {

  return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<CoinPage />} />
        </Routes>
  );
}

export default App;
