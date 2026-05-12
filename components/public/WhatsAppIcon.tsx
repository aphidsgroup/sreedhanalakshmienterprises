import Image from "next/image";

export default function WhatsAppIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <Image
        src="/whatsapp-white-icon.png"
        alt="WhatsApp"
        fill
        className="object-contain"
      />
    </div>
  );
}
