"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "#363636",
          color: "#fff",
          direction: "rtl",
        },
      }}
    />
  );
}
