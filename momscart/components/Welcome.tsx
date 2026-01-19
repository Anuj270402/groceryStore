"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bike, ShoppingBasket } from "lucide-react";

interface WelcomeProps {
  nextstep: (s: number) => void;
}

const Welcome = ({ nextstep }: WelcomeProps) => {
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center gap-3"
      >
        <ShoppingBasket className="w-10 h-10 text-green-600" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700">
          MomsCart
        </h1>
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-4 text-gray-700 text-lg md:text-xl max-w-lg"
      >
        Your one-stop destination for fresh groceries, organic produce, and
        daily essentials delivered right to your doorstep.
      </motion.p>

      {/* Icons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex items-center justify-center gap-10 mt-10"
      >
        <ShoppingBasket className="w-24 h-24 md:w-32 md:h-32 text-green-600 drop-shadow-md" />
        <Bike className="w-24 h-24 md:w-32 md:h-32 text-orange-500 drop-shadow-md" />
      </motion.div>

      {/* CTA Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-10 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 
                   text-white font-semibold py-3 px-8 rounded-2xl shadow-md 
                   transition-all duration-200 focus:outline-none focus:ring-2 
                   focus:ring-green-400"
        onClick={() => nextstep(2)}
      >
        Next
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </div>
  );
};

export default Welcome;
