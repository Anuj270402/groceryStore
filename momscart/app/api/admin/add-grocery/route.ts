import { auth } from "@/auth";
import uploadOnCloudinary from "@/lib/cloudinary";
import ConnectToDB from "@/lib/db";
import { Grocery } from "@/models/grocery.models";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        await ConnectToDB()
        const session = await auth()
        if (session?.user?.role !== "admin") {
            return NextResponse.json({ message: "You are not admin" }, { status: 403 })
        }
        const formData = await request.formData()
        const name = formData.get("name") as string
        const price = formData.get("price") as string
        const category = formData.get("category") as string
        const image = formData.get("image") as Blob
        let imageURL;
        if (image) {
            imageURL = await uploadOnCloudinary(image)
        }
        const grocery = await Grocery.create({
            name,
            price,
            category,
            image: imageURL
        })
        return NextResponse.json({ message: "Grocery Added Successfully", grocery }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "add Grocery Failed" }, { status: 500 })

    }
}