"use client";

import { Leaf, ShoppingBasket, Smartphone, Truck } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export function HeroSection() {
  const slides = [
    {
      id: 1,
      icon: <Leaf className="w-20 h-20 sm:w-28 sm:h-28 text-green-400 drop-shadow-lg" />,
      title: "Fresh Organic Groceries 🥦",
      subtitle: "Farm-fresh fruits, vegetables, and daily essentials delivered to you.",
      btnText: "Shop Now",
      bg: "https://images.unsplash.com/photo-1610636996379-4d184e2ef20a?q=80&w=638&auto=format&fit=crop",
    },
    {
      id: 2,
      icon: <Truck className="w-20 h-20 sm:w-28 sm:h-28 text-yellow-400 drop-shadow-lg" />,
      title: "Fast & Reliable Delivery 🚚",
      subtitle: "We ensure quick delivery right to your doorstep, every time.",
      btnText: "Order Now",
      bg: "https://images.unsplash.com/photo-1657288649124-b80bdee3c17e?q=80&w=1171&auto=format&fit=crop",
    },
    {
      id: 3,
      icon: <Smartphone className="w-20 h-20 sm:w-28 sm:h-28 text-blue-400 drop-shadow-lg" />,
      title: "Shop Anytime, Anywhere 📱",
      subtitle: "Easy and seamless online shopping experience.",
      btnText: "Get Started",
      bg: "https://plus.unsplash.com/premium_photo-1663047856766-6fe0b0309ddb?q=80&w=1170&auto=format&fit=crop",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-[98%] mx-auto mt-32 h-[88vh] rounded-3xl overflow-hidden shadow-2xl">
      
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[currentSlide].id} // ✅ REQUIRED
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].bg}
            alt="hero"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            key={slides[currentSlide].id}
            className="flex flex-col items-center justify-center gap-6 max-w-3xl"
          >
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-full shadow-lg">
              {slides[currentSlide].icon}
            </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg ">
            {slides[currentSlide].title}
          </h1>
           <p className="text-gray-200 max-w-2xl sm:text-2xl text-lg">
            {slides[currentSlide].subtitle}
          </p>
          <motion.button 
          whileHover={{scale:0.9}}
            whileTap={{scale:0.96}}
            transition={{duration:0.2}}
          className="mt-4 bg-white text-green-700 hover:bg-green-100 px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 flex items-center gap-2">
            <ShoppingBasket className="w-5 h-5" />
            {slides[currentSlide].btnText}
          </motion.button>
          </motion.div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3  ">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
