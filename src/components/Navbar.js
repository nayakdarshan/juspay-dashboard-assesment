import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';
import searchIcon from '../assets/icons/search.png';  
import sunIcon from '../assets/icons/themeToggle.png';
import refreshIcon from '../assets/icons/recents.png';
import notificationIcon from '../assets/icons/bell.png';
import sideBarToggle from '../assets/icons/leftSidebar.png';
import starIcon from '../assets/icons/star.png';

function Navbar({ onToggleSidebar }) {
  const { toggleTheme, isDarkTheme } = useContext(ThemeContext);

  return (
    <nav className={`p-4 flex flex-wrap justify-between items-center border-b ${isDarkTheme ? 'bg-[#1C1C1C] border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className={`flex items-center space-x-4 ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>
        <button className={`p-2 rounded-lg hover:${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-gray-200'}`} onClick={onToggleSidebar}>
          <img src={sideBarToggle} alt="Sidebar Toggle" className={`w-6 h-6 ${isDarkTheme ? 'filter invert' : ''}`} />
        </button>
        <button className={`p-2 rounded-lg hover:${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}>
          <img src={starIcon} alt="Star" className={`w-6 h-6 ${isDarkTheme ? 'filter invert' : ''}`} />
        </button>
        <span className="hidden md:block">
          Dashboards / <span className={`${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>Default</span>
        </span>
      </div>

      <div className="flex items-center space-x-4 mt-2 md:mt-0">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className={`border rounded-lg pl-8 pr-4 py-2 focus:outline-none ${isDarkTheme ? 'bg-[#1C1C1C] border-gray-600 text-white' : 'bg-gray-100 border-gray-400 text-gray-800'}`}
          />
          <img src={searchIcon} alt="Search" className={`w-4 h-4 absolute top-3 left-2 ${isDarkTheme ? 'filter invert' : ''}`} />
        </div>

        <button className={`p-2 rounded-lg hover:${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-gray-200'}`} onClick={toggleTheme}>
          <img src={sunIcon} alt="Theme" className={`w-6 h-6 ${isDarkTheme ? 'filter invert' : ''}`} />
        </button>
        <button className={`p-2 rounded-lg hover:${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}>
          <img src={refreshIcon} alt="Refresh" className={`w-6 h-6 ${isDarkTheme ? 'filter invert' : ''}`} />
        </button>
        <button className={`p-2 rounded-lg hover:${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}>
          <img src={notificationIcon} alt="Notifications" className={`w-6 h-6 ${isDarkTheme ? 'filter invert' : ''}`} />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
