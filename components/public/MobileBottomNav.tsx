"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Phone, List, ChevronUp } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { BUSINESS } from "@/lib/constants";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropup when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showMenu]);

  // Close dropup on route change
  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);

  return (
    <>
      {/* Dropup Menu Overlay */}
      {showMenu && (
        <div className="fixed inset-0 z-40 bg-black/20 md:hidden transition-opacity" onClick={() => setShowMenu(false)} />
      )}

      <div ref={menuRef} className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        {/* Dropup Menu Content */}
        <div 
          className={`absolute bottom-full left-0 right-0 bg-white border-t border-[#e2eaed] rounded-t-2xl shadow-[0_-10px_20px_rgba(0,0,0,0.1)] transition-transform duration-300 origin-bottom ${showMenu ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}`}
        >
          <div className="p-4 space-y-2">
            <div className="text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2 px-2">Today's Prices</div>
            {[
              { label: "Cement Price", href: "/today-cement-price" },
              { label: "Steel / TMT Price", href: "/today-steel-price" },
              { label: "Bricks & Blocks Price", href: "/today-bricks-and-blocks-price" },
              { label: "Sand & Aggregates Price", href: "/today-sand-and-aggregates-price" },
            ].map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className="block px-4 py-3 rounded-xl text-sm font-medium text-[#1a2129] bg-[#f8fafc] hover:bg-[#edf6f8] hover:text-[#2b7a8c] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-white border-t border-[#e2eaed] shadow-[0_-4px_10px_rgba(0,0,0,0.05)] relative flex items-center h-16 pb-safe px-2">
          <div className="flex-1 flex justify-around items-center h-full pr-16">
            <Link 
              href="/" 
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname === "/" ? "text-[#2b7a8c]" : "text-[#64748b]"}`}
            >
              <Home size={22} className={pathname === "/" ? "fill-current" : ""} />
              <span className="text-[10px] font-semibold">Home</span>
            </Link>

            <button 
              onClick={() => setShowMenu(!showMenu)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${showMenu || pathname?.startsWith("/today") ? "text-[#2b7a8c]" : "text-[#64748b]"}`}
            >
              <div className="relative">
                <List size={22} className={pathname?.startsWith("/today") && !showMenu ? "fill-current" : ""} />
              </div>
              <span className="text-[10px] font-semibold flex items-center gap-0.5">
                Prices <ChevronUp size={10} className={`transition-transform duration-300 ${showMenu ? "rotate-180" : ""}`} />
              </span>
            </button>

            <Link 
              href="/contact" 
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname === "/contact" ? "text-[#2b7a8c]" : "text-[#64748b]"}`}
            >
              <Phone size={22} className={pathname === "/contact" ? "fill-current" : ""} />
              <span className="text-[10px] font-semibold">Contact</span>
            </Link>
          </div>

          {/* Floating WhatsApp Button */}
          <div className="absolute right-4 -top-6 flex flex-col items-center">
            <a 
              href={`https://wa.me/${BUSINESS.whatsapp}?text=Hi, I would like to know more about your products.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-[#25d366] text-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(37,211,102,0.4)] hover:scale-105 active:scale-95 transition-transform"
              aria-label="Chat on WhatsApp"
            >
              <WhatsAppIcon size={28} />
            </a>
            <span className="text-[10px] font-semibold text-[#128c7e] mt-1 hidden sm:block">WhatsApp</span>
          </div>
        </div>
      </div>
    </>
  );
}
