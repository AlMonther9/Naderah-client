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
import signupSchema from "@/app/types/schemas/signup-schema";
import type { z } from "zod";

type FormData = z.infer<typeof signupSchema>;

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signupSchema),
  });

  async function onSubmit(formData: FormData) {
    setIsLoading(true);

    try {
      const result = await signIn("signup", {
        ...formData,
        redirect: false,
      });

      if (result?.error) {
        try {
          const errorData = JSON.parse(result.error);
          const errorMessage =
            errorData.detail ||
            (errorData.non_field_errors
              ? errorData.non_field_errors.join(" ")
              : "فشل في إنشاء الحساب، يرجى المحاولة مرة أخرى");
          toast.error(errorMessage);
        } catch (e) {
          toast.error("فشل في إنشاء الحساب، يرجى المحاولة مرة أخرى");
        }
        return;
      }

      toast.success("تم إنشاء الحساب بنجاح");
      router.push("/");
    } catch (error) {
      console.error("Signup error:", error);
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
            {/* Name fields in one row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first_name">الاسم الأول</Label>
                <Input
                  {...register("first_name")}
                  id="first_name"
                  placeholder="محمد"
                  type="text"
                  className="rounded-lg bg-[#FFF7F8] border-[#4E031154] focus:ring-0 focus:border-0"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                />
                {errors.first_name && (
                  <p className="text-red-500 text-sm">
                    {errors.first_name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="last_name">الاسم الأخير</Label>
                <Input
                  {...register("last_name")}
                  id="last_name"
                  placeholder="أحمد"
                  type="text"
                  className="rounded-lg bg-[#FFF7F8] border-[#4E031154] focus:ring-0 focus:border-0"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                />
                {errors.last_name && (
                  <p className="text-red-500 text-sm">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                {...register("email")}
                id="email"
                placeholder="name@example.com"
                type="email"
                className="rounded-lg bg-[#FFF7F8] border-[#4E031154] focus:ring-0 focus:border-0"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
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
                autoCapitalize="none"
                autoComplete="new-password"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password2">تأكيد كلمة المرور</Label>
              <Input
                {...register("password2")}
                id="password2"
                type="password"
                className="rounded-lg bg-[#FFF7F8] border-[#4E031154] focus:ring-0 focus:border-0"
                autoCapitalize="none"
                disabled={isLoading}
              />
              {errors.password2 && (
                <p className="text-red-500 text-sm">
                  {errors.password2.message}
                </p>
              )}
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
              "إنشاء حساب"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
