import { buildMetadata } from "@/lib/seo";
import { BUSINESS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description: "Terms of Use for Sree Dhanalakshmi Enterprises website and construction material supply services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="bg-[#f8f9fa] min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-[#e2eaed] p-8 md:p-12">
        <h1
          className="text-3xl font-bold text-[#1a2129] mb-2"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          Terms of Use
        </h1>
        <p className="text-sm text-[#64748b] mb-8">
          Last updated: August 2026
        </p>

        <div className="prose prose-slate max-w-none space-y-8 text-[#4a5568] leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-[#1a2129] mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using this website (<strong>www.sreedhanalakshmienterprises.in</strong>), you agree to be bound by these Terms of Use. If you do not agree, please do not use this website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a2129] mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
              2. About This Website
            </h2>
            <p>
              This website is operated by Sree Dhanalakshmi Enterprises, a construction material supplier based in Chennai, Tamil Nadu. The website provides information about our products, services, branches, and indicative material prices to assist customers in making procurement enquiries.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a2129] mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
              3. Price Information
            </h2>
            <p>
              All prices displayed on this website are <strong>indicative market rates only</strong>. They are provided as a reference and are subject to change without notice. Actual prices may vary based on:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Brand and grade selected</li>
              <li>Order quantity</li>
              <li>Delivery location and transport conditions</li>
              <li>GST and applicable taxes</li>
              <li>Current market rates and stock availability</li>
              <li>Unloading conditions at the delivery site</li>
            </ul>
            <p className="mt-3">
              A confirmed price quotation will be provided by our team upon receiving your specific requirements via phone or WhatsApp. No price displayed on this website constitutes a binding offer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a2129] mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
              4. Product and Material Information
            </h2>
            <p>
              Product descriptions, specifications, and availability information are provided in good faith and are accurate to the best of our knowledge. Actual product availability, brands, and specifications are subject to stock availability at the time of order. We reserve the right to modify product offerings without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a2129] mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
              5. Orders and Supply
            </h2>
            <p>
              This website does not facilitate online purchasing or payment processing. All orders are placed directly with our team via phone or WhatsApp, and are subject to availability, confirmation, and our standard supply terms communicated at the time of order.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a2129] mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
              6. Limitation of Liability
            </h2>
            <p>
              Sree Dhanalakshmi Enterprises shall not be liable for any loss or damage arising from reliance on indicative price information displayed on this website. Customers are advised to confirm all prices, availability and terms directly with our team before making any procurement decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a2129] mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
              7. Intellectual Property
            </h2>
            <p>
              All content on this website including text, images, logos and design elements are the property of Sree Dhanalakshmi Enterprises or their respective owners. No content may be reproduced, distributed or used without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a2129] mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
              8. Governing Law
            </h2>
            <p>
              These Terms of Use are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Chennai, Tamil Nadu.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a2129] mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
              9. Contact
            </h2>
            <p>For any questions regarding these terms, please contact us:</p>
            <div className="mt-3 p-4 bg-[#f0f4f6] rounded-lg">
              <p className="font-semibold text-[#1a2129]">Sree Dhanalakshmi Enterprises</p>
              <p>Kilpauk Branch: {BUSINESS.branches[0].address}, {BUSINESS.branches[0].city} - {BUSINESS.branches[0].pincode}</p>
              <p>Phone / WhatsApp: <a href={BUSINESS.branches[0].phone1Href} className="text-[#2b7a8c] hover:underline">{BUSINESS.branches[0].phone1}</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
