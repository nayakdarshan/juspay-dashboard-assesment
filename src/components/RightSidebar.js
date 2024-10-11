import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';
import bugIcon from '../assets/icons/bug.png';
import notificationIcon from '../assets/icons/notification.png';
import userIcon from '../assets/icons/user.png';

const RightSidebar = ({ rightSidebarData }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  const getIcon = (type) => {
    switch (type) {
      case 'bug':
        return <img src={bugIcon} alt="Bug" className="w-7 h-7" />;
      case 'user':
        return <img src={userIcon} alt="User" className="w-7 h-7" />;
      default:
        return <img src={notificationIcon} alt="Notification" className="w-7 h-7" />;
    }
  };

  return (
    <div className={`w-64 md:w-72 lg:w-80 p-4 border-l h-screen overflow-y-auto ${isDarkTheme ? 'bg-[#1C1C1C] border-gray-700' : 'bg-white border-gray-200'}`}>
      {/* Notifications */}
      <div className="mb-4">
        <h4 className={`text-lg font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-800'} mb-4`}>Notifications</h4>
        <ul className="space-y-3">
          {rightSidebarData.notifications.map((notification, index) => (
            <li key={index} className={`flex items-center space-x-3 rounded-lg px-2 ${isDarkTheme ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-200 text-gray-700'}`}>
              {getIcon(notification.type)}
              <div>
                <p className={`text-sm font-medium truncate ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>{notification.text}</p>
                <span className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>{notification.time}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Activities */}
      <div className="mb-6">
        <h4 className={`text-lg font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-800'} mb-4`}>Activities</h4>
        <div className="flex flex-col space-y-3">
          {rightSidebarData.activities.map((activity, index) => (
            <div key={index} className="flex items-center relative">
              <img
                src={activity.avatar}
                alt={activity.text}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex flex-col justify-center ml-3">
                <p className={`text-sm font-medium truncate ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>{activity.text}</p>
                <span className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>{activity.time}</span>
              </div>
              {/* Uncomment for lin between profile pic
              {index < rightSidebarData.activities.length - 1 && (
                <div className="activity-line" />
              )} */}
            </div>
          ))}
        </div>
      </div>

      {/* Contacts */}
      <div>
        <h4 className={`text-lg font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-800'} mb-4`}>Contacts</h4>
        <ul className="space-y-3">
          {rightSidebarData.contacts.map((contact, index) => (
            <li key={index} className={`flex items-center space-x-3 rounded-lg p-2 ${isDarkTheme ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-200 text-gray-700'}`}>
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-8 h-8 rounded-full"
              />
              <span className={`text-sm font-medium ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>{contact.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RightSidebar;
