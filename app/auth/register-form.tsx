"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import toast from "react-hot-toast";

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);

    if (formData.get("password") !== formData.get("password2")) {
      toast.error("كلمات المرور غير متطابقة");
      setIsLoading(false);
      return;
    }

    try {
      const result = await signIn("signup", {
        first_name: formData.get("first_name") as string,
        last_name: formData.get("last_name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        password2: formData.get("password2") as string,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      toast.success("تم إنشاء الحساب بنجاح");
      router.push("/");
    } catch (error) {
      toast.error("فشل في إنشاء الحساب، يرجى المحاولة مرة أخرى");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="first_name">الاسم الأول</Label>
            <Input
              id="first_name"
              name="first_name"
              placeholder="محمد"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="last_name">الاسم الأخير</Label>
            <Input
              id="last_name"
              name="last_name"
              placeholder="أحمد"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoCapitalize="none"
              autoComplete="new-password"
              disabled={isLoading}
              required
              minLength={8}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password2">تأكيد كلمة المرور</Label>
            <Input
              id="password2"
              name="password2"
              type="password"
              autoCapitalize="none"
              disabled={isLoading}
              required
              minLength={8}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />
            )}
            إنشاء حساب
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            أو التسجيل باستخدام
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          disabled={isLoading}
        >
          {isLoading ? (
            <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />
          ) : (
            <>
              <Icons.google className="ml-2 h-4 w-4" />
              Google
            </>
          )}
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => signIn("facebook", { callbackUrl: "/" })}
          disabled={isLoading}
        >
          {isLoading ? (
            <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />
          ) : (
            <>
              <Icons.facebook className="ml-2 h-4 w-4" />
              Facebook
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
