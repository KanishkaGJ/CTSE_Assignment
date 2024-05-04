import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllEvents from './Components/AllEvents';

export default function App() { // default app
  return (
    <Router>
      
        <Routes>
          <Route path='/' element={<AllEvents />} />
          
        </Routes>
   
    </Router>
  );
}
