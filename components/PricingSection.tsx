'use client'
import { motion } from 'framer-motion'
import { useLang } from '@/context/LangContext'
import { CheckCircle, Users } from 'lucide-react'

const copy = {
  en: {
    headline: 'Free while we build. Rewarding from day one.',
    card1Title: 'Join the waitlist',
    card1Benefit: '1 month free on launch',
    card2Title: 'Refer 3 friends',
    card2Benefit: '+1 extra month free',
    smallPrint: '* Benefits are non-accumulative.',
  },
  pt: {
    headline: 'Grátis enquanto construímos. Com recompensas desde o primeiro dia.',
    card1Title: 'Entrar na lista de espera',
    card1Benefit: '1 mês grátis no lançamento',
    card2Title: 'Referir 3 amigos',
    card2Benefit: '+1 mês extra grátis',
    smallPrint: '* Os benefícios não são cumulativos.',
  },
}

export default function PricingSection() {
  const { lang } = useLang()
  const t = copy[lang]

  return (
    <section className="py-24 bg-[#F8F9FB]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1E3A5F] leading-tight">
            {t.headline}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { icon: CheckCircle, title: t.card1Title, benefit: t.card1Benefit },
            { icon: Users, title: t.card2Title, benefit: t.card2Benefit },
          ].map(({ icon: Icon, title, benefit }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white border border-[#E5E7EB] rounded-2xl p-8 flex flex-col gap-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1E3A5F] flex items-center justify-center">
                <Icon size={20} className="text-[#3ECFCF]" />
              </div>
              <div>
                <p className="font-semibold text-[#111827] text-lg mb-2">{title}</p>
                <p className="text-[#3ECFCF] font-bold text-2xl">{benefit}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm text-[#9CA3AF] mt-8">{t.smallPrint}</p>
      </div>
    </section>
  )
}
