import React, { useState, useContext } from 'react';
import avatar from '../assets/icons/avatar.png';
import { ThemeContext } from '../ThemeProvider';
import { useNavigate } from 'react-router-dom';

const iconMapping = {
  account: require('../assets/icons/account.png'),
  notification: require('../assets/icons/notification.png'),
  user: require('../assets/icons/user.png'),
  default: require('../assets/icons/default.png'),
  ecommerce: require('../assets/icons/ecommerce.png'),
  projects: require('../assets/icons/projects.png'),
  ecourses: require('../assets/icons/ecourses.png'),
  corporate: require('../assets/icons/corporate.png'),
  blog: require('../assets/icons/blog.png'),
  social: require('../assets/icons/social.png'),
  openDropdown: require('../assets/icons/open-dropdown.png'),
  closeDropdown: require('../assets/icons/close-dropdown.png'),
};

function LeftSidebar({ sidebarData }) {
  const { isDarkTheme } = useContext(ThemeContext);
  const [dashboardOpen, setDashboardOpen] = useState(true);
  const [pagesOpen, setPagesOpen] = useState(true);
  const navigate = useNavigate();

  const toggleDashboard = () => setDashboardOpen(!dashboardOpen);
  const togglePages = () => setPagesOpen(!pagesOpen);

  const handleItemClick = (route) => {
    if (route) {
      navigate(route);
    }
  };

  return (
    <div className={`h-screen w-64 md:w-72 lg:w-60 p-4 border-r ${isDarkTheme ? 'bg-[#1C1C1C] border-gray-700' : 'bg-white border-gray-200'}`}>
      {/* Sidebar Header */}
      <div className="flex items-center pb-4 mb-4">
        <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full mr-2" />
        <h3 className={`text-lg font-bold ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>ByeWind</h3>
      </div>

      {/* Favorites */}
      <div className="mb-6">
        <span className='flex'>
          <h4 className={`text-gray-500 text-sm cursor-pointer py-2 pl-3 flex items-center ${isDarkTheme ? 'text-white' : 'text-gray-500'}`}>
            Favorites
          </h4>
          <h4 className={`text-gray-400 text-sm cursor-pointer py-2 pl-3 flex items-center ${isDarkTheme ? 'text-white' : 'text-gray-400'}`}>
            Recents
          </h4>
        </span>
        <ul className="pl-4 mt-2">
          {sidebarData.sections[0].items.map((item, itemIndex) => (
            <li
              key={itemIndex}
              className={`cursor-pointer pl-2 rounded-lg py-2 ${isDarkTheme ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Dashboards */}
      <div className="mb-6">
        <h4
          className={`text-gray-500 text-sm cursor-pointer py-2 flex items-center ${isDarkTheme ? 'text-white' : 'text-gray-500'}`}
          onClick={toggleDashboard}
        >
          <img
            src={dashboardOpen ? iconMapping.closeDropdown : iconMapping.openDropdown}
            alt={dashboardOpen ? 'Close' : 'Open'}
            className={`mr-2 w-4 h-4 ${isDarkTheme ? 'filter invert' : ''}`}
          />
          Dashboards
        </h4>
        <ul className={`pl-4 mt-2 ${!dashboardOpen ? 'hidden' : ''}`}>
          {sidebarData.sections[1].items.map((item, itemIndex) => {
            const iconPath = item.icon ? require(`../assets/icons/${item.icon}.png`) : null;

            return (
              <li
                key={itemIndex}
                onClick={() => handleItemClick(item.route)} // Call handleItemClick with route
                className={`flex items-center cursor-pointer pl-2 rounded-lg py-2 ${isDarkTheme ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                {iconPath && <img src={iconPath} alt={item.name} className={`mr-2 w-4 h-4 ${isDarkTheme ? 'filter invert' : ''}`} />}
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Pages */}
      <div className="mb-6">
        <h4
          className={`text-gray-500 text-sm cursor-pointer py-2 flex items-center ${isDarkTheme ? 'text-white' : 'text-gray-500'}`}
          onClick={togglePages}
        >
          <img
            src={pagesOpen ? iconMapping.closeDropdown : iconMapping.openDropdown}
            alt={pagesOpen ? 'Close' : 'Open'}
            className={`mr-2 w-4 h-4 ${isDarkTheme ? 'filter invert' : ''}`}
          />
          Pages
        </h4>
        <ul className={`pl-4 mt-2 ${!pagesOpen ? 'hidden' : ''}`}>
          {sidebarData.sections[2].items.map((item, itemIndex) => {
            const iconPath = item.icon ? require(`../assets/icons/${item.icon}.png`) : null;

            return (
              <li
                key={itemIndex}
                className={`flex items-center cursor-pointer pl-2 rounded-lg py-2 ${isDarkTheme ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                {iconPath && <img src={iconPath} alt={item.name} className={`mr-2 w-4 h-4 ${isDarkTheme ? 'filter invert' : ''}`} />}
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default LeftSidebar;
