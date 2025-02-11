import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const queryParams = new URLSearchParams();

  // Extract supported query parameters and add them to the query string.
  for (const key of [
    "max_price",
    "min_price",
    "ordering",
    "page",
    "price",
    "search",
  ]) {
    const value = searchParams.get(key);
    if (value) {
      queryParams.append(key, value);
    }
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}store/products/?${queryParams.toString()}`;
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
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
