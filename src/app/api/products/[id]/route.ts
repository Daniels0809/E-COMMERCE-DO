import Product from "@/src/database/models/products";
import dbConnection from "@/src/lib/dbconection";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    console.log("ID recibido para eliminación:", id);

    await dbConnection();
    console.log("Conectado a MongoDB");

    const deleted = await Product.findByIdAndDelete(id.trim());

    console.log("Resultado delete:", deleted);

    return NextResponse.json({
      ok: true,
      message: "Producto eliminado",
      deleted,
    });
  } catch (error) {
    console.error("ERROR EN DELETE:", error);
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}
