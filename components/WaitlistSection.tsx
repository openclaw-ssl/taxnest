"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { CheckCircle, Copy, Check } from "lucide-react";

const copy = {
  en: {
    headline: "Be first. Shape the product.",
    sub: "Join the waitlist to get early access and help us build the product you need.",
    placeholder: "Your work email",
    cta: "Join Waitlist",
    success: "You're on the list! 🎉",
    referralLabel: "Share your referral link for an extra month free:",
    loading: "Joining...",
    copied: "Copied!",
    copy: "Copy",
  },
  pt: {
    headline: "Seja o primeiro. Ajude a construir o produto.",
    sub: "Junte-se à lista de espera para ter acesso antecipado e ajudar a construir o produto que precisa.",
    placeholder: "O seu email de trabalho",
    cta: "Entrar na Lista",
    success: "Está na lista! 🎉",
    referralLabel: "Partilhe o seu link de referral para ganhar um mês extra grátis:",
    loading: "A entrar...",
    copied: "Copiado!",
    copy: "Copiar",
  },
};

export default function WaitlistSection() {
  const { lang } = useLang();
  const t = copy[lang];

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const referralLink = referralCode ? `${baseUrl}/?ref=${referralCode}` : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setReferralCode(data.referral_code);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function copyLink() {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  return (
    <section id="waitlist" className="py-24 bg-[#1E3A5F] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#96d969] opacity-5 blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#96d969] opacity-5 blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-white mb-4 leading-tight">
            {t.headline}
          </h2>
          <p className="text-[rgba(255,255,255,0.7)] text-lg mb-10 leading-relaxed">
            {t.sub}
          </p>

          {!referralCode ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.placeholder}
                className="flex-1 px-6 py-4 rounded-xl bg-white text-[#1A1A1A] placeholder:text-[#AAAAAA] focus:outline-none focus:ring-2 focus:ring-[#96d969] text-base"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#96d969] hover:bg-[#8ecd63] disabled:opacity-60 text-[#1E3A5F] font-bold px-8 py-4 rounded-xl transition-colors text-base whitespace-nowrap"
              >
                {loading ? t.loading : t.cta}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-center gap-3">
                <CheckCircle size={28} className="text-[#96d969]" />
                <p className="text-white text-xl font-semibold">{t.success}</p>
              </div>

              <div className="bg-white rounded-2xl p-6">
                <p className="text-[#777777] text-sm mb-3 text-left">{t.referralLabel}</p>
                <div className="flex items-center gap-3 bg-[#F8F9FB] rounded-xl px-4 py-3 border border-[#EEEEEE]">
                  <span className="flex-1 text-[#1A1A1A] text-sm font-mono truncate">
                    {referralLink}
                  </span>
                  <button
                    onClick={copyLink}
                    className="flex items-center gap-1.5 text-[#1E3A5F] hover:text-[#96d969] transition-colors flex-shrink-0 text-sm font-medium"
                    aria-label="Copy referral link"
                  >
                    {copied ? (
                      <>
                        <Check size={16} />
                        <span>{t.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        <span>{t.copy}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {error && <p className="mt-4 text-red-300 text-sm">{error}</p>}
        </motion.div>
      </div>
    </section>
  );
}
