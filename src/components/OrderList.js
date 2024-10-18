import React from 'react';
import orderData from '../staticData/orderData.json';
import Pagination from './Pagination';
import calendarIcon from '../assets/icons/calendar.png';
import addIcon from '../assets/icons/add.png';
import filterIcon from '../assets/icons/filter.png';
import sortIcon from '../assets/icons/sort.png';

function OrderList({ searchQuery, setSearchQuery, currentPage, setCurrentPage, selectedOrders, handleSelectOrder, selectAll, handleSelectAll, isDarkTheme }) {
  const ordersPerPage = 15;
  
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orderData.slice(indexOfFirstOrder, indexOfLastOrder);
  const filteredOrders = currentOrders.filter(order =>
    order.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full overflow-x-hidden">
      <h1 className="text-xl font-semibold mb-4">Order List</h1>
      <div className={`md:flex justify-between mb-4 rounded-lg px-5 py-2 mb-4 items-center ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <div className="flex items-center justify-around my-3 lg:my-0">
          <img src={addIcon} alt="addIcon" className={`w-5 h-5 mr-5 ${isDarkTheme ? 'invert hover:bg-gray-700' : 'hover:bg-gray-200'}`} style={{ borderRadius: '5px' }}/>
          <img src={filterIcon} alt="filterIcon" className={`w-5 h-5 mr-5 hover:border-r ${isDarkTheme ? 'invert hover:bg-gray-700' : 'hover:bg-gray-200'}`} style={{ borderRadius: '5px' }} />
          <img src={sortIcon} alt="sortIcon" className={`w-4 h-4 mr-5 hover:border-r ${isDarkTheme ? 'invert hover:bg-gray-700' : 'hover:bg-gray-200'}`} style={{ borderRadius: '5px' }}/>
          </div>
          <div className='mb-2 mt-4 lg:my-0 '>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`p-2 rounded-lg border w-full focus:outline-none ${
                isDarkTheme ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-800'
              }`}
            />
          </div>
        </div>
    <div className='w-full overflow-x-auto'>
      <table className="lg:min-w-full lg:table-auto">
        <thead>
          <tr className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-400'} border-b`}>
            <th className="px-4 py-2">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="cursor-pointer"
              />
            </th>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Project</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order.orderId} className={`hover:bg-gray-200 border-b ${isDarkTheme ? 'hover:bg-gray-700 border-gray-800' : 'hover:bg-gray-200 border-gray-100'}`}>
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedOrders.includes(order.orderId)}
                  onChange={() => handleSelectOrder(order.orderId)}
                  className="cursor-pointer"
                />
              </td>
              <td className="px-4 py-2">{order.orderId}</td>
              <td className="px-4 py-2">
                <span className="flex items-center">
                  <img src={order.profileImage} alt="userImage" className="w-6 h-6 rounded-full mr-2" />
                  {order.user}
                </span>
              </td>
              <td className="px-4 py-2">{order.project}</td>
              <td className="px-4 py-2">{order.address}</td>
              <td className="px-4 py-2">
                <span className="flex items-center">
                  <img src={calendarIcon} alt="calendarIcon" className={`w-5 h-5 rounded-full mr-2 ${isDarkTheme ? 'invert' : ''}`} />
                  {order.date}
                </span>
              </td>
              <td className="flex items-center px-4 py-2">
                <span className={`mr-2 h-2 w-2 rounded-full ${getStatusColor(order.status)} bg-current`}></span>
                <span className={getStatusColor(order.status)}>{order.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      <Pagination totalOrders={orderData.length} ordersPerPage={ordersPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

const getStatusColor = status => {
  switch (status) {
    case 'In Progress':
      return 'text-blue-500';
    case 'Complete':
      return 'text-green-500';
    case 'Pending':
      return 'text-yellow-500';
    case 'Rejected':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

export default OrderList;
