import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { BUSINESS } from "@/lib/constants";
import WhatsAppIcon from "./WhatsAppIcon";

interface ProductCardProps {
  name: string;
  brand?: string;
  specification?: string;
  unit: string;
  price: string | number | null;
  remarks?: string;
  imageUrl: string;
}

export default function ProductCard({
  name,
  brand,
  specification,
  unit,
  price,
  remarks,
  imageUrl,
}: ProductCardProps) {
  const displayPrice = price ? (typeof price === "number" ? formatPrice(price) : price) : "On Request";
  const title = brand ? `${brand} ${name}` : name;
  
  // Create WhatsApp message string
  const message = `Hi, I would like to enquire about ${title} ${specification ? `(${specification})` : ""}. Please provide the latest price and availability.`;
  const whatsappHref = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <div className="sde-card overflow-hidden flex flex-col h-full bg-white group hover:border-[#3d9aaf] transition-all">
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-[#f8fafc] p-4 flex items-center justify-center border-b border-[#e2eaed]">
        <div className="relative w-full h-full">
          <Image 
            src={imageUrl} 
            alt={title}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
        {remarks && (
          <div className="absolute top-3 left-3 bg-[#fdf5e6] text-[#a67d22] text-xs font-bold px-2.5 py-1 rounded-full border border-[#f0dba8] shadow-sm">
            {remarks}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <div className="flex-grow">
          {brand && (
            <p className="text-xs font-bold text-[#4a5568] uppercase tracking-wider mb-1">
              {brand}
            </p>
          )}
          <h3 style={{ fontFamily: "Outfit, sans-serif" }} className="text-lg font-bold text-[#1a2129] leading-tight mb-2">
            {name}
          </h3>
          {specification && (
            <p className="text-sm text-[#64748b] mb-4">
              Spec: {specification}
            </p>
          )}
        </div>

        <div className="mt-auto">
          <div className="mb-4">
            <span className="text-xs text-[#64748b] block mb-0.5">Price ({unit})</span>
            <div className="text-xl font-extrabold text-[#2b7a8c]">
              {displayPrice}
            </div>
          </div>

          <a 
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-white transition-all shadow-sm"
            style={{ background: "#25d366" }}
          >
            <WhatsAppIcon size={16} /> Enquire Now
          </a>
        </div>
      </div>
    </div>
  );
}
