import Product from "@/src/database/models/products";
import dbConnection from "@/src/lib/dbconection";
import { NextResponse } from "next/server";

//GET
export async function GET() {
  try {
    await dbConnection();
    const products = await Product.find();
    return NextResponse.json({ok:true, data: products});
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

//POST

export async function POST(request: Request) {
  try {
    await dbConnection();
    const body = await request.json();

    const newProduct = await Product.create(body);

    return NextResponse.json({ ok:true, data: newProduct });
  } catch (error) {
    console.log("error", error)
    return NextResponse.json({ok:false, error }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await dbConnection();

    const body = await request.json();
    const { _id, ...rest } = body;
    const updateProduct = await Product.findByIdAndUpdate(_id, rest, {
      new: true,
    });

    return NextResponse.json({ok:true,  data: updateProduct });
  } catch (error) {
    return NextResponse.json({ok:false, error }, { status: 500 });
  }
}


