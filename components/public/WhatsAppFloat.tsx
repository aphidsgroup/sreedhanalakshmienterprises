"use client";
import { MessageCircle } from "lucide-react";
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
      <MessageCircle size={28} color="#fff" fill="#fff" />
    </a>
  );
}
