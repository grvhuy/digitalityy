import User from "@/lib/models/user.model";
import connectToDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Cart from "@/lib/models/cart.model";

export async function POST(req: Request) {
    try {
      const { name, email, password } = await req.json();
      const hashedPassword = await bcrypt.hash(password, 10);
      await connectToDB();
      const user = await User.create({ name, email, password: hashedPassword })
      await Cart.create({ user: user._id });
  
      return NextResponse.json({ message: "User registered." }, { status: 201 });
    } catch (error) {
      return NextResponse.json(
        { message: "An error occurred while registering the user." },
        { status: 500 }
      );
    }
  }
