import User from "@/src/database/models/users";
import Products from "@/src/database/models/products"; // 🔹 importa el modelo para que Mongoose lo conozca
import dbConnection from "@/src/lib/dbconection";
import mongoose from "mongoose";

export async function GET(req: Request) {
  await dbConnection();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return Response.json({ ok: false, message: "UserId requerido" }, { status: 400 });
  }

  const user = await User.findById(userId)
    .populate({ path: "cart.productId", model: "products" })
    .lean();

  if (!user)
    return Response.json({ ok: false, message: "Usuario no encontrado" }, { status: 404 });

  return Response.json({ ok: true, cart: user.cart || [] });
}

export async function POST(req: Request) {
  await dbConnection();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const { productId, quantity } = await req.json();

  if (!userId) {
    return Response.json({ ok: false, message: "UserId requerido" }, { status: 400 });
  }

  let user = await User.findById(userId);

  if (!user) {
    return Response.json({ ok: false, message: "Usuario no encontrado" }, { status: 404 });
  }

  if (!Array.isArray(user.cart)) {
    user.cart = [];
  }

  const prodId =
    mongoose.Types.ObjectId.isValid(productId)
      ? new mongoose.Types.ObjectId(productId)
      : productId;

  const existing = user.cart.find(
    (p: any) =>
      (p.productId?._id?.toString() || p.productId?.toString()) === productId
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    user.cart.push({ productId: prodId, quantity });
  }

  await user.save();

  // 🔹 populate usando el modelo correcto
  user = await User.findById(userId)
    .populate({ path: "cart.productId", model: "products" })
    .lean();

  return Response.json({ ok: true, cart: user.cart });
}
