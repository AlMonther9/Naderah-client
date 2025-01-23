"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, ShoppingCart, Globe, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/context/language-context";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export function Navbar() {
  const [cartItems, setCartItems] = useState(0);
  const [cartLoading, setCartLoading] = useState(true);
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const activeClass = (path: string) =>
    pathname === path
      ? "underline underline-offset-[6px] rounded text-pri-blue font-bold"
      : "border-transparent text-pri hover:text-pri-light hover:border-pri-light";

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setCartLoading(true);
        if (status === "authenticated" && session?.user?.accessToken) {
          // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
          //   headers: {
          //     Authorization: `Bearer ${session.user.accessToken}`
          //   }
          // });
          // const data = await response.json();
          // setCartItems(data.count);
        }
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      } finally {
        setCartLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchCart();
    } else {
      setCartItems(0);
      setCartLoading(false);
    }
  }, [status, session]);

  const getUserInitials = () => {
    if (!session?.user) return "";
    const { first_name, last_name, email } = session.user;
    if (first_name && last_name) return `${first_name[0]}${last_name[0]}`;
    if (email) return email[0].toUpperCase();
    return "";
  };

  return (
    <nav className="m-2">
      <div className="container px-4 mx-auto">
        <div className="flex items-center h-16">
          {/* Left Navigation Links */}
          <div className="flex items-center flex-1">
            <div className="flex items-center gap-4">
              {["/", "/products", "/offers", "/contact"].map((path) => (
                <Link
                  key={path}
                  href={path}
                  className={`px-3 py-2 font-serif text-md transition-colors ${activeClass(path)}`}
                >
                  {t.nav[(path.slice(1) as keyof typeof t.nav) || "home"]}
                </Link>
              ))}
            </div>
          </div>

          {/* Centered Logo */}
          <Link href="/" className="flex justify-center flex-1">
            {/* Your logo SVG remains the same */}
          </Link>

          {/* Right Icons Section */}
          <div className="flex items-center justify-end flex-1 gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-pri">
                  <Globe className="w-6 h-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={language === "ar" ? "end" : "start"}>
                <DropdownMenuItem onClick={() => setLanguage("ar")}>
                  العربية
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("en")}>
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="relative text-pri"
              asChild
            >
              <Link href="/cart">
                <ShoppingCart className="w-6 h-6" />
                {cartLoading ? (
                  <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white rounded-full bg-secondary-pink">
                    <Loader2 className="w-3 h-3 animate-spin" />
                  </span>
                ) : cartItems > 0 ? (
                  <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white rounded-full bg-secondary-pink">
                    {cartItems}
                  </span>
                ) : null}
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-pri">
                  {status === "loading" ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : session?.user ? (
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={session.user.image ?? undefined} />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <User className="w-6 h-6" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={language === "ar" ? "end" : "start"}>
                {status === "authenticated" ? (
                  <>
                    <div className="px-2 py-1.5 text-sm font-medium">
                      {session.user.first_name && session.user.last_name ? (
                        <span>{`${session.user.first_name} ${session.user.last_name}`}</span>
                      ) : (
                        <span>{session.user.email}</span>
                      )}
                    </div>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        {t.account.profile}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        signOut({ callbackUrl: "/" });
                        setCartItems(0);
                      }}
                      className="cursor-pointer"
                    >
                      {t.account.logout}
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/auth/login" className="cursor-pointer">
                        {t.account.login}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/auth/register" className="cursor-pointer">
                        {t.account.register}
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="relative">
              <input
                type="text"
                placeholder={language === "ar" ? "بحث" : "Search"}
                className="px-4 py-2 pr-10 bg-pri-beige rounded-full focus:outline-none border border-transparent focus:border-primary"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      <div className="border-b-2 border-#4E031154 mx-24"></div>
    </nav>
  );
}
