import { buildMetadata } from "@/lib/seo";
import { BUSINESS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for Sree Dhanalakshmi Enterprises. Learn how we collect, use and protect your information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#f8f9fa] min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-[#e2eaed] p-8 md:p-12">
        <h1
          className="text-3xl font-bold text-[#1a2129] mb-2"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          Privacy Policy
        </h1>
        <p className="text-sm text-[#64748b] mb-8">
          Last updated: August 2026
        </p>

        <div className="prose prose-slate max-w-none space-y-8 text-[#4a5568] leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-[#1a2129] mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
              1. Who We Are
            </h2>
            <p>
              Sree Dhanalakshmi Enterprises is a construction material supplier based in Chennai, Tamil Nadu, India, operating from two branches in Kilpauk and Mangadu. This website (<strong>www.sreedhanalakshmienterprises.in</strong>) is operated by Sree Dhanalakshmi Enterprises.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a2129] mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
              2. Information We Collect
            </h2>
            <p>When you use this website or contact us, we may collect:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Your name and contact details (phone number, WhatsApp number) when you make an enquiry</li>
              <li>Your delivery location or project site address when you request a quotation</li>
              <li>General browsing data (page views, device type) through analytics tools, if enabled</li>
            </ul>
            <p className="mt-3">
              We do not collect payment card details. We do not operate an online payment system.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a2129] mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
              3. How We Use Your Information
            </h2>
            <p>Information you provide is used only to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Respond to your enquiries and provide price quotations</li>
              <li>Process and fulfil material orders and deliveries</li>
              <li>Contact you regarding your order or enquiry status</li>
            </ul>
            <p className="mt-3">
              We do not sell or share your personal information with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a2129] mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
              4. WhatsApp and Phone Communication
            </h2>
            <p>
              When you contact us via WhatsApp or phone, your contact details are stored in our records for the purpose of fulfilling your order and providing after-sales support. We do not add you to any automated marketing lists without your consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a2129] mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
              5. Cookies
            </h2>
            <p>
              This website may use essential technical cookies required for basic site functionality. We do not use tracking cookies for advertising purposes. If you have analytics enabled, anonymised usage data may be collected to help us improve the website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a2129] mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
              6. Data Retention
            </h2>
            <p>
              Customer enquiry and order records are retained for as long as reasonably necessary for business and accounting purposes, and as required by applicable Indian law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a2129] mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
              7. Your Rights
            </h2>
            <p>
              You may contact us at any time to request access to, correction of, or deletion of your personal information held by us. We will respond to all reasonable requests promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a2129] mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
              8. Third-Party Links
            </h2>
            <p>
              This website may contain links to third-party services such as Google Maps and WhatsApp. We are not responsible for the privacy practices of those services. Please review their respective privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a2129] mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
              9. Contact Us
            </h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
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
