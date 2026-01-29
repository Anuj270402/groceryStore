import { auth } from "@/auth";
import uploadOnCloudinary from "@/lib/cloudinary";
import ConnectToDB from "@/lib/db";
import { Grocery } from "@/models/grocery.models";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    await ConnectToDB();
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json(
        { message: "You are not admin" },
        { status: 403 }
      );
    }
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const category = formData.get("category") as string;
    const image = formData.get("image") as File | null;
    const unit = formData.get("unit") as string;

    if (!name || !price || !category || !unit) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    let imageURL: string | null = null;

    if (image) {
      const bytes = await image.arrayBuffer();
      const blob = new Blob([bytes], { type: image.type });
      imageURL = await uploadOnCloudinary(blob);
    }
    const grocery = await Grocery.create({
      name,
      price,
      category,
      unit,
      image: imageURL,
    });

    return NextResponse.json(
      { message: "Grocery Added Successfully", grocery },
      { status: 201 }
    );
  } catch (error) {
    console.error("ADD GROCERY ERROR:", error);
    return NextResponse.json(
      { message: "Add Grocery Failed", error },
      { status: 500 }
    );
  }
};
