"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import loginSchema from "@/app/types/schemas/login-schema";
import type { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";

type FormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(formData: FormData) {
    setIsLoading(true);

    try {
      const result = await signIn("login", {
        ...formData,
        redirect: false,
      });

      if (result?.error) {
        try {
          const errorData = JSON.parse(result.error);
          const errorMessage = errorData.detail ||
          (errorData.non_field_errors
            ? errorData.non_field_errors.join(" ")
            : "فشل تسجيل الدخول، يرجى التحقق من البيانات المدخلة");
        toast.error(errorMessage);
          } catch (e) {
            toast.error("فشل تسجيل الدخول، يرجى التحقق من البيانات المدخلة");
          }
        return;
      }

      toast.success("تم تسجيل الدخول بنجاح");
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("حدث خطأ غير متوقع");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6 w-full max-w-lg mx-auto">
      <div className="bg-white p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">اسم المستخدم أو البريد الإلكتروني</Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="name@example.com"
                className="rounded-lg bg-[#FFF7F8] border-[#4E031154] focus:ring-0 focus:border-0"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                {...register("password")}
                id="password"
                type="password"
                className="rounded-lg bg-[#FFF7F8] border-[#4E031154] focus:ring-0 focus:border-0"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <Checkbox className="border-[#4E031154]" />
                <span>تذكرني</span>
              </label>
              <a href="#" className="text-sm text-pri-900 hover:underline">
                هل نسيت كلمة المرور؟
              </a>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-pri-900 hover:bg-pri-800 text-white"
          >
            {isLoading ? (
              <Icons.spinner className="h-4 w-4 animate-spin" />
            ) : (
              "تسجيل الدخول"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
