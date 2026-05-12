"use client";
import Image from "next/image";
import { BUSINESS } from "@/lib/constants";

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${BUSINESS.whatsapp}?text=Hi SDE Enterprises, I need construction materials. Can you help?`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative w-7 h-7">
        <Image
          src="/whatsapp-white-icon.png"
          alt="WhatsApp"
          fill
          className="object-contain"
        />
      </div>
    </a>
  );
}
