import './App.css'
import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

// pages
import Download from './pages/Download'
import Main from './pages/Main'
import NotFount404 from './pages/NotFound404'


function App() {

  return (
    <Routes>
      <Route exact path="/" component={ Main } />
      <Route exact path="/Download" component={ Download } />
      <Route exact path="/NotFound" component={ NotFount404 } />
    </Routes>
  );
}

export default App;
