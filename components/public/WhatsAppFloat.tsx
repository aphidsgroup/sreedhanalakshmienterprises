"use client";
import { BUSINESS } from "@/lib/constants";
import WhatsAppIcon from "./WhatsAppIcon";

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${BUSINESS.whatsapp}?text=Hi SDE Enterprises, I need construction materials. Can you help?`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float hidden md:flex"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
