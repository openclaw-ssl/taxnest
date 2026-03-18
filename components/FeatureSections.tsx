"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/* ── MergeDiagram ── */
function MergeDiagram() {
  const inboxes = ["billing@acme.com", "invoices@acme.com", "accounts@acme.com"];

  return (
    <div className="flex items-center gap-4 w-full">
      {/* Left: source cards */}
      <div className="flex flex-col gap-2 flex-shrink-0">
        {inboxes.map((addr) => (
          <div
            key={addr}
            className="bg-white rounded-lg border-l-2 border-[#CCCCCC] border border-[#EEEEEE] px-3 py-2 text-xs font-mono text-[#777777] shadow-sm"
          >
            {addr}
          </div>
        ))}
      </div>

      {/* Animated SVG lines */}
      <svg width="60" height="90" viewBox="0 0 60 90" fill="none" className="flex-shrink-0" overflow="visible">
        {[15, 45, 75].map((y, i) => (
          <motion.line
            key={i}
            x1="0"
            y1={y}
            x2="60"
            y2="45"
            stroke="#1E3A5F"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </svg>

      {/* Right: unified inbox */}
      <div className="bg-white rounded-lg border-l-[3px] border-[#96d969] border border-[#EEEEEE] px-3 py-2 flex-shrink-0 shadow-sm">
        <div className="text-xs font-mono text-[#1A1A1A] font-semibold">acme@taxnest.io</div>
        <div className="text-[10px] text-[#96d969] mt-0.5 font-medium">Unified inbox</div>
      </div>
    </div>
  );
}

/* ── RoutingAnimation ── */
function RoutingAnimation() {
  const [step, setStep] = useState(0);
  const timers = [1200, 1000, 1500, 1500, 800];

  useEffect(() => {
    const id = setTimeout(() => {
      setStep((s) => (s + 1) % 5);
    }, timers[step]);
    return () => clearTimeout(id);
  }, [step]);

  const emailVisible = step === 0 || step === 1;
  const aiVisible = step === 1 || step === 2;
  const dataVisible = step === 2 || step === 3;
  const badgesVisible = step === 3;

  return (
    <div className="w-full space-y-3 min-h-[200px] flex flex-col justify-center">
      <motion.div
        animate={{ opacity: emailVisible ? 1 : 0, y: emailVisible ? 0 : -8 }}
        transition={{ duration: 0.35 }}
        className="bg-white rounded-xl border border-[#EEEEEE] p-3 shadow-sm"
      >
        <div className="text-[10px] text-[#777777] mb-1">
          <span className="font-medium text-[#1A1A1A]">From:</span> billing@github.com
        </div>
        <div className="text-[10px] text-[#777777] mb-1">
          <span className="font-medium text-[#1A1A1A]">To:</span> acme@taxnest.io
        </div>
        <div className="text-[10px] text-[#777777]">
          <span className="font-medium text-[#1A1A1A]">Subject:</span> GitHub Invoice March 2025
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: aiVisible ? 1 : 0, scale: aiVisible ? 1 : 0.9 }}
        transition={{ duration: 0.35 }}
        className="flex items-center gap-2"
      >
        <motion.div
          animate={{ scale: aiVisible ? [1, 1.1, 1] : 1 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          className="w-8 h-8 rounded-full bg-[#1E3A5F] flex items-center justify-center text-white text-xs flex-shrink-0"
        >
          ✦
        </motion.div>
        <span className="text-xs text-[#777777]">TaxNest AI processing…</span>
      </motion.div>

      <motion.div
        animate={{ opacity: dataVisible ? 1 : 0, y: dataVisible ? 0 : 8 }}
        transition={{ duration: 0.35 }}
        className="bg-white rounded-xl border border-[#EEEEEE] p-3 shadow-sm grid grid-cols-2 gap-x-4 gap-y-1.5"
      >
        {[
          ["Category", "Software & SaaS"],
          ["Supplier", "GitHub"],
          ["Amount", "$21.00"],
          ["Deductible", "Yes"],
        ].map(([k, v]) => (
          <div key={k}>
            <div className="text-[9px] text-[#777777] uppercase tracking-wider">{k}</div>
            <div className="text-xs font-semibold text-[#1A1A1A]">{v}</div>
          </div>
        ))}
      </motion.div>

      <motion.div
        animate={{ opacity: badgesVisible ? 1 : 0, y: badgesVisible ? 0 : 8 }}
        transition={{ duration: 0.35 }}
        className="flex gap-2 flex-wrap"
      >
        <span className="text-xs bg-[#96d969]/15 text-[#4a7a1e] font-medium px-2.5 py-1 rounded-lg">
          engineering@acme.com
        </span>
        <span className="text-xs bg-[#22C55E]/10 text-[#22C55E] font-medium px-2.5 py-1 rounded-lg">
          accounting@acme.com
        </span>
      </motion.div>
    </div>
  );
}

/* ── AIExtractionCard ── */
function AIExtractionCard() {
  const fields = [
    { label: "Supplier", value: "Vodafone Portugal", confidence: 99 },
    { label: "Amount", value: "€89.99", confidence: 100 },
    { label: "Category", value: "Telecoms", confidence: 96 },
    { label: "VAT", value: "€20.70 (23%)", confidence: 98 },
    { label: "Deductible", value: "Yes", confidence: 94 },
  ];

  return (
    <div className="w-full bg-white rounded-xl border border-[#EEEEEE] shadow-sm overflow-hidden">
      <div className="px-4 py-3 bg-[#F8F9FB] border-b border-[#EEEEEE] flex items-center justify-between">
        <span className="text-xs font-semibold text-[#1A1A1A]">AI Extraction</span>
        <span className="text-[10px] text-[#4a7a1e] font-semibold bg-[#96d969]/10 px-2 py-0.5 rounded-md">
          LIVE
        </span>
      </div>
      <div className="divide-y divide-[#F3F4F6]">
        {fields.map((f) => (
          <div key={f.label} className="flex items-center px-4 py-2.5 gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-[#777777] uppercase tracking-wider">{f.label}</div>
              <div className="text-xs font-semibold text-[#1A1A1A]">{f.value}</div>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <div className="w-14 h-1.5 rounded-full bg-[#EEEEEE] overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-[#96d969]"
                  initial={{ width: 0 }}
                  animate={{ width: `${f.confidence}%` }}
                  transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
                />
              </div>
              <span className="text-[10px] text-[#777777]">{f.confidence}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── MonthlyExportCard ── */
function MonthlyExportCard() {
  const months = [
    { m: "Jan", pct: "63%" },
    { m: "Feb", pct: "50%" },
    { m: "Mar", pct: "80%" },
  ];
  const amounts = ["€1,240", "€980", "€1,560"];

  return (
    <div className="w-full bg-white rounded-xl border border-[#EEEEEE] shadow-sm overflow-hidden">
      <div className="px-4 py-3 bg-[#F8F9FB] border-b border-[#EEEEEE] flex items-center justify-between">
        <span className="text-xs font-semibold text-[#1A1A1A]">Q1 2025 Export</span>
        <button className="text-[10px] bg-[#1E3A5F] text-white px-2.5 py-1 rounded-md font-medium">
          Download CSV
        </button>
      </div>
      <div className="p-4 space-y-3">
        {months.map((row, i) => (
          <div key={row.m} className="flex items-center gap-3">
            <span className="text-xs text-[#777777] w-6">{row.m}</span>
            <div className="flex-1 h-2 rounded-full bg-[#EEEEEE] overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-[#96d969]"
                initial={{ width: 0 }}
                animate={{ width: row.pct }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.7, ease: "easeOut" }}
              />
            </div>
            <span className="text-xs font-semibold text-[#1A1A1A] w-14 text-right">{amounts[i]}</span>
          </div>
        ))}
        <div className="pt-2 border-t border-[#EEEEEE] flex justify-between">
          <span className="text-xs text-[#777777]">Total deductible</span>
          <span className="text-xs font-bold text-[#1E3A5F]">€3,780</span>
        </div>
      </div>
    </div>
  );
}

/* ── Feature card wrapper ── */
interface FeatureCardProps {
  tag: string;
  title: string;
  description: string;
  visual: React.ReactNode;
  reverse?: boolean;
}

function FeatureCard({ tag, title, description, visual, reverse }: FeatureCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-16 items-center bg-[#EDF1F5] rounded-2xl p-8 md:p-12`}
    >
      <div className="flex-1 min-w-0">
        <span className="inline-block text-xs font-semibold text-[#4a7a1e] bg-[#96d969]/15 px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
          {tag}
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#1A1A1A] leading-tight mb-4">
          {title}
        </h2>
        <p className="text-[#777777] leading-relaxed">{description}</p>
      </div>

      <div className="flex-1 w-full max-w-sm mx-auto md:mx-0">
        {visual}
      </div>
    </motion.div>
  );
}

/* ── Main export ── */
export default function FeatureSections() {
  const features = [
    {
      tag: "Unified Inbox",
      title: "One address. Every invoice.",
      description:
        "Forward all your supplier inboxes to a single TaxNest address. Stop searching across billing@, invoices@, and accounts@ — everything lands in one place.",
      visual: <MergeDiagram />,
      reverse: false,
    },
    {
      tag: "Smart Routing",
      title: "AI routes every email instantly.",
      description:
        "TaxNest reads the email, extracts the data, and routes it to the right team — accounting gets the numbers, engineering gets the SaaS receipts.",
      visual: <RoutingAnimation />,
      reverse: true,
    },
    {
      tag: "AI Extraction",
      title: "Data pulled, not typed.",
      description:
        "Supplier, amount, VAT, category, deductibility — extracted with 98% accuracy so your bookkeeper never types another invoice again.",
      visual: <AIExtractionCard />,
      reverse: false,
    },
    {
      tag: "Export Ready",
      title: "Tax season made simple.",
      description:
        "One-click CSV exports organized by month, category, and supplier. Hand your accountant a clean file instead of a shoebox.",
      visual: <MonthlyExportCard />,
      reverse: true,
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6 space-y-8">
        {features.map((f) => (
          <FeatureCard
            key={f.tag}
            tag={f.tag}
            title={f.title}
            description={f.description}
            visual={f.visual}
            reverse={f.reverse}
          />
        ))}
      </div>
    </section>
  );
}
