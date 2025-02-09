// lib/api.ts

// Ensure your base URL is defined and cast it to string.
export const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

// Helper: Build headers for JSON requests.
// If an accessToken is provided, include the Authorization header.
function getJsonHeaders(accessToken?: string): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  // Add JSON content-type header if sending a body.
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  return headers;
}

// Helper: Handle and parse the response.
async function handleResponse<T>(response: Response): Promise<T> {
  if (process.env.NODE_ENV === "development") {
    console.log("Response status:", response.status);
    console.log(
      "Response headers:",
      Object.fromEntries(response.headers.entries())
    );
  }

  if (!response.ok) {
    // Try to get more error details from the response.
    const errorText = await response.text();
    throw new Error(
      `HTTP error ${response.status}: ${response.statusText}. ${errorText}`
    );
  }
  return response.json();
}

/* =======================
   Featured Products API
   ======================= */

import type { FeaturedProduct } from "@/app/types/product";

export async function getFeaturedProducts(): Promise<FeaturedProduct[]> {
  const endpoint = "store/featured-products/";
  const url = `${API_BASE_URL}${endpoint}`;

  if (process.env.NODE_ENV === "development") {
    console.log("Fetching featured products from:", url);
  }

  const response = await fetch(url, {
    headers: getJsonHeaders(),
  });

  return handleResponse<FeaturedProduct[]>(response);
}

/* =======================
   User Profile API
   ======================= */

export interface UserProfile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export async function getUserProfile(
  accessToken: string
): Promise<UserProfile> {
  const url = `${API_BASE_URL}users/me/`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      ...getJsonHeaders(accessToken),
      "Content-Type": "application/json", // Explicitly set for JSON responses
    },
    cache: "no-store", // Do not cache sensitive data
  });
  return handleResponse<UserProfile>(response);
}

export async function updateUserProfile(
  accessToken: string,
  data: { first_name?: string; last_name?: string }
): Promise<UserProfile> {
  const url = `${API_BASE_URL}users/me/`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      ...getJsonHeaders(accessToken),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return handleResponse<UserProfile>(response);
}

export async function deleteUserProfile(accessToken: string): Promise<void> {
  const url = `${API_BASE_URL}users/me/`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: getJsonHeaders(accessToken),
  });

  // If the delete action fails, throw an error.
  if (!response.ok) {
    throw new Error(`Failed to delete user profile: ${response.statusText}`);
  }
  // DELETE returns no content, so simply resolve.
}
