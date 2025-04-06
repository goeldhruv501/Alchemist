import React from 'react';
import { motion } from 'framer-motion';

import sunglass from "../../assets/images/sunglass.png";
import sunglasss2 from "../../assets/images/sunglasss2.png";
import screenglasses from "../../assets/images/screenglasses.png";
import contact from "../../assets/images/contact.png";
import powersunglass from "../../assets/images/powersunglass.png";
import power from "../../assets/images/zero power.png";

export default function CreateCard() {
  const card = [
    { img: sunglass },
    { img: sunglasss2 },
    { img: screenglasses },
    { img: power },
    { img: powersunglass },
    { img: contact },
  ];

  return (
    <div className="bg-black w-full py-6 px-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {card.map((value, key) => (
          <motion.div
            key={key}
            whileHover={{ scale: 1.04 }}
            className="w-full aspect-square rounded-xl bg-[#111111] shadow-md shadow-gray-800 border border-gray-700 p-3 flex items-center justify-center"
          >
            <img
              src={value.img}
              alt={`Card ${key}`}
              className="h-full max-h-[80%] object-contain"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
