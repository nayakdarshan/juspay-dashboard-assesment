import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../ThemeProvider';
import Navbar from './Navbar';
import Ecommerce from './Ecommerce';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import sidebarData from '../staticData/LeftSideBarData.json';
import rightSidebarData from '../staticData/RightSideBarData.json';
import closeIcon from '../assets/icons/close.png';

function Dashboard() {
  const { isDarkTheme } = useContext(ThemeContext);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsLeftSidebarOpen(true);
        setIsRightSidebarOpen(true);
      } else {
        setIsLeftSidebarOpen(false);
        setIsRightSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen">
      {isLeftSidebarOpen && <LeftSidebar sidebarData={sidebarData} />}
      {isLeftSidebarOpen && (
        <button
          onClick={() => setIsLeftSidebarOpen(false)}
          className="absolute z-[101] top-4 right-4 md:hidden bg-transparent text-white rounded"
        >
          <img src={closeIcon} alt="Close" className="w-4 h-4" />
        </button>
      )}

      <div className={`flex-grow w-full lg:w-auto ${isDarkTheme ? 'bg-[#1C1C1C]' : 'bg-white'}`}>
        <Navbar onLeftToggleSidebar={() => setIsLeftSidebarOpen(prev => !prev)} onRightToggleSidebar={() => setIsRightSidebarOpen(prev => !prev)} />
        <div className={`p-6 sm:p-2 md:p-4 lg:p-6 ${isDarkTheme ? 'text-gray-300' : 'text-gray-800'} h-[calc(100vh-60px)] overflow-y-auto`}>
          <Ecommerce />
        </div>
      </div>

      {isRightSidebarOpen && <RightSidebar rightSidebarData={rightSidebarData} />}
      {isRightSidebarOpen && (
        <button
          onClick={() => setIsRightSidebarOpen(false)}
          className="absolute z-[101] top-4 right-4 md:hidden bg-transparent text-white rounded"
        >
          <img src={closeIcon} alt="Close" className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default Dashboard;
