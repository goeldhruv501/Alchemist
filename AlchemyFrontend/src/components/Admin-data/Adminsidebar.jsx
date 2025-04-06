import React, { useState } from 'react';
import { Button } from "@mui/material";
import { RxDashboard } from "react-icons/rx";
import { LuUsersRound } from "react-icons/lu";
import { GrProductHunt } from "react-icons/gr";
import { IoBagCheckOutline } from "react-icons/io5";
import { SiMaxplanckgesellschaft, SiSellfy } from "react-icons/si";
import { CgLogOut } from "react-icons/cg";
import { FaAngleDown } from "react-icons/fa";
import { Collapse } from 'react-collapse';

import Dashboard from './Dashboard';
import User from './User';
import Product from './Product';
import ShopKeeper from './ShopKeeper';
import Order from './Order';
import Sales from './Sales';

import BlockUser from './BlockUser';
import ProductToBeAccessed from './ProductToBeAccessed';
import ActiveShopkeeper from './ActiveShopkeeper';
import OrderPending from './OrderPending';

const Adminsidebar = () => {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const [activeComponent, setActiveComponent] = useState('Dashboard');

  const toggleSubmenu = (index) => {
    setSubmenuIndex(submenuIndex === index ? null : index);
  };

  const menuItems = [
    {
      icon: <RxDashboard className='text-[20px]' />,
      label: 'Dashboard',
      component: 'Dashboard',
      submenu: null,
    },
    {
      icon: <LuUsersRound className='text-[20px]' />,
      label: 'User',
      submenu: [
        { label: 'Active User', component: 'User' },
        { label: 'Blocked User', component: 'BlockUser' },
      ],
    },
    {
      icon: <GrProductHunt className='text-[20px]' />,
      label: 'Product',
      submenu: [
        { label: 'All Products', component: 'Product' },
        { label: 'Products to be Accessed', component: 'ProductToBeAccessed' },
      ],
    },
    {
      icon: <SiSellfy className='text-[20px]' />,
      label: 'Shopkeeper',
      submenu: [
        { label: 'Blocked Shopkeeper', component: 'ShopKeeper' },
        { label: 'Active Shopkeeper', component: 'ActiveShopkeeper' },
      ],
    },
    {
      icon: <IoBagCheckOutline className='text-[20px]' />,
      label: 'Orders',
      submenu: [
        { label: 'Orders Done', component: 'Order' },
        { label: 'Orders Pending', component: 'OrderPending' },
      ],
    },
    {
      icon: <SiMaxplanckgesellschaft className='text-[20px]' />,
      label: 'Sales',
      component: 'Sales',
      submenu: null,
    },
    {
      icon: <CgLogOut className='text-[20px]' />,
      label: 'Logout',
      href: '/'
    },
  ];

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Dashboard': return <Dashboard />;
      case 'User': return <User />;
      case 'BlockUser': return <BlockUser />;
      case 'Product': return <Product />;
      case 'ProductToBeAccessed': return <ProductToBeAccessed />;
      case 'ShopKeeper': return <ShopKeeper />;
      case 'ActiveShopkeeper': return <ActiveShopkeeper />;
      case 'Order': return <Order />;
      case 'OrderPending': return <OrderPending />;
      case 'Sales': return <Sales />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className='flex'>

      {/* Sidebar */}
      <div className='sidebar bg-[#fff] w-[18%] min-h-screen border-r px-4 py-2'>
        <div className='py-2'>
          <h1 className='text-3xl font-bold'>SPECS</h1>
        </div>
        <ul className='mt-4'>
          {menuItems.map((item, index) => (
            <li key={index} className='mb-2'>
              {item.href ? (
                <a href={item.href}>
                  <Button className='w-full flex gap-3 !text-[15px] !capitalize !justify-start !text-gray-800 py-2 hover:bg-gray-200'>
                    {item.icon}
                    <span>{item.label}</span>
                  </Button>
                </a>
              ) : (
                <>
                  <Button
                    className='w-full flex gap-3 !text-[15px] !capitalize !justify-start !text-gray-800 py-2 hover:bg-gray-200'
                    onClick={() => {
                      if (item.submenu) {
                        toggleSubmenu(index);
                      } else {
                        setActiveComponent(item.component);
                      }
                    }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.submenu && (
                      <FaAngleDown className={`ml-auto transition-all ${submenuIndex === index ? 'rotate-180' : ''}`} />
                    )}
                  </Button>
                  {item.submenu && (
                    <Collapse isOpened={submenuIndex === index}>
                      <ul className='pl-4'>
                        {item.submenu.map((subItem, subIndex) => (
                          <li key={subIndex} className='mt-1'>
                            <button
                              className='w-full bg-gray-100 text-left px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-200'
                              onClick={() => setActiveComponent(subItem.component)}
                            >
                              {subItem.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </Collapse>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className='flex-1 p-8 bg-gray-100'>
        {renderComponent()}
      </div>

    </div>
  );
};

export default Adminsidebar;
