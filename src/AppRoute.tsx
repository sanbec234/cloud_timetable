import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/home.tsx';
import TimetableComponent from './components/timetable/TimetableComponent.tsx';
import Login from './components/login/login.tsx'
function App() {
  
  
    // Your authentication logic should set isAuthenticated to true upon successful login
  
    return (
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/timetable' element={<TimetableComponent />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    );
  }
  
  export default App;
  