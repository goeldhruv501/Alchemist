import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { localhostURL } from '../../../components/url';

export default function Dashboard() {
  const [shopkeeper, setShopkeeper] = useState(null);


  useEffect(() => {
    const fetchShopkeeperData = async () => {
      try {
        const ShopKeeperid = sessionStorage.getItem('ShopKeeperid');
        const response = await axios.get(`${localhostURL}GetShopkkperData/${ShopKeeperid}`);
        console.log(`${localhostURL}GetShopkkperData/${ShopKeeperid}`)
        setShopkeeper(response.data.data);
      } catch (error) {
        console.error("Error fetching shopkeeper data:", error);
      }
    };

    fetchShopkeeperData();
  }, []);



  if (!shopkeeper) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <img 
          src={shopkeeper.profileImg || "https://via.placeholder.com/150"} 
          alt="User" 
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold text-gray-800">{shopkeeper.name}</h2>
        <p className="text-gray-600 mt-2">{shopkeeper.shopkeeperdescription || "No description provided."}</p>
      </div>
    </div>
  );
}
