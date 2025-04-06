import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "https://i.pinimg.com/736x/20/3f/28/203f281ea232d1f6194b108e3fca64d4.jpg",
  "https://i.pinimg.com/736x/8f/1b/3d/8f1b3deb485faaf274432e24dea7985d.jpg",
  "https://i.pinimg.com/736x/2b/49/a9/2b49a9414beeabc5e4fb48e04f695305.jpg",
];

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="relative w-full h-[400px] overflow-hidden mt-6">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[currentIndex]}
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
      >
        <FaChevronLeft size={20} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
}
