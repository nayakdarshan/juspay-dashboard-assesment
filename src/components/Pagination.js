import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';
import LeftArrowIcon from '../assets/icons/leftArrow.png';
import RightArrowIcon from '../assets/icons/rightArrow.png';

const Pagination = ({ totalOrders, ordersPerPage, currentPage, setCurrentPage }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalOrders / ordersPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <nav>
      <ul className="flex justify-end items-center mt-4">
        <li className="mx-1">
          <button
            onClick={handlePreviousPage}
            className={`px-3 py-1 rounded-lg ${
              currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-300'
            } ${isDarkTheme ? 'text-gray-400 hover:bg-gray-600 invert' : 'text-gray-800 hover:bg-gray-200'}`}
            disabled={currentPage === 1}
          >
            <img src={LeftArrowIcon} alt="Previous" className="w-5 h-5" />
          </button>
        </li>

        {pageNumbers.map((number) => (
          <li key={number} className="mx-1">
            <button
              onClick={() => setCurrentPage(number)}
              className={`px-3 py-1 rounded-lg ${
                currentPage === number
                  ? isDarkTheme
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-300 text-black'
                  : isDarkTheme
                  ? 'text-gray-400 hover:bg-gray-600'
                  : 'text-gray-800 hover:bg-gray-200'
              }`}
            >
              {number}
            </button>
          </li>
        ))}

        <li className="mx-1">
          <button
            onClick={handleNextPage}
            className={`px-3 py-1 rounded-lg ${
              currentPage === pageNumbers.length ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-300'
            } ${isDarkTheme ? 'text-gray-400 hover:bg-gray-600 invert' : 'text-gray-800 hover:bg-gray-200'}`}
            disabled={currentPage === pageNumbers.length}
          >
            <img src={RightArrowIcon} alt="Next" className="w-5 h-5" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
