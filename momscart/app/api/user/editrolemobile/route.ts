import { auth } from "@/auth";
import connectDb from "@/lib/db";
import { User } from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const { role, mobileNumber } = await request.json();

    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        role,
        mobile: mobileNumber, 
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User updated successfully", user },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `Edit and role Error: ${error}` },
      { status: 500 }
    );
  }
}
