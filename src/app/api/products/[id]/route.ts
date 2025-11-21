import Product from "@/src/database/models/products";
import dbConnection from "@/src/lib/dbconection";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, {params}: {params: {id:string}}) {
  try {
    await dbConnection();
    await Product.findByIdAndDelete(params.id)
    return NextResponse.json({ok: true, message: "Producto eliminado"})
  } catch (error) {
    return NextResponse.json({ok:false, error }, { status: 500 });
  }
}