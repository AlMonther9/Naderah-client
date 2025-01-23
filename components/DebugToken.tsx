// components/DebugToken.tsx
"use client";

import { useSession } from "next-auth/react";

export default function DebugToken() {
  const { data: session } = useSession();

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 shadow-lg rounded-lg">
      <button
        onClick={() => {
          console.log("Access Token:", session?.user.accessToken);
          alert("Token logged to console!");
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Log Access Token
      </button>
    </div>
  );
}
