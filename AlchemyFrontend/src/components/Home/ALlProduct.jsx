    import React, { useState } from 'react';

    const products = [
        // {
        //     id: 1,
        //     img: "https://res.cloudinary.com/dnpn8ljki/image/upload/v1739856541/yosxx9atkd0k1mjfqxdz.jpg",
        //     hoverImg: "https://res.cloudinary.com/dnpn8ljki/image/upload/v1738683631/afuuzapiqhdnyflapzkx.jpg",
        //     rating: "4.8",
        //     reviews: "312",
        //     title: "Lenskart Air",
        //     size: "Medium • Essential Edit",
        //     price: "₹1500",
        //     oldPrice: "₹2000",
        //     discount: "25% OFF",
        //     colors: ["#A9A9A9", "#000000", "#1F2A44"] // Example color options
        // },
        // {
        //     id: 1,
        //     img: "https://res.cloudinary.com/dnpn8ljki/image/upload/v1739856541/yosxx9atkd0k1mjfqxdz.jpg",
        //     hoverImg: "https://res.cloudinary.com/dnpn8ljki/image/upload/v1738683631/afuuzapiqhdnyflapzkx.jpg",
        //     rating: "4.8",
        //     reviews: "312",
        //     title: "Lenskart Air",
        //     size: "Medium • Essential Edit",
        //     price: "₹1500",
        //     oldPrice: "₹2000",
        //     discount: "25% OFF",
        //     colors: ["#A9A9A9", "#000000", "#1F2A44"] 
        // },
    ];

    export default function AllProduct() {
        const categories = [];
        
        return (
            <div>
                <img src="https://res.cloudinary.com/dnpn8ljki/image/upload/v1740204891/category_uei1ci.webp" alt="category" />
                <div className="flex justify-center gap-6 p-4 bg-gray-100">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            className="px-6 py-3 bg-white shadow-md rounded-lg text-lg font-semibold hover:bg-gray-200 transition duration-300"
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Product Cards */}
                <div className="flex justify-evenly  my-6">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        );
    }

    function ProductCard({ product }) {
        const [isHovered, setIsHovered] = useState(false);

        return (
            <div 
            className="border rounded-lg shadow-lg w-72 p-4 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div className="relative">
                <img 
                    src={isHovered ? product.hoverImg : product.img} 
                    alt={product.title} 
                    className="w-full h-48 object-cover rounded-md transition-opacity duration-300"
                />
                {/* Favorite Button */}
                <button className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-red-50 hover:text-red-500 transition-colors duration-200">
                    ♡
                </button>
            </div>
        
            {/* Product Details */}
            <div className="mt-4">
                {/* Rating and Reviews */}
                <div className="flex items-center space-x-1">
                    <span className="text-blue-500 font-bold">{product.rating}</span>
                    <span className="text-yellow-400">★</span>
                    <span className="text-gray-500 ml-1">({product.reviews})</span>
                </div>
        
                {/* Product Title */}
                <h3 className="font-semibold text-lg mt-1">{product.title}</h3>
        
                {/* Product Size */}
                <p className="text-gray-500 text-sm mt-1">{product.size}</p>
        
                {/* Price and Discount */}
                <div className="flex items-center mt-2">
                    <span className="text-lg font-bold text-gray-800">{product.price}</span>
                    <span className="text-gray-400 line-through ml-2">{product.oldPrice}</span>
                    <span className="text-green-500 ml-2 font-semibold">{product.discount}</span>
                </div>
        
                {/* Color Options */}
                <div className="flex mt-3 space-x-2">
                    {product.colors.map((color, index) => (
                        <div 
                            key={index} 
                            className="w-6 h-6 rounded-full border-2 border-gray-200 hover:border-gray-400 transition-all duration-200"
                            style={{ backgroundColor: color }}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
        );
    }
