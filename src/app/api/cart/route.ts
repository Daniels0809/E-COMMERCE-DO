import User from "@/src/database/models/users";
import dbConnection from "@/src/lib/dbconection";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnection();

  const userId = req.query.userId as string;
  if (!userId) return res.status(400).json({ ok: false, message: "UserId requerido" });

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ ok: false, message: "Usuario no encontrado" });

  if (req.method === "GET") {
    return res.status(200).json({ ok: true, cart: user.cart || [] });
  }

  if (req.method === "POST") {
    const { productId, quantity } = req.body;
    if (!productId || quantity < 1) return res.status(400).json({ ok: false, message: "Datos inválidos" });

    const existing = user.cart.find((p: { productId: string; quantity: number }) => p.productId === productId);
    if (existing) existing.quantity += quantity;
    else user.cart.push({ productId, quantity });

    await user.save();
    return res.status(200).json({ ok: true, cart: user.cart });
  }

  if (req.method === "PATCH") {
    const { productId, quantity } = req.body;
    user.cart = user.cart.map((p: { productId: string; quantity: number }) =>
      p.productId === productId ? { ...p, quantity } : p
    ).filter((p: { productId: string; quantity: number }) => p.quantity > 0);

    await user.save();
    return res.status(200).json({ ok: true, cart: user.cart });
  }

  if (req.method === "DELETE") {
    const { productId } = req.body;
    user.cart = user.cart.filter((p: { productId: string; quantity: number }) => p.productId !== productId);
    await user.save();
    return res.status(200).json({ ok: true, cart: user.cart });
  }

  return res.status(405).json({ ok: false, message: "Método no permitido" });
}
