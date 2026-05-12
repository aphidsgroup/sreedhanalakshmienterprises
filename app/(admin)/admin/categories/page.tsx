export default function AdminPlaceholderPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
        <span className="text-2xl">🚧</span>
      </div>
      <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "#1a2129" }}>Coming Soon</h1>
      <p style={{ color: "#64748b", maxWidth: "400px", marginTop: "0.5rem" }}>
        This page is currently under development. You can use the **Products** and **Pricing** tabs to manage your core business data.
      </p>
    </div>
  );
}
