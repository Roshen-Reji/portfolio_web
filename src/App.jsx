// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import AdminDashboard from './pages/AdminDashboard';
import './styles/variables.css';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;