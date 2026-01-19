"use client";

import { Search, ShoppingCartIcon, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

interface IUser {
  id?: string;
  name: string;
  email: string;
  password?: string;
  mobile?: string;
  role: "user" | "admin" | "deliveryBoy";
  image?: string | null;
}

export function Nav({ user }: { user: IUser }) {
  const [menuopen, setmenuopen] = useState(false)

  return (
    <div className="w-[95%] fixed top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-green-700 rounded-2xl shadow-lg shadow-black/30 flex justify-between items-center h-20 px-4 md:px-8 z-50">

      <Link
        href="/"
        className="text-white font-extrabold text-2xl sm:text-3xl tracking-wide hover:scale-105 transition-transform"
      >
        MomsCart
      </Link>

      <form className="hidden md:flex items-center bg-white rounded-full px-4 py-2 w-1/2 max-w-lg shadow-md">
        <Search className="text-gray-500 w-5 h-5 mr-2" />
        <input
          type="text"
          placeholder="Search Groceries"
          className="w-full outline-none text-gray-700 placeholder-gray-400"
        />
      </form>

      <div className="flex items-center gap-3 md:gap-6">

        {/* CART */}
        <Link
          href=""
          className="relative bg-white rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:scale-105 transition"
        >
          <ShoppingCartIcon className="text-green-600 w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold shadow">
            0
          </span>
        </Link>
        <div>
          
          <div onClick={() => setmenuopen(prev => !prev)} className="relative w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center hover:scale-105 transition-transform  ">
            {user.image ? (
              <Image
                src={user.image}
                alt="user"
                fill
                className="object-cover"
              />
            ) : (
              <User className="w-6 h-6 text-gray-600" />
            )}
          </div>
          <AnimatePresence>
          {menuopen && }
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
