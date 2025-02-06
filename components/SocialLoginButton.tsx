import React from "react";
import { Button } from "@/components/ui/button";

interface SocialLoginButtonProps {
  provider: string;
  icon: React.ReactNode;
}

function SocialLoginButton({ provider, icon }: SocialLoginButtonProps) {
  const handleLogin = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(
      `${baseUrl}auth/o/${provider}/?redirect_uri=${window.location.origin}`
    );
    const data = await response.json();
    if (data.authorization_url) {
      window.location.href = data.authorization_url;
    }
  };

  return (
    <Button
      onClick={handleLogin}
      className="flex items-center text-black hover:bg-[#FFF7F8] justify-center font-semibold w-full py-5 gap-4 border border-[#4E031154] rounded-full shadow-sm bg-[#FFF7F8]"
      dir="ltr"
    >
      {icon} متابعة باستخدام{" "}
      {/* {provider === "google-oauth2" ? "Google" : "Facebook"} */}
    </Button>
  );
}

export default SocialLoginButton;
