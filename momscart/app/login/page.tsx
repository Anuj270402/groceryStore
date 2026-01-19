"use client";

import {
  EyeIcon,
  EyeOff,
  Leaf,
  Loader2,
  Lock,
  LogIn,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";
import React, { FormEvent, useState } from "react";
import Image from "next/image";
import Google from "@/assets/GoogleIcon.png";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showpassword, setShowpassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useRouter();
  const session = useSession();
  console.log(session);

  const handlelogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/", // ✅ REQUIRED
      });

      if (res?.ok) {
        navigate.push("/"); // ✅ redirect works now
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white relative">
      <motion.h1
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-green-700 mb-2"
      >
        Welcome Back
      </motion.h1>

      <motion.p
        initial={{ y: -5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-gray-600 mb-8 flex items-center"
      >
        Login To MomsCart <Leaf className="w-5 h-5 text-green-500" />
      </motion.p>

      <motion.form
        onSubmit={handlelogin}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-5 w-full max-w-sm"
      >
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="email"
            value={email}
            placeholder="Your Email"
            required
            onChange={(e) => setemail(e.target.value)}
            className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type={showpassword ? "text" : "password"}
            value={password}
            placeholder="Your Password"
            required
            onChange={(e) => setpassword(e.target.value)}
            className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4"
          />
          {showpassword ? (
            <EyeOff
              onClick={() => setShowpassword(false)}
              className="absolute right-3 top-3.5 w-5 h-5 cursor-pointer"
            />
          ) : (
            <EyeIcon
              onClick={() => setShowpassword(true)}
              className="absolute right-3 top-3.5 w-5 h-5 cursor-pointer"
            />
          )}
        </div>

        <button
          disabled={loading || !email || !password}
          className="bg-green-600 text-white py-3 rounded-xl flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" /> Logging...
            </>
          ) : (
            "Login"
          )}
        </button>

        <div className="flex items-center justify-center gap-2 text-gray-400">
          <span className="flex-1 h-px bg-gray-200" />
          OR
          <span className="flex-1 h-px bg-gray-200" />
        </div>

        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-3 border py-3 rounded-xl"
        >
          <Image src={Google} alt="google" width={24} height={24} />
          Continue with Google
        </button>
      </motion.form>

      <p
        onClick={() => navigate.push("/register")}
        className="text-gray-600 mt-6 text-sm flex items-center gap-1 cursor-pointer"
      >
        Want to create an account? <LogIn className="w-4 h-4" />
        <span className="text-green-600">Sign up</span>
      </p>
    </div>
  );
};

export default Login;
