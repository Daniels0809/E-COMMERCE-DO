import { NextResponse } from "next/server";
import dbConnection from "@/src/lib/dbconection";
import User from "@/src/database/models/users";

export async function POST(req:Request) {
    try {
        await dbConnection();

        const { name, email, pass } = await req.json();

        if (!name || !email || !pass) {
            return NextResponse.json(
                {error: "Campos requeridos"},
                {status: 400}
            );
        }

        const userExist = await User.findOne({email});

        if (userExist) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 409 }
            );
        }

        const newUser = await User.create({name, email, pass});

        return NextResponse.json({message: "Registro exitoso", userId: newUser._id}, {status: 201});

    } catch (error) {
        console.error("Error en el registro:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}