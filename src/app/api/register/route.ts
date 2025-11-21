import { NextResponse } from "next/server";
import dbConnection from "@/src/lib/dbconection";
import User from "@/src/database/models/users";
import * as yup from "yup";

const userSchema = yup.object().shape({
  name: yup.string().required("el nombre es obligatorio").min(3),
  email: yup.string().email().required("El email es obligatorio"),
  pass: yup.string().required("La contraseña es obligatoria").min(8),
});

export async function POST(req: Request) {
  try {
    await dbConnection();

    const body = await req.json();

    const validData = await userSchema.validate(body, { abortEarly: false });

    const { name, email, pass } = validData;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const newUser = await User.create({ name, email, pass });

    return NextResponse.json(
      { message: "Registro exitoso", userId: newUser._id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error en el registro:", error);

    if(error.name === "ValidationError"){
        return NextResponse.json(
            {error: error.errors},
            {status: 400}
        )
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
