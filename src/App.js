import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Subjects from './components/Subjects';
import Mathematics from './components/Mathematics';

function App() {

  //TODO: how to add all the pages dynamically ?
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/mathematics" element={<Mathematics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
