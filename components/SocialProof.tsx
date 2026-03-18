"use client";
import { useLang } from "@/context/LangContext";

const companies = ["Acme Ltd", "Nova Studio", "Bright Goods", "Apex Corp", "Meridian Co", "Strata Works"];

export default function SocialProof() {
  const { lang } = useLang();

  return (
    <section className="py-14 border-y border-[#EEEEEE] bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-xs font-semibold text-[#777777] mb-8 uppercase tracking-widest">
          {lang === "en" ? "Trusted by forward-thinking SMEs" : "Utilizado por PMEs inovadoras"}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {companies.map((company) => (
            <span
              key={company}
              className="text-[#BBBBBB] font-semibold text-base md:text-lg hover:text-[#1A1A1A] transition-colors cursor-default select-none"
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
