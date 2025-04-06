import React from 'react';
import Addpecs from './AddSpecs';

export default function AllDetails() {
  return (
    <div className=" bg-gray-100">
      {/* Header Section */}
      <div className="flex justify-between items-center px-10 py-6 bg-white shadow-md">
        <h1 className="text-6xl font-extrabold text-gray-800">Lenskart</h1>
        <img
          src="https://img-cdn.thepublive.com/fit-in/640x430/filters:format(webp)/entrackr/media/post_attachments/wp-content/uploads/2017/12/Lenskart-image.jpg"
          alt="Lenskart Logo"
          className="w-24 h-20 rounded-full object-cover border-2 border-gray-300"
        />
      </div>
      <Addpecs/>
    </div>
  );
}
