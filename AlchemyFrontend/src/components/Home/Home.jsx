import React from 'react';
import CreateCard from "./CreateCard";
import Slider from "../Home/Slider";
import Slider2 from "../Home/Slider2";
import ALlProduct from "../Home/ALlProduct";
import sunglass from "../../assets/images/sunglass.png";
import screenglass from "../../assets/images/screenglasses.png";
import powersunglass from "../../assets/images/powersunglass.png";
import glasses from "../../assets/images/zero power.png";

const Productdata = [
  { img: [sunglass], hoverImg: screenglass, rating: '4.1', price: '₹499.00', alt: "sunglass", des: "50-80%OFF" },
  { img: [screenglass], hoverImg: sunglass, rating: '4.1', price: '₹499.00', alt: "screenglass", des: "40-80%OFF" },
  { img: [powersunglass], hoverImg: glasses, rating: '4.1', price: '₹499.00', alt: "powerglasses", des: "30-40%OFF" },
  { img: [glasses], hoverImg: powersunglass, rating: '4.1', price: '₹499.00', alt: "glasses", des: "10-60%OFF" }
];

export default function Home() {
  return (
    <div className="flex flex-col gap-0 bg-[#111111] text-white">
      
      {/* CREATE CARD */}
      <div className="pt-6 px-4">
        <CreateCard />
      </div>

      {/* SLIDER 1 */}
      <div className="mt-6 px-4">
        <Slider />
      </div>

      {/* BANNER */}
      <div
        className="relative bg-cover bg-center bg-no-repeat h-[500px] mt-10"
        style={{
          backgroundImage: `url('https://i.pinimg.com/736x/70/05/f3/7005f311ba76b4ada33262427dcd3d72.jpg')`,
        }}
      >
        <div className="flex justify-start items-center h-full px-8 text-left">
          <div className="transform -translate-y-10 -translate-x-4">
            <h1 className="text-5xl font-extrabold tracking-tight text-zinc-100 drop-shadow-lg">
              <span className="text-red-600">Gamify</span> Your <span className="text-gray-300">Goals</span>
            </h1>
            <p className="text-lg font-medium text-gray-400 mt-2 italic">
              Smarter. Sharper. You.
            </p>
          </div>
        </div>
      </div>

      {/* SLIDER 2 */}
      <div className="mt-10 px-4">
        <Slider2 />
      </div>

      {/* PRODUCTS */}
      <div className="mt-12 px-4">
        <ALlProduct />
      </div>
    </div>
  );
}
