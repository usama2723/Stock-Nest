import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // ✅ Use shared instance

// GET all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        title: true,
        price: true,
        brandId: true,
        brand: { select: { name: true } },
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST a new product
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const product = await prisma.product.create({
      data: {
        title: body.title,
        price: body.price,
        brandId: body.brandId,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
