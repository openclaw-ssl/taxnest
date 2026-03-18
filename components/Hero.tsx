"use client";
import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";

const copy = {
  en: {
    line1: "Your invoices,",
    line2: "finally organised.",
    sub: "One email address for all your invoices. Automatically routed, categorized, and ready for tax season.",
    cta: "Join the Waitlist",
    secondary: "See how it works",
    badge: "✓ Free for early adopters  ·  No credit card required",
  },
  pt: {
    line1: "As suas faturas,",
    line2: "finalmente organizadas.",
    sub: "Um endereço de email para todas as suas faturas. Encaminhadas automaticamente, categorizadas e prontas para o fecho fiscal.",
    cta: "Entrar na Lista de Espera",
    secondary: "Ver como funciona",
    badge: "✓ Grátis para os primeiros utilizadores  ·  Sem cartão de crédito",
  },
};

const mockInvoices = [
  { from: "EDP Energias de Portugal", amount: "€234.50", date: "Mar 12", status: "Processed" },
  { from: "Vodafone Portugal", amount: "€89.99", date: "Mar 11", status: "Processed" },
  { from: "NOS Comunicações", amount: "€45.00", date: "Mar 10", status: "Pending" },
  { from: "Galp Energia", amount: "€156.20", date: "Mar 09", status: "Processed" },
];

export default function Hero() {
  const { lang } = useLang();
  const t = copy[lang];

  function scrollToWaitlist() {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Aurora blobs */}
      <div
        className="absolute top-[-120px] left-[-80px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(167,241,117,0.2) 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-[60px] right-[-100px] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(142,205,99,0.15) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Headline block */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              className="font-serif leading-[1.15] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.75rem, 6vw, 5rem)" }}
            >
              <span className="text-[#1A1A1A]">{t.line1}</span>
              <br />
              <span className="text-[#96d969]">{t.line2}</span>
            </h1>
            <p className="text-lg md:text-xl text-[#777777] leading-relaxed mb-10 max-w-[580px] mx-auto">
              {t.sub}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={scrollToWaitlist}
                className="bg-[#1E3A5F] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#162d4a] transition-colors text-base"
              >
                {t.cta}
              </button>
              <a
                href="#features"
                className="border border-[#EEEEEE] bg-white text-[#1A1A1A] font-medium px-8 py-4 rounded-xl hover:border-[#1E3A5F] transition-colors text-base"
              >
                {t.secondary}
              </a>
            </div>

            <div className="mt-8">
              <span className="inline-block text-sm text-[#777777] bg-[#F8F9FB] border border-[#EEEEEE] rounded-xl px-5 py-2">
                {t.badge}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Invoice inbox mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto relative"
        >
          {/* Floating left card */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 0 }}
            animate={{ opacity: 1, x: -20, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-[-160px] top-[60px] hidden lg:block w-[150px] bg-white rounded-xl border border-[#EEEEEE] shadow-md p-3 z-10"
          >
            <div className="text-xs text-[#777777] mb-1">Invoice received</div>
            <div className="text-xs font-semibold text-[#1A1A1A]">GitHub, Inc.</div>
            <div className="text-xs text-[#96d969] font-medium mt-1">$21.00</div>
          </motion.div>

          {/* Floating right card */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: 0 }}
            animate={{ opacity: 1, x: 20, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-[-160px] top-[60px] hidden lg:block w-[155px] bg-white rounded-xl border border-[#EEEEEE] shadow-md p-3 z-10"
          >
            <div className="text-xs text-[#777777] mb-1">AI extracted</div>
            <div className="text-xs font-semibold text-[#1A1A1A]">Software & SaaS</div>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#96d969]" />
              <span className="text-xs text-[#777777]">Deductible</span>
            </div>
          </motion.div>

          {/* Main inbox card */}
          <div className="bg-white rounded-2xl border border-[#EEEEEE] shadow-xl overflow-hidden">
            {/* Inbox header */}
            <div className="flex items-center gap-3 px-5 py-4 bg-[#F8F9FB] border-b border-[#EEEEEE]">
              <div className="w-8 h-8 rounded-lg bg-[#1E3A5F] flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#96d969" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <span className="text-sm font-mono text-[#777777] truncate">
                yourbusiness@taxnest.io
              </span>
              <span className="ml-auto text-xs bg-[#96d969]/15 text-[#5a8a2e] font-semibold px-2.5 py-1 rounded-lg flex-shrink-0">
                {mockInvoices.length} new
              </span>
            </div>

            {/* Invoice rows */}
            <div className="divide-y divide-[#F3F4F6]">
              {mockInvoices.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#F8F9FB] transition-colors cursor-default"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#EDF1F5] flex items-center justify-center text-[#1E3A5F] text-xs font-bold flex-shrink-0">
                    {item.from[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-[#1A1A1A] truncate">{item.from}</div>
                    <div className="text-xs text-[#777777] mt-0.5">{item.date}</div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-sm font-semibold text-[#1A1A1A]">{item.amount}</span>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
                        item.status === "Processed"
                          ? "bg-[#8ecd63]/15 text-[#4a7a1e]"
                          : "bg-[#F59E0B]/10 text-[#F59E0B]"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer bar */}
            <div className="px-5 py-3 bg-[#F8F9FB] border-t border-[#EEEEEE] flex items-center justify-between">
              <span className="text-xs text-[#777777]">Auto-categorized by TaxNest AI</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#96d969] animate-pulse" />
                <span className="text-xs text-[#5a8a2e] font-medium">Live</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
