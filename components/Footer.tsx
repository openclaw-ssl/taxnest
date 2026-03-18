'use client'
import { useLang } from '@/context/LangContext'

const copy = {
  en: {
    tagline: 'Invoice management for modern SMEs.',
    made: 'Made for SMEs. Built with care.',
    privacy: 'Privacy Policy',
    terms: 'Terms',
  },
  pt: {
    tagline: 'Gestão de faturas para PMEs modernas.',
    made: 'Feito para PMEs. Construído com cuidado.',
    privacy: 'Política de Privacidade',
    terms: 'Termos',
  },
}

export default function Footer() {
  const { lang, setLang } = useLang()
  const t = copy[lang]

  return (
    <footer className="bg-white border-t border-[#E5E7EB] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <img src="/logo.svg" alt="TaxNest" className="h-8 w-auto mb-2" />
            <p className="text-[#9CA3AF] text-sm mt-1">{t.tagline}</p>
          </div>

          {/* Links + language toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <nav className="flex items-center gap-5">
              <a href="#" className="text-[#9CA3AF] hover:text-[#1E3A5F] text-sm transition-colors">
                {t.privacy}
              </a>
              <a href="#" className="text-[#9CA3AF] hover:text-[#1E3A5F] text-sm transition-colors">
                {t.terms}
              </a>
            </nav>

            <div className="flex items-center gap-1 text-sm text-[#9CA3AF]">
              <button
                onClick={() => setLang('en')}
                className={`px-1 py-0.5 transition-colors ${lang === 'en' ? 'text-[#1E3A5F] font-semibold' : 'hover:text-[#1E3A5F]'}`}
              >
                EN
              </button>
              <span className="opacity-30">|</span>
              <button
                onClick={() => setLang('pt')}
                className={`px-1 py-0.5 transition-colors ${lang === 'pt' ? 'text-[#1E3A5F] font-semibold' : 'hover:text-[#1E3A5F]'}`}
              >
                PT
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#E5E7EB]">
          <p className="text-center text-sm text-[#9CA3AF]">
            © {new Date().getFullYear()} TaxNest · {t.made}
          </p>
        </div>
      </div>
    </footer>
  )
}
