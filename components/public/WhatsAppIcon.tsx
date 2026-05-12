import Image from "next/image";

interface WhatsAppIconProps {
  size?: number;
  className?: string;
  variant?: "white" | "green";
}

export default function WhatsAppIcon({ 
  size = 18, 
  className = "",
  variant = "white"
}: WhatsAppIconProps) {
  const iconSrc = variant === "white" ? "/whatsapp-white-icon.png" : "/products/WhatsApp.svg";
  
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <Image
        src={iconSrc}
        alt="WhatsApp"
        fill
        className="object-contain"
      />
    </div>
  );
}
