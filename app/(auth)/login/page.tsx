"use client";

import { useRouter } from "next/navigation";
import { FaFacebook } from "react-icons/fa";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { LoginForm } from "../../../components/auth/LoginForm";
import { useLanguage } from "@/context/language-context";
import SocialLoginButton from "@/components/auth/SocialLoginButton";
import { Icons } from "@/components/icons";

export default function LoginPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <div className="flex min-h-[calc(100vh-160px)] w-full items-center justify-center p-4 sm:min-h-screen">
      <div className="w-full max-w-lg space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t.account.login}
          </h1>
        </div>
        <div className="flex justify-center space-x-2 px-2 py-4 gap-4">
          <SocialLoginButton provider="google-oauth2" icon={<Icons.google />} />
          <SocialLoginButton
            provider="facebook"
            icon={<FaFacebook size={24} color="#4267B2" />}
          />
        </div>
        <div className="rounded-lg outline outline-1 outline-[#4E031154] bg-background p-6 shadow-lg sm:p-8">
          <LoginForm />
          <p className=" text-center text-sm">
            {t.account.noAccount}{" "}
            <Link
              href="/register"
              className="font-medium text-pri-900 underline-offset-4 hover:underline"
            >
              {t.account.createAccount}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
