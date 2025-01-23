import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    // Add your product fetching logic here
    const products = []
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}

