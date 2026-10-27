"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { KeyRound, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";

export default function ChangePasswordPage() {
  const { data: session } = useSession();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update password.");
      }

      setSuccess("Your password has been updated successfully! Please keep it secure.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "#1a2129" }}>
          Account Security & Password
        </h1>
        <p style={{ color: "#64748b", fontSize: "0.875rem" }}>
          Update the dashboard password for account <span className="font-semibold text-gray-800">{session?.user?.email || "admin@sde.com"}</span>.
        </p>
      </div>

      <div className="sde-card p-6 md:p-8">
        <div className="flex items-center gap-3 pb-6 border-b border-gray-100 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#edf6f8" }}>
            <KeyRound size={20} style={{ color: "#2b7a8c" }} />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 text-base">Change Password</h2>
            <p className="text-xs text-gray-500">Ensure your new password is at least 8 characters long.</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 text-sm">
            <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-600" />
            <div>{error}</div>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-lg flex items-start gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
            <CheckCircle2 size={18} className="shrink-0 mt-0.5 text-emerald-600" />
            <div>{success}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-gray-800">
              Current Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showCurrent ? "text" : "password"}
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-[#2b7a8c] focus:border-transparent transition"
                style={{ border: "1px solid #e2eaed" }}
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-gray-800">
              New Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showNew ? "text" : "password"}
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-[#2b7a8c] focus:border-transparent transition"
                style={{ border: "1px solid #e2eaed" }}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">Must be at least 8 characters long.</p>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-gray-800">
              Confirm New Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showConfirm ? "text" : "password"}
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-[#2b7a8c] focus:border-transparent transition"
                style={{ border: "1px solid #e2eaed" }}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-2.5 text-sm font-semibold justify-center"
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Updating Password..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>

      {/* Emergency Reset Information */}
      <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 flex items-start gap-3">
        <ShieldCheck size={20} className="shrink-0 text-[#2b7a8c] mt-0.5" />
        <div className="text-xs text-gray-600 space-y-1">
          <div className="font-semibold text-gray-800">Emergency Reset CLI Command</div>
          <div>
            If you ever forget or lose access to your password, you can instantly reset it from the project root command line using:
          </div>
          <div className="font-mono bg-white px-2 py-1 rounded border border-gray-200 text-gray-800 w-fit">
            npm run reset-password
          </div>
        </div>
      </div>
    </div>
  );
}
