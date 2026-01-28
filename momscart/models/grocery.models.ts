import mongoose from "mongoose";

export interface IGrocery {
    _id?: mongoose.Types.ObjectId;
    name: string;
    category: string;
    price: string;
    unit: string;
    quantity: number;
    image: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const grocerySchema = new mongoose.Schema<IGrocery>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
            enum: [
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
            ],
        },
        price: {
            type: String,
            required: true,
        },
        unit: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const Grocery = mongoose.models.Grocery || mongoose.model("Grocery", grocerySchema);
