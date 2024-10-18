import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../ThemeProvider';
import Navbar from './Navbar';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import OrderList from './OrderList';
import sidebarData from '../staticData/LeftSideBarData.json';
import rightSidebarData from '../staticData/RightSideBarData.json';
import closeIcon from '../assets/icons/close.png';

function OrderHistory() {
  const { isDarkTheme } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
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

  const handleSelectOrder = orderId => {
    setSelectedOrders(prevSelected =>
      prevSelected.includes(orderId) ? prevSelected.filter(id => id !== orderId) : [...prevSelected, orderId]
    );
  };

  const handleSelectAll = () => {
    setSelectAll(prevSelectAll => {
      const newSelectedOrders = prevSelectAll ? [] : Array.from({ length: 15 }, (_, i) => i + 1);
      setSelectedOrders(newSelectedOrders);
      return !prevSelectAll;
    });
  };

  return (
    <div className="flex h-screen relative">
      {isLeftSidebarOpen && <LeftSidebar sidebarData={sidebarData} />}
      {isLeftSidebarOpen && (
        <button
          onClick={() => setIsLeftSidebarOpen(false)}
          className="absolute z-[101] top-4 right-4 md:hidden bg-transparent text-white rounded"
        >
          <img src={closeIcon} alt="Close" className="w-4 h-4" />
        </button>
      )}

      <div className={`w-full lg:w-auto ${isDarkTheme ? 'bg-[#1C1C1C]' : 'bg-white'} flex-grow`}>
        <Navbar onLeftToggleSidebar={() => setIsLeftSidebarOpen(prev => !prev)} onRightToggleSidebar={() => setIsRightSidebarOpen(prev => !prev)} />
        <div className={`p-6 ${isDarkTheme ? 'text-gray-300' : 'text-gray-800'} h-[calc(100vh-60px)] w-full overflow-y-auto`}>
          <OrderList 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
            selectedOrders={selectedOrders} 
            handleSelectOrder={handleSelectOrder} 
            selectAll={selectAll} 
            handleSelectAll={handleSelectAll} 
            isDarkTheme={isDarkTheme} 
            className="overflow-x-auto"
          />
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

export default OrderHistory;
