// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/home.tsx';
import TimetableComponent from './components/timetable/TimetableComponent.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timetable" element={<TimetableComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
