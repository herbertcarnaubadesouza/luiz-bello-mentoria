"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md border-b transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center cursor-pointer">
              <div className="w-8 h-8 bg-orange-500 rounded mr-2 flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold text-gray-900">ROLE</span>
              <span className="text-sm text-gray-500 ml-1">VIP</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Eventos
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Lojas
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Anuncie também
              </a>
            </nav>
          </div>

          <Button
            variant="outline"
            className="bg-gray-100 text-gray-700 border-gray-300"
          >
            Entrar
          </Button>
        </div>
      </div>
    </header>
  );
}
