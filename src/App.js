import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import LeftSidebar from './components/LeftSidebar';
import LeftSideBarData from './staticData/LeftSideBarData.json';
import RightSidebar from './components/RightSidebar';
import RightSideBarData from './staticData/RightSideBarData.json';
import Dashboard from './components/Dashboard';
import ThemeProvider from './ThemeProvider';
import OrderHistory from './components/OrderHistory';

const RightSidebarWrapper = () => {
  const location = useLocation();

  return location.pathname === '/dashboard' ? (
    <div className="w-100">
      <RightSidebar rightSidebarData={RightSideBarData} />
    </div>
  ) : null;
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App flex h-screen overflow-hidden">
          {/* Left Sidebar */}
          <LeftSidebar sidebarData={LeftSideBarData} />

          {/* Main Content Area */}
          <div className="flex-grow flex flex-col overflow-hidden">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route
                path="/dashboard"
                element={<Dashboard />}
              />
              <Route
                path="/order-history"
                element={<OrderHistory />}
              />
            </Routes>
          </div>

          <RightSidebarWrapper />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
