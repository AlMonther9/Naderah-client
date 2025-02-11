import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}store/wishlist/${params.id}/`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }
    // 204 No Content response
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting wishlist item:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
