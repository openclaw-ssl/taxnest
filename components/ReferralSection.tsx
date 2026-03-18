"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ReferralSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 md:py-24 bg-[#EDF1F5]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A] mb-3">
              Share the love. Get rewarded.
            </h2>
            <p className="text-[#777777] max-w-md mx-auto">
              Refer 3 friends to TaxNest and get an extra month free when we launch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div
              className="rounded-2xl p-8 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(167,241,117,0.3) 0%, rgba(150,217,105,0.2) 100%)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(150,217,105,0.3)",
              }}
            >
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="font-semibold text-[#1A1A1A] text-lg mb-2">1 month free</h3>
              <p className="text-[#777777] text-sm leading-relaxed">
                For every 3 friends who join the waitlist using your link, you get one month of TaxNest Pro — on us.
              </p>
              <div className="mt-6 inline-block text-xs font-semibold text-[#4a7a1e] bg-[#96d969]/20 px-3 py-1.5 rounded-lg">
                No limit on rewards
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="rounded-2xl p-8 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(167,241,117,0.2) 0%, rgba(150,217,105,0.12) 100%)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(150,217,105,0.25)",
              }}
            >
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-semibold text-[#1A1A1A] text-lg mb-2">Skip the queue</h3>
              <p className="text-[#777777] text-sm leading-relaxed">
                Each referral moves you higher on the waitlist. Be among the first to get access when TaxNest launches.
              </p>
              <div className="mt-6 inline-block text-xs font-semibold text-[#4a7a1e] bg-[#96d969]/20 px-3 py-1.5 rounded-lg">
                Priority early access
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
