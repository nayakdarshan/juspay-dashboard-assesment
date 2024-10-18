import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import ThemeProvider from './ThemeProvider';
import OrderHistory from './components/OrderHistory';

function App() {
  return (
    <div className='flex flex-grow flex flex-col overflow-hidden'>
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/order-history" element={<OrderHistory />} />
        </Routes>
      </Router>
    </ThemeProvider>
    </div>
  );
}

export default App;
