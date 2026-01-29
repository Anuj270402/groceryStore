"use client";

import { ArrowLeft, PlusCircle, Upload } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

const categories = [
    "Fruits & Vegetables",
    "Dairy & Eggs",
    "Rice,Atta & Grains",
    "Snacks & Biscuits",
    "Beverages & Drinks",
    "Personal Care",
    "Household Essentials",
    "Spices & Drinks",
    "Instant & Packaged Food",
    "Baby & Pet Care",
];

const units = ["kg", "g", "litre", "ml", "piece", "pack"];

function AddGrocery() {
    const [name, setname] = useState("");
    const [category, setcategory] = useState("");
    const [unit, setunits] = useState("");
    const [price, setprice] = useState<string | null>(null);
    const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
    const [preview, setpreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!name || !category || !unit || !price) {
            alert("All fields are required");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("name", name);
            formData.append("category", category);
            formData.append("unit", unit);
            formData.append("unit", unit);
            formData.append("price", price);

            if (backgroundImage) {
                formData.append("image", backgroundImage);
            }

            const res = await axios.post(
                "/api/admin/add-grocery",
                formData
            );

            alert(res.data.message);

            // reset
            console.log(res.data)
            setname("");
            setcategory("");
            setunits("");
            setprice("");
        
            setBackgroundImage(null)
            setpreview(null)

        } catch (error: any) {
            console.error(error);
            alert(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        const file = files[0];
        setBackgroundImage(file);
        setpreview(URL.createObjectURL(file));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-white py-16 px-4 relative">
            <Link
                href="/"
                className="absolute top-6 left-6 flex items-center gap-2 text-green-700 font-semibold bg-white px-4 py-2 rounded-full shadow-md hover:bg-green-100 hover:shadow-lg transition-all"
            >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to home</span>
            </Link>

            <motion.form
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white w-full max-w-2xl shadow-2xl rounded-3xl border border-green-100 p-8"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="flex items-center gap-3">
                        <PlusCircle className="text-green-600 w-8 h-8" />
                        <h1>Add Your Grocery</h1>
                    </div>

                    <p className="text-gray-500 text-sm mt-2 text-center">
                        Fill out the detail below to add a new grocery item.
                    </p>
                </div>

                <div className="flex flex-col gap-6 w-full">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Your Grocery Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="eg: sweets,Milks ..."
                            onChange={(e) => setname(e.currentTarget.value)}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all"
                            value={name}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="category"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all bg-white"
                                onChange={(e) => setcategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Units <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="category"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all bg-white"
                                onChange={(e) => setunits(e.target.value)}
                            >
                                <option value="">Select Units</option>
                                {units.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Price <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            onChange={(e) => setprice(e.target.value)}
                            value={price || ""}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-5">
                        <label
                            htmlFor="image"
                            className="cursor-pointer flex items-center justify-center gap-2 bg-green-50 text-green-700 font-semibold border border-green-200 rounded-xl px-6 hover:bg-green-100 transition-all w-full sm:w-auto"
                        >
                            <Upload />
                            Upload Image
                        </label>

                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            hidden
                            onChange={handleImage}
                        />

                        {preview && (
                            <Image
                                src={preview}
                                height={100}
                                width={100}
                                alt="preview"
                                className="mt-3 w-24 h-24 rounded-xl shadow-md border border-gray-200 object-cover"
                            />
                        )}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.09 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleSubmit}
                        disabled={loading}
                        className="mt-4 w-full bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl disabled:opacity-60 transition-all flex items-center justify-center gap-2"
                    >
                        {loading ? "Adding..." : "Add Grocery"}  
                    </motion.button>
                </div>
            </motion.form>
        </div>
    );
}

export default AddGrocery;
