"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, Phone } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { BUSINESS } from "@/lib/constants";

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#e2eaed] shadow-[0_-4px_10px_rgba(0,0,0,0.05)] md:hidden">
      <div className="flex justify-around items-center h-16 pb-safe">
        <Link 
          href="/" 
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname === "/" ? "text-[#2b7a8c]" : "text-[#64748b]"}`}
        >
          <Home size={22} className={pathname === "/" ? "fill-current" : ""} />
          <span className="text-[10px] font-semibold">Home</span>
        </Link>
        
        <Link 
          href="/products" 
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname?.startsWith("/products") ? "text-[#2b7a8c]" : "text-[#64748b]"}`}
        >
          <Package size={22} className={pathname?.startsWith("/products") ? "fill-current" : ""} />
          <span className="text-[10px] font-semibold">Products</span>
        </Link>

        <Link 
          href="/contact" 
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname === "/contact" ? "text-[#2b7a8c]" : "text-[#64748b]"}`}
        >
          <Phone size={22} className={pathname === "/contact" ? "fill-current" : ""} />
          <span className="text-[10px] font-semibold">Contact</span>
        </Link>

        <a 
          href={`https://wa.me/${BUSINESS.whatsapp}?text=Hi, I would like to know more about your products.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center w-full h-full space-y-1 text-[#25d366]"
        >
          <WhatsAppIcon size={24} />
          <span className="text-[10px] font-semibold text-[#128c7e]">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
