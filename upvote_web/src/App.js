import React from 'react';
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Home from './pages/Home';
import Login from './pages/Login';
import Header from './pages/Header';


function App() {


  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route element={<Home />} path="/" exact />
          <Route element={<Login />} path="login/" exact />
        </Routes>
      </AuthProvider>
    </Router>
  );

}

export default App;
