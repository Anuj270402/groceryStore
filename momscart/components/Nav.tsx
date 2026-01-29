"use client";

import {
  X,
  LogOut,
  Package,
  Search,
  ShoppingCartIcon,
  User,
  PlusCircle,
  Boxes,
  ClipboardCheck,
  Menu,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { createPortal } from "react-dom";

interface IUser {
  id?: string;
  name: string;
  email: string;
  role: "user" | "admin" | "deliveryBoy";
  image?: string | null;
}

export function Nav({ user }: { user?: IUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const sidebar = typeof window !== "undefined"
    ? createPortal(
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 14 }}
            className="fixed top-0 left-0 h-full w-[75%] sm:w-[60%] z-[9999] 
              bg-gradient-to-b from-green-800/90 via-green-700/80 to-green-900/90 
              backdrop-blur-xl shadow-2xl p-6 text-white"
          >
            <div className="flex justify-between items-center mb-2">
              <h1 className="font-extrabold text-2xl tracking-wide text-white/90 ">
                Admin Panel
              </h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-white/80 hover:text-red-400 text-2xl font-bold transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex items-center gap-3 p-3 mt-3 rounded-xl bg-white/20 hover:bg-white/15 transition-all shadow-inner">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-green-400/60 shadow-lg">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt="user"
                    fill
                    className="object-cover rounded-full"
                  />
                ) : (
                  <User className="w-6 h-6 text-gray-600" />
                )}
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">
                  {user?.name}
                </h2>
                <p className="text-xs text-green-200 capitalize tracking-wide">
                  {user?.role}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 font-medium mt-6">
              <Link
                href=""
                className="flex items-center gap-3 rounded-lg bg-white/10 hover:bg-white/30 hover:pl-4 transition-all"
              >
                <PlusCircle className="w-5 h-5" />
                Add Grocery
              </Link>

              <Link
                href=""
                className="flex items-center gap-3 rounded-lg bg-white/10 hover:bg-white/30 hover:pl-4 transition-all"
              >
                <Boxes className="w-5 h-5" />
                View Grocery
              </Link>

              <Link
                href=""
                className="flex items-center gap-3 rounded-lg bg-white/10 hover:bg-white/80 hover:pl-4 transition-all"
              >
                <ClipboardCheck className="w-5 h-5" />
                Manage Grocery
              </Link>
            </div>
<div className="my-5 border-t border-white/20"></div>
<div
  className="flex items-center gap-3 text-red-300 font-semibold mt-auto hover:bg-red-500/20 p-3 rounded-lg transition-all"
  onClick={async () => await signOut({callbackUrl:"/"})}
>
  <LogOut className="w-5 h-5" />
  Log out
</div>

          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )
    : null;

  return (
    <>
      <div className="w-[95%] fixed top-4 left-1/2 -translate-x-1/2 
      bg-gradient-to-r from-green-500 to-green-700 
      rounded-2xl shadow-lg flex justify-between items-center 
      h-20 px-4 md:px-8 z-50">

        <Link
          href="/"
          className="text-white font-extrabold text-2xl sm:text-3xl"
        >
          MomsCart
        </Link>

        {user?.role === "user" && (
          <form className="hidden md:flex items-center bg-white rounded-full px-4 py-2 w-1/2 max-w-lg shadow-md">
            <Search className="w-5 h-5 text-gray-500 mr-2" />
            <input
              className="w-full outline-none"
              placeholder="Search Groceries"
            />
          </form>
        )}

        <div className="flex items-center gap-4">
          {user?.role === "user" && (
            <>
              <button
                onClick={() => setSearchOpen((p) => !p)}
                className="md:hidden bg-white rounded-full w-11 h-11 flex items-center justify-center"
              >
                <Search className="w-6 h-6 text-green-600" />
              </button>

              <Link
                href="/cart"
                className="relative bg-white rounded-full w-11 h-11 flex items-center justify-center"
              >
                <ShoppingCartIcon className="w-6 h-6 text-green-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  0
                </span>
              </Link>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <div className="hidden md:flex items-center gap-4"> <Link href={""} className="flex items-center gap-2 bg-white text-green-700 font-semibold px-4 py-2 rounded-full hover:bg-green-100 transition-all" ><PlusCircle className="w-5 h-5" /> Add Grocery</Link> <Link href={""} className="flex items-center gap-2 bg-white text-green-700 font-semibold px-4 py-2 rounded-full hover:bg-green-100 transition-all" ><Boxes className="w-5 h-5" /> View Grocery</Link> <Link href={""} className="flex items-center gap-2 bg-white text-green-700 font-semibold px-4 py-2 rounded-full hover:bg-green-100 transition-all" ><ClipboardCheck className="w-5 h-5" /> Manage Grocery</Link>
              </div>

              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden bg-white rounded-full w-11 h-11 flex items-center justify-center"
              >
                <Menu className="w-6 h-6 text-green-600" />
              </button>
            </>
          )}

          <div ref={profileRef} className="relative">
            <div
              onClick={() => setMenuOpen((p) => !p)}
              className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center cursor-pointer"
            >
              {user?.image ? (
                <Image src={user.image} alt="user" fill className="object-cover" />
              ) : (
                <User className="w-6 h-6 text-gray-600" />
              )}
            </div>

            <AnimatePresence>
              {menuOpen && user && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl"
                >
                  <div className="px-3 py-2 border-b">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">
                      {user.role}
                    </p>
                  </div>

                  {user.role === "user" && (
                    <Link
                      href="/orders"
                      className="flex items-center gap-2 px-3 py-2 hover:bg-green-50"
                    >
                      <Package className="w-5 h-5 text-green-600" />
                      My Orders
                    </Link>
                  )}

                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="flex w-full items-center gap-2 px-3 py-2 hover:bg-red-50"
                  >
                    <LogOut className="w-5 h-5 text-red-600" />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            ref={searchRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] 
            bg-white rounded-full shadow-lg z-40 flex px-4 py-2"
          >
            <Search className="w-5 h-5 text-gray-500 mr-2" />
            <input className="w-full outline-none" placeholder="Search Groceries" />
            <X
              className="w-5 h-5 cursor-pointer"
              onClick={() => setSearchOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {sidebar}
    </>
  );
}
