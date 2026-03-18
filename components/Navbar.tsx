"use client";
import { useLang } from "@/context/LangContext";

export default function Navbar() {
  const { lang, setLang } = useLang();

  function scrollToWaitlist() {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#EEEEEE]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="TaxNest" className="w-7 h-7" />
          <span className="font-serif text-lg font-semibold text-[#1A1A1A]">taxnest.</span>
        </div>

        {/* Center nav links */}
        <div className="hidden md:flex items-center gap-8">
          {["Product", "How it works", "Pricing"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm text-[#777777] hover:text-[#1A1A1A] transition-colors font-medium"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right: lang toggle + log in + get started */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm text-[#777777]">
            <button
              onClick={() => setLang("en")}
              className={`px-1.5 py-0.5 transition-colors ${
                lang === "en" ? "text-[#1A1A1A] font-semibold" : "hover:text-[#1A1A1A]"
              }`}
            >
              EN
            </button>
            <span className="opacity-30">|</span>
            <button
              onClick={() => setLang("pt")}
              className={`px-1.5 py-0.5 transition-colors ${
                lang === "pt" ? "text-[#1A1A1A] font-semibold" : "hover:text-[#1A1A1A]"
              }`}
            >
              PT
            </button>
          </div>

          <a href="#" className="hidden md:block text-sm text-[#777777] hover:text-[#1A1A1A] transition-colors">
            Log in
          </a>

          <button
            onClick={scrollToWaitlist}
            className="bg-[#1A1A1A] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#333333] transition-colors"
          >
            {lang === "en" ? "Get started" : "Começar"}
          </button>
        </div>
      </div>
    </nav>
  );
}
