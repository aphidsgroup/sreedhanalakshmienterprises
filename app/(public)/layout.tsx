import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import WhatsAppFloat from "@/components/public/WhatsAppFloat";
import MobileBottomNav from "@/components/public/MobileBottomNav";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="pb-16 md:pb-0">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <MobileBottomNav />
    </>
  );
}
