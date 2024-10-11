import React, { useEffect, useState, useContext } from 'react';
import data from '../staticData/EcommerceData.json';
import { Bar,Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import UpArrowIcon from '../assets/icons/upward.png';
import DownArrowIcon from '../assets/icons/downward.png';
import { ThemeContext } from '../ThemeProvider';
// import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
// import { scaleLinear } from 'd3-scale';
import { Chart, registerables } from 'chart.js';
import WorldMap from "react-svg-worldmap";

Chart.register(...registerables);
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

// const geoUrl = "https://raw.githubusercontent.com/harshkarna/country-geojson/master/countries.geojson";

function Ecommerce() {
  const { isDarkTheme } = useContext(ThemeContext);
  const [ecommerceData, setEcommerceData] = useState(null);

  useEffect(() => {
    setEcommerceData(data);
  }, []);

  if (!ecommerceData) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: ecommerceData.chart.months || [],
    datasets: [
      {
        label: 'Projections',
        data: ecommerceData.chart.projections || [],
        backgroundColor: '#A8C5DA',
        borderColor: '#A8C5DA',
        borderWidth: 1,
        barThickness: 30,
      },
      {
        label: 'Actuals',
        data: ecommerceData.chart.actuals || [],
        backgroundColor: '#CBDBE7',
        borderColor: '#CBDBE7',
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        ticks: {
          callback: function (value) {
            return `${value}M`;
          },
        },
      },
    },
  };
  const revenueComparison = ecommerceData.revenueComparison || {};
  const revenueData = {
    labels: revenueComparison.months || [],
    datasets: [
      {
        label: 'Current Week',
        data: revenueComparison.currentWeek,
        fill:false,
        borderColor: '#000000',
        tension: 0.2,
      },
      {
        label: 'Past Week',
        data: revenueComparison.previousWeek,
        fill:false,
        borderColor: '#A8C5DA',
        tension: 0.2

      },
    ],
  };

  const revenueOptions = {
    type:'line',
    data: revenueData,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
        x: {
          stacked: false,
          grid: { display: false },

        },
        y: {
          stacked: false,
          grid: { display: true },
          ticks: {
            callback: function (value) {
              return `${value}M`;
            },
          },
        },
      },
  };

  const totalSalesData = {
    labels: Object.keys(ecommerceData.totalSalesBreakdown || {}),
    datasets: [
      {
        data: Object.values(ecommerceData.totalSalesBreakdown || {}),
        backgroundColor: ['#A8C5DA', '#CBDBE7', '#9BC0E3', '#A1DBF5'],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    cutout: '60%',
    plugins: {
      legend: {
        display: false,
      },
    },
    // elements: {
    //   arc: {
    //     borderRadius: 50
    //   },
    // },
  };
  const CountryData = data.locations.map((loc) => ({
    country: loc.code,
    value: loc.revenue,
  }));
  
  
  return (
    <>
      <h4 className={`text-lg font-semibold ${isDarkTheme ? 'text-gray-300' : 'text-gray-800'}`}>eCommerce</h4>
      <div className={`flex flex-col lg:flex-row gap-4 p-6 ${isDarkTheme ? 'bg-[#1C1C1C]' : 'bg-white'}`}>
        
        {/* First Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 flex-1">
          {ecommerceData.cards && ecommerceData.cards.length > 0 ? (
            ecommerceData.cards.map((card, index) => {
              const isSameColor = card.lightThemeCardBg === card.darkThemeCardBg;
              const cardBgColor = isDarkTheme ? card.darkThemeCardBg : card.lightThemeCardBg;
              const textColor = isDarkTheme && !isSameColor ? 'text-white' : 'text-black';

              return (
                <div
                  key={index}
                  className="flex flex-col justify-between p-4 rounded-lg border-gray-300"
                  style={{
                    backgroundColor: cardBgColor,
                    borderRadius: '16px',
                  }}
                >
                  <div className={`text-dark text-lg font-semibold ${textColor}`}>
                    {card.title}
                  </div>
                  <div className="flex-grow"></div>
                  <div className="flex items-center justify-between mt-2">
                    <div className={`text-3xl font-bold ${textColor}`}>
                      {card.count}
                    </div>
                    <div className="flex items-center space-x-2 text-black-500 text-sm">
                      <span className={`text-sm ${textColor}`}>
                        {card.percentage}%
                      </span>
                      <img
                        src={card.isPositive ? UpArrowIcon : DownArrowIcon}
                        alt={card.isPositive ? "Upward trend" : "Downward trend"}
                        className={`w-4 h-4 ${isDarkTheme && !isSameColor ? 'filter invert' : ''}`}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No data available</div>
          )}
        </div>

        <div
          className={`lg:w-1/2 p-6 flex flex-col justify-between ${isDarkTheme ? 'bg-[#282828]' : 'bg-gray-100'}`}
          style={{ borderRadius: '16px' }}
        >
          <div className={`text-dark text-lg font-semibold mb-4 ${isDarkTheme ? 'text-gray-300' : 'text-gray-800'}`}>
            Projection vs Actuals
          </div>
          <div className="flex-grow"></div>
          <div className="flex justify-center">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

     {/* Second Row */}
<div className="flex flex-col lg:flex-row gap-4 p-6">
  <div className={`lg:w-4/6 p-6 flex flex-col justify-between ${isDarkTheme ? 'bg-[#282828]' : 'bg-gray-100'}`} style={{ borderRadius: '16px' }}>
    <div className={`text-lg font-semibold mb-4 flex gap-4 items-center ${isDarkTheme ? 'text-gray-300' : 'text-gray-800'}`}>
        <span className='border-r-2 pr-2'>Revenue</span>
        <span className={`text-sm flex items-center gap-2 ${isDarkTheme ? 'text-white-400' : 'text-black-500'}`}> 
            <div style={{ width: '10px', height: '10px', backgroundColor: '#000000', borderRadius: '50%' }}></div>
            Current Week 
            <span className={`text-lg font-semibold ${isDarkTheme ? 'text-gray-300' : 'text-gray-800'}`}>{revenueComparison.currentWeekAmount}</span>
        </span>
        <span className={`text-sm flex items-center gap-2 ${isDarkTheme ? 'text-white-400' : 'text-black-500'}`}> 
            <div style={{ width: '10px', height: '10px', backgroundColor: '#A8C5DA', borderRadius: '50%' }}></div>
            Previous Week 
            <span className={`text-lg font-semibold ${isDarkTheme ? 'text-gray-300' : 'text-gray-800'}`}>{revenueComparison.previousWeekAmount}</span>
        </span>
    </div>
    <Line data={revenueData} options={revenueOptions} />
  </div>

  {/* <div className={`lg:w-2/5 p-6 flex flex-col justify-between ${isDarkTheme ? 'bg-[#282828]' : 'bg-gray-100'}`} style={{ borderRadius: '16px' }}>
    <div className={`text-lg font-semibold mb-4 ${isDarkTheme ? 'text-gray-300' : 'text-gray-800'}`}>
      Revenue by Location
    </div>
    <ComposableMap projection="geoMercator" style={{ width: "100%", height: "400px" }}>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => {
            const revenueLocation = ecommerceData.locations.find(location => location.location === geo.properties.name);
            const fillColor = revenueLocation ? scaleLinear()
              .domain([0, Math.max(...ecommerceData.locations.map(loc => loc.revenue))])
              .range(["#d6e9f7", "#31708f"])(revenueLocation.revenue) : "#f0f0f0";

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={fillColor}
                stroke="#ffffff"
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none", fill: "#ff5722" },
                  pressed: { outline: "none" }
                }}
              />
            );
          })
        }
      </Geographies>
      {ecommerceData.locations.map(({ location, revenue }, index) => (
        <Marker key={index} coordinates={getCoordinates(location)}>
          <circle r={5} fill="#FF5722" />
          <text textAnchor="middle" y={-10} style={{ fontSize: "10px", fill: "#FFFFFF" }}>{`${revenue}M`}</text>
        </Marker>
      ))}
    </ComposableMap>
  </div> */}
   <div className={`lg:w-2/6 p-6 flex flex-col justify-between ${isDarkTheme ? 'bg-[#282828]' : 'bg-gray-100'}`} style={{ borderRadius: '16px' }}>
  <div className={`text-lg font-semibold mb-4 ${isDarkTheme ? 'text-gray-300' : 'text-gray-800'}`}>
    Revenue by Location
  </div>
  <div className={`flex-grow flex items-center justify-center p-2`} style={{ borderRadius: '12px'}}>
  <WorldMap
  color="#A8C5DA" 
  borderColor={isDarkTheme ? "#FFFFFF" : "#000000"}
  size="sm"
  data={CountryData}
  style={{ width: '100%', backgroundColor: `${isDarkTheme ? '#1C1C1C' : 'white'}` }}
/>

    </div>
    <ul className="text-gray-600">
    {ecommerceData.locations && ecommerceData.locations.length > 0 ? (
      ecommerceData.locations.map((location, index) => (
        <li key={index} className={`flex flex-col mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-800'}`}>
          <div className="flex justify-between mb-2">
            <span>{location.location}</span>
            <span>{location.revenue}M</span>
          </div>
          <div className="relative w-full bg-gray-300 rounded-full "style={{ height: '10px' }}>
          <div
            className="absolute h-full bg-[#A8C5DA] rounded-full"
            style={{ width: `${location.revenue}%`}}
          />
        </div>

        </li>
      ))
    ) : (
      <div>No location data available</div>
    )}
  </ul>
        </div>
    </div>


      {/* Third Row */}
      <div className="flex flex-col lg:flex-row gap-4 p-6">
      <div className={`lg:w-5/6 p-6 flex flex-col ${isDarkTheme ? 'bg-[#282828]' : 'bg-gray-100'}`} style={{ borderRadius: '16px' }}>
  <div className={`text-lg font-semibold mb-5 ${isDarkTheme ? 'text-gray-300' : 'text-gray-800'}`}>
    Top Selling Products
  </div>
  <table className={`min-w-full mt-5 ${isDarkTheme ? 'text-gray-300' : 'text-gray-800'}`}>
    <thead>
      <tr className='border-b'>
        <th className={`text-left px-4 py-2`}>Name</th>
        <th className={`text-left px-4 py-2`}>Price</th>
        <th className={`text-left px-4 py-2`}>Quantity</th>
        <th className={`text-left px-4 py-2`}>Amount</th>

      </tr>
    </thead>
    <tbody>
      {ecommerceData.topSellingProducts.map((product, index) => (
        <tr key={index}>
          <td className={`px-4 py-2`}>{product.name}</td>
          <td className={`px-4 py-2`}>${product.price}</td>
          <td className={`px-4 py-2`}>{product.quantity}</td>
          <td className={`px-4 py-2`}>${product.amount}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


        <div className={`lg:w-2/6 p-6 flex flex-col justify-between ${isDarkTheme ? 'bg-[#282828]' : 'bg-gray-100'}`} style={{ borderRadius: '16px' }}>
          <div className={`text-lg font-semibold mb-4 ${isDarkTheme ? 'text-gray-300' : 'text-gray-800'}`}>
            Total Sales Breakdown
          </div>
          <div style={{ width: '100%',height:'45%' }} className='flex justify-center items-center'>
            <Doughnut  data={totalSalesData} options={doughnutOptions} />
          </div>
          <ul className="mt-4">
          {totalSalesData.labels.map((label, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: totalSalesData.datasets[0].backgroundColor[index],
                    borderRadius: '50%',
                    marginRight: '8px',
                  }}
                />
                <span className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-800'}`}>
                  {label}
                </span>
              </div>
              <span className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-800'}`}>
                ${totalSalesData.datasets[0].data[index]}
              </span>
            </li>
          ))}
        </ul>
        </div>

      </div>
    </>
  );
}

// const getCoordinates = (location) => {
//   const coordinatesMap = {
//     "New York": [-74.006, 40.7128],
//     "San Francisco": [-122.4194, 37.7749],
//     "Sydney": [151.2093, -33.8688],
//     "Singapore": [103.8198, 1.3521],
//   };
//   return coordinatesMap[location] || [0, 0]; // Default to [0, 0] if location not found
// };

export default Ecommerce;
