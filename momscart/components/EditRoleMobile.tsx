"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bike, User, UserCog } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const roles = [
  { id: "admin", label: "Admin", icon: UserCog },
  { id: "user", label: "User", icon: User },
  { id: "deliveryBoy", label: "Delivery Boy", icon: Bike },
];

const EditRoleMobile = () => {
  const router = useRouter();

  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const isEnabled = !!selectedRole && mobileNumber.length === 10;

  const handleEdit = async () => {
    if (!isEnabled) return;

    try {
      setLoading(true);

      await axios.post("/api/user/editrolemobile", {
        role: selectedRole,
        mobileNumber,
      });

      // ✅ REDIRECT TO HOME
      router.replace("/");
      router.refresh(); // ✅ refresh session + DB
    } catch (error) {
      console.error("Frontend error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full p-6">
      <motion.h1
        className="text-3xl font-bold text-center mt-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Select Your Role
      </motion.h1>

      <div className="flex justify-center gap-6 mt-10">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.id;

          return (
            <motion.div
              key={role.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedRole(role.id)}
              className={`w-48 h-44 flex flex-col items-center justify-center border-2 rounded-xl cursor-pointer transition ${
                isSelected
                  ? "border-green-600 bg-green-100"
                  : "border-gray-300"
              }`}
            >
              <Icon size={36} className="mb-2" />
              <span className="font-semibold">{role.label}</span>
            </motion.div>
          );
        })}
      </div>

      <div className="flex flex-col items-center mt-8">
        <input
          type="tel"
          value={mobileNumber}
          maxLength={10}
          onChange={(e) =>
            setMobileNumber(e.target.value.replace(/\D/g, ""))
          }
          placeholder="Enter mobile number"
          className="border p-3 rounded-lg w-64"
        />
      </div>

      <button
        onClick={handleEdit}
        disabled={!isEnabled || loading}
        className={`mt-6 mx-auto px-8 py-3 rounded-xl font-semibold transition ${
          isEnabled && !loading
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {loading ? "Saving..." : "Submit"}
      </button>
    </div>
  );
};

export default EditRoleMobile;
