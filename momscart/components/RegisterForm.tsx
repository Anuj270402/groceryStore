"use client";
import {
  ArrowLeft,
  EyeIcon,
  EyeOff,
  Leaf,
  Loader2,
  Lock,
  LogIn,
  Mail,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import Google from "@/assets/GoogleIcon.png";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
interface previousStep {
  prev: (s: number) => void;
}
const RegisterForm = ({ prev }: previousStep) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showpassword, setShowpassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useRouter()
  const handleRegister = async () => {
    setLoading(true)
    try {
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white relative">
      <div className="absolute top-6 left-6 flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors cursor-pointer">
        <ArrowLeft className="h-5 w-5 " />
        <span onClick={() => prev(1)}>Back</span>
      </div>
      <motion.h1
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-green-700 mb-2"
      >
        Create Account
      </motion.h1>
      <motion.p
        initial={{ y: -5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-gray-600 mb-8 flex items-center"
      >
        Join MomsCart today <Leaf className="w-5 h-5 text-green-500" />{" "}
      </motion.p>
      <motion.form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-5 w-full max-w-sm"
      >
        <div className="relative">
          <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Your Name"
            required
            onChange={(e) => setname(e.target.value)}
            className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Your Email"
            required
            onChange={(e) => setemail(e.target.value)}
            className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type={showpassword ? "text" : "password"}
            name="password"
            value={password}
            placeholder="Your Password"
            required
            onChange={(e) => setpassword(e.target.value)}
            className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {showpassword ? (
            <EyeOff
              onClick={() => setShowpassword(false)}
              className="absolute right-3 top-3.5 w-5 h-5 text-gray-500 cursor-pointer "
            />
          ) : (
            <EyeIcon
              onClick={() => setShowpassword(true)}
              className="absolute right-3 top-3.5 w-5 h-5 text-gray-500 cursor-pointer "
            />
          )}
        </div>
        {(() => {
          const formValidation = name !== "" && email !== "" && password !== "";
          return (
            <button
              disabled={!formValidation || loading}
              className={`w-full font-semibold py-3 rounded-xl transition-all duration-200 shadow-md inline-flex items-center justify-center gap-2 ${formValidation
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-300 hover:bg-gray-500 cursor-not-allowed"
                } `}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating...
                </>
              ) : (
                "Register"
              )}
            </button>
          );
        })()}
        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mt-2">
          <span className="flex-1 h-px bg-gray-200"></span>
          OR
          <span className="flex-1 h-px bg-gray-200"></span>
        </div>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:border-gray-50 py-3 rounded-xl text-gray-700 font-medium transition-all duration-200"
        >
          <Image src={Google} alt="google image" width={24} height={24} />
          Continue with Google
        </button>

      </motion.form>
      <p onClick={() => navigate.push("/login")} className="text-gray-600 mt-6 text-sm flex items-center gap-1">
        Already have an account ? <LogIn className="w-4 h-4 " />
        <span className="text-green-600 cursor-pointer">Sign in</span>
      </p>
    </div>
  );
};

export default RegisterForm;
