import React from 'react'
import "../src/dist/styles.css";
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import coinPage from './pages/coinPage';

function App() {

  return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<coinPage />} />
        </Routes>
  );
}

export default App;
