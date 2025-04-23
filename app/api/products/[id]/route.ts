import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH - Update a product
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const product = await prisma.product.update({
      where: { id: Number(params.id) },
      data: {
        title: body.title,
        price: body.price,
        brandId: body.brandId,
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
