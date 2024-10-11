import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';
import Navbar from './Navbar';
function OrderHistory() {
    const { isDarkTheme } = useContext(ThemeContext);

    return (
      <div className={`flex-grow ${isDarkTheme ? 'bg-[#1C1C1C]' : 'bg-white'}`}>
        <Navbar />
        <div
          className={`p-6 ${isDarkTheme ? 'text-gray-300' : 'text-gray-800'} h-[calc(100vh-60px)] overflow-y-auto`}
        >
        </div>
      </div>
    );
}

export default OrderHistory
