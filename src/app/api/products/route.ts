import Product from "@/src/database/models/products";
import dbConnection from "@/src/lib/dbconection";
import { NextResponse } from "next/server";
import { uploadImage } from "@/src/lib/cloudinary";

//GET
export async function GET(request: Request) {
  try {
    await dbConnection();

    const {
      search,
      category,
      page = "1",
      limit = "10",
    } = Object.fromEntries(new URL(request.url).searchParams);

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    // Construir filtros dinámicos
    const filters: any = {};

    // Búsqueda por name o description
    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Filtrado por categoría
    if (category) {
      filters.category = category;
    }

    const total = await Product.countDocuments(filters);
    const products = await Product.find(filters).skip(skip).limit(limitNum);

    return NextResponse.json({
      ok: true,
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
      data: products,
    });
  } catch (error) {
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}

//POST

export async function POST(request: Request) {
  try {
    await dbConnection();

    const formData = await request.formData();

    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));
    const description = formData.get("description") as string;
    const createdAt = formData.get("createdAt") as string;

    const file = formData.get("image") as File | null;

    let uploadedImageURL = "/placeholder.jpg";

    // Subimos imagen solo si existe archivo
    if (file instanceof File && file.size > 0) {
      uploadedImageURL = await uploadImage(file);
    }
    const newProduct = await Product.create({
      name,
      category,
      price,
      stock,
      description,
      createdAt,
      image: uploadedImageURL,
    });

    return NextResponse.json({ ok: true, data: newProduct });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await dbConnection();

    const formData = await request.formData();
    const _id = formData.get("_id") as string;
    if (!_id) {
      return NextResponse.json(
        { ok: false, error: "_id is required" },
        { status: 400 }
      );
    }

    const updateData: any = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
      description: formData.get("description") as string,
    };

    const file = formData.get("image") as File | null;

    if (file instanceof File && file.size > 0) {
      const imageUrl = await uploadImage(file);
      updateData.image = imageUrl;
    }

    const updateProduct = await Product.findByIdAndUpdate(_id, updateData, {
      new: true,
    });

    return NextResponse.json({ ok: true, data: updateProduct });
  } catch (error) {
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}
