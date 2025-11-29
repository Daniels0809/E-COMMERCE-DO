import { NextResponse } from "next/server";
import dbConnection from "@/src/lib/dbconection";
import User from "@/src/database/models/users";
import * as yup from "yup";
import { sendEmail } from "@/src/lib/sendMail";

const userSchema = yup.object().shape({
  name: yup.string().required("el nombre es obligatorio").min(3),
  email: yup.string().email().required("El email es obligatorio"),
  pass: yup.string().required("La contraseña es obligatoria").min(8),
  role: yup.string().oneOf(["admin", "user"]).default("user").optional(),
});

export async function POST(req: Request) {
  try {
    await dbConnection();

    const body = await req.json();

    const validData = await userSchema.validate(body, { abortEarly: false });

    const { name, email, pass, role } = validData;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const newUser = await User.create({
      name,
      email,
      pass,
      role: "user",
    });

    try {
      await sendEmail({
        to: email,
        subject: "¡Bienvenido a Imperium Perfums!",
        html: `<h1>Hola ${name}</h1>
               <p>Gracias por registrarte en nuestra plataforma. Disfruta tu experiencia!</p>`,
      });
    } catch (emailError) {
      console.error("Error enviando correo:", emailError);
    }

    return NextResponse.json(
      { message: "Registro exitoso y correo enviado", userId: newUser._id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error en el registro:", error);

    if (error.name === "ValidationError") {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
