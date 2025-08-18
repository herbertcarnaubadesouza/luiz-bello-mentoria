"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function Header() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md border-b transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center cursor-pointer">
            <div className="w-8 h-8 bg-orange-500 rounded mr-2 flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-xl font-bold text-gray-900">ROLE</span>
            <span className="text-sm text-gray-500 ml-1">VIP</span>
          </Link>

          {/* Botão Login ou Perfil */}
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Olá, {user.name}</span>
              <Button onClick={handleLogout} variant="outline">
                Sair
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => router.push("/login")}
              variant="outline"
              className="bg-gray-100 text-gray-700 border-gray-300"
            >
              Entrar
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
