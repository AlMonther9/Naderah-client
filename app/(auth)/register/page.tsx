"use client";

import { RegisterForm } from "@/components/auth/SignupForm";
import { FaFacebook } from "react-icons/fa";
import { useLanguage } from "@/context/language-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import SocialLoginButton from "@/components/SocialLoginButton";
import { Icons } from "@/components/icons";
import Link from "next/link";

export default function RegisterPage() {
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
            {t.account.register}
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
          <RegisterForm />
          <p className="text-center text-sm">
            {t.account.haveAccount}{" "}
            <Link
              href="/login"
              className="font-medium text-pri-900 underline-offset-4 hover:underline"
            >
              {t.account.login}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
