import User from "@/lib/models/user.model";
import connectToDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req: Request) => {
    connectToDB()
    const values = await req.json();
    const { email, password } = values;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
}