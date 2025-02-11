import { NextResponse } from "next/server";

// GET /store/wishlist/?page=...
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const queryParams = new URLSearchParams();
  const page = searchParams.get("page");
  if (page) {
    queryParams.append("page", page);
  }
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}store/wishlist/?${queryParams.toString()}`;
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST /store/wishlist/
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}store/wishlist/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    if (response.status !== 201) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
