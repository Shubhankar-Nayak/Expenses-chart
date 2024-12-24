import { useState, useEffect ,useRef } from 'react';
import Chart from 'chart.js/auto';
import './App.css';
import info from './assets/data.json';
import logo from './assets/images/logo.svg'

function App() {
  const chartRef = useRef(null);

  useEffect(() => {
    const maxAmount = Math.max(...info.map((item) => item.amount));
    
    const chart = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: info.map((item) => item.day),
        datasets: [
          {
            label: '',
            data: info.map((item) => item.amount),
            backgroundColor: info.map((item) =>
              item.amount === maxAmount ? "hsl(186, 34%, 60%)" : "hsl(10, 79%, 65%)" 
            ),
            borderWidth: 1,
            borderRadius: {
              topLeft: 5,
              topRight: 5,
              bottomLeft: 5, 
              bottomRight: 5,
            },
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
          },
          y: {
            display: false, 
              grid: {
                display: false, 
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center gap-5 font-DMSans'>
      <div className='w-[90%] h-fit laptop:max-w-[540px] laptop:max-h-[80px] bg-SoftRed px-5 py-5 flex justify-between items-center rounded-xl'>
        <div className='text-white'>
          <p>My balance</p>
          <h1 className='text-[25px] font-semibold'>$921.48</h1>
        </div>
        <img src={logo} alt="logo" />
      </div>
      <div className='w-[90%] h-fit laptop:max-w-[540px] laptop:max-h-[580px] bg-white px-5 py-5 rounded-xl'>
        <h1 className='text-[25px] text-DarkBrown font-bold mb-10'>Spending - Last 7 days</h1>
        <canvas ref={chartRef}></canvas>
        <div className='flex justify-between items-end border-t-[3px] border-Cream pt-5 mt-5'>
          <div>
            <p className='text-MediumBrown font-medium'>Total this month</p>
            <h1 className='text-[30px] tablet:text-[40px] text-DarkBrown font-bold'>$478.33</h1>
          </div>
          <div>
            <p className='text-DarkBrown text-right font-bold'>+2.4%</p>
            <p className='text-MediumBrown font-medium'>from last month</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
