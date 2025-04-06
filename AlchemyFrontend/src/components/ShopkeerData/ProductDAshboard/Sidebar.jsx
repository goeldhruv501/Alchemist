import React, { useState } from 'react';
import { BiHome, BiStats, BiSmile, BiTask, BiMessage, BiHelpCircle, BiSolidCalendarPlus, BiCart } from "react-icons/bi";
import Dashboard from './Dashboard';
import AllProducts from './AllProducts';
import ViewStats from './ViewStats';
import ViewOrders from './ViewOrders';
import AddProducts from './../AddSpecs'; // Assuming you have this component

const ShopkeeperDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('Dashboard');

  // Function to render the active component
  const renderComponent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <Dashboard />;
      case 'AllProducts':
        return <AllProducts />;
      case 'ViewStats':
        return <ViewStats />;
      case 'ViewOrders':
        return <ViewOrders />;
      case 'AddProducts':
        return <AddProducts />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className='flex min-h-screen'>
      {/* Sidebar */}
      <div className='flex flex-col w-64 gap-6 p-4 bg-[#f5f5dc] text-[#8e6060] shadow-lg'>
        {/* Header */}
        <div className='flex items-center justify-center gap-4 p-4 rounded-xl bg-[#e4b9b9] shadow-md'>
          <BiSmile className='text-3xl text-white' />
          <h2 className='text-lg font-semibold text-white'>WELCOME</h2>
        </div>

        {/* Sidebar Links */}
        <div className='flex flex-col gap-4'>
          {[
            { icon: <BiHome className="text-xl" />, text: "Dashboard", component: 'Dashboard' },
            { icon: <BiTask className="text-xl" />, text: "All Products", component: 'AllProducts' },
            { icon: <BiStats className="text-xl" />, text: "View Stats", component: 'ViewStats' },
            { icon: <BiCart className="text-xl" />, text: "View Orders", component: 'ViewOrders' },
            { icon: <BiSolidCalendarPlus className="text-xl" />, text: "Add Products", component: 'AddProducts' }
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveComponent(item.component)}
              className='flex items-center gap-4 px-4 py-3 bg-white text-[#8e6060] rounded-xl shadow-md 
                        transition-all duration-300 hover:bg-[#27374d] hover:text-white hover:scale-105'
            >
              {item.icon}
              <span className="font-medium">{item.text}</span>
            </button>
          ))}
        </div>

        {/* Footer Links */}
        <div className='mt-auto flex flex-col gap-4'>
          {[
            { icon: <BiMessage className="text-xl" />, text: "Messages", component: 'Messages' },
            { icon: <BiHelpCircle className="text-xl" />, text: "Help", component: 'Help' }
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveComponent(item.component)}
              className='flex items-center gap-4 px-4 py-3 bg-white text-[#8e6060] rounded-xl shadow-md 
                        transition-all duration-300 hover:bg-[#27374d] hover:text-white hover:scale-105'
            >
              {item.icon}
              <span className="font-medium">{item.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 p-8 bg-gray-100'>
        {renderComponent()}
      </div>
    </div>
  );
};

export default ShopkeeperDashboard;