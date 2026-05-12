"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await signIn("credentials", { email, password, redirect: false });
    if (result?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/admin");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "linear-gradient(135deg, #1a2129 0%, #1e5f6e 100%)" }}>
      <div className="w-full max-w-md">
        {/* Logo area */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Image src="/logo.jpeg" alt="SDE Logo" width={56} height={56} className="rounded-lg" />
            <div className="text-left">
              <div style={{ color: "#fff", fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.1rem" }}>Sree Dhanalakshmi</div>
              <div style={{ color: "#3d9aaf", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em" }}>ENTERPRISES ADMIN</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-8 shadow-2xl" style={{ background: "rgba(255,255,255,0.97)", border: "1px solid rgba(255,255,255,0.2)" }}>
          <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "#1a2129", marginBottom: "0.5rem" }}>
            Admin Login
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: "2rem" }}>
            Sign in to manage products, pricing, and content.
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-1.5" style={{ color: "#1a2129" }}>Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#94a3b8" }} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@sde.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm outline-none focus:ring-2"
                  style={{ border: "1px solid #e2eaed", background: "#f9fafb" }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-1.5" style={{ color: "#1a2129" }}>Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#94a3b8" }} />
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border text-sm outline-none"
                  style={{ border: "1px solid #e2eaed", background: "#f9fafb" }}
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#94a3b8" }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3 justify-center text-base" style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center mt-6 text-xs" style={{ color: "#94a3b8" }}>
            Default: admin@sde.com / Admin@1234 — Change after first login.
          </p>
        </div>
      </div>
    </div>
  );
}
