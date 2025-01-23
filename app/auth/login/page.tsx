"use client";

import { LoginForm } from "../login-form";
import { useLanguage } from "@/context/language-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

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
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t.account.login}
          </h1>
        </div>
        <div className="rounded-lg border bg-background p-6 shadow-sm sm:p-8">
          <LoginForm />
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {t.account.noAccount}{" "}
            <Link
              href="/auth/register"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              {t.account.createAccount}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
