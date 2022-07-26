import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'

// pages
import Download from './pages/Download'
import Main from './pages/Main'
import NotFount404 from './pages/NotFound404'
import Mypage from './pages/Mypage'
import Signup from './pages/Signup'


function App() {

  return (
    <Routes>
      <Route exact path="/" element={<Main/>} />
      <Route exact path="/Download" element={<Download/>} />
      <Route exact path="/Mypage" element={<Mypage/>} />
      <Route exact path="/Signup" element={<Signup/>} />
      <Route exact path="/NotFound" element={<NotFount404/>} />
    </Routes>
  );
}

export default App;
