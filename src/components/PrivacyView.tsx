import { ArrowLeft, Lock } from 'lucide-react';
import { ActivePage } from '../types';

interface PrivacyViewProps {
  onChangePage: (page: ActivePage) => void;
}

export default function PrivacyView({ onChangePage }: PrivacyViewProps) {
  return (
    <div className="py-6 sm:py-10 bg-[#070709] text-[#F4F4F6] px-4 sm:px-8 relative z-10 select-none" id="privacy-page">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Navigation back button */}
        <button
          onClick={() => onChangePage('contact')}
          className="inline-flex items-center space-x-2 font-mono text-xs text-[#C5A059] font-bold hover:underline cursor-pointer tracking-wider uppercase active:scale-95 transition-transform"
        >
          <ArrowLeft size={14} />
          <span>RETURN TO FOOTER & CONTACT</span>
        </button>

        {/* Header Block matching Disclosures */}
        <div className="border-b border-white/10 pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 border border-white/10 px-3 py-1 font-mono text-[9px] tracking-widest text-[#C5A059] uppercase bg-[#101114] rounded-[2px]">
            <Lock size={12} className="text-[#C5A059]" />
            <span>DATA PROTECTION</span>
          </div>
          <h1 className="font-display font-semibold text-3xl sm:text-5xl tracking-wide text-[#F4F4F6] uppercase leading-none">
            PRIVACY & <span className="text-[#C5A059]">DATA PROTECTION</span>
          </h1>
          <p className="font-sans text-xs text-[#8E909A] font-light leading-relaxed uppercase tracking-wider">
            Official privacy protections and confidential client data security policies for Meridian Estates Real Estate.
          </p>
        </div>

        {/* Privacy Content Container matching Disclosures */}
        <div className="bg-[#101114] border border-white/10 p-8 sm:p-12 rounded-[2px] shadow-2xl space-y-8">
          <div className="space-y-2 border-b border-white/10 pb-4">
            <h2 className="font-display font-semibold text-xl sm:text-2xl text-[#F4F4F6] uppercase tracking-tight">
              PRIVACY POLICY & CONFIDENTIALITY STATEMENT
            </h2>
            <span className="font-mono text-[9px] text-[#C5A059] uppercase tracking-widest block">EFFECTIVE DATE: AUGUST 2026</span>
          </div>

          <div className="space-y-6 font-sans text-xs sm:text-sm text-[#8E909A] leading-relaxed font-light">
            <p>
              At Meridian Estates, we are committed to safeguarding the privacy and confidential financial profile of our luxury residential and commercial clients.
            </p>

            <div className="space-y-2 pt-2 border-t border-white/10">
              <h3 className="font-display font-semibold text-base text-[#C5A059] uppercase tracking-wider">1. Information Collection & Usage</h3>
              <p>
                We collect personal contact details provided voluntarily through our inquiry dossiers or telephone communications solely to facilitate real estate advisory services, comparative market analysis, and private transaction coordination.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/10">
              <h3 className="font-display font-semibold text-base text-[#C5A059] uppercase tracking-wider">2. Non-Disclosure & Strict Confidentiality</h3>
              <p>
                We do NOT sell, lease, trade, or share your contact or transaction information with third-party telemarketers or external advertisers. Information is disclosed strictly as required by law to execute real estate closing procedures with title companies, lenders, or regulatory auditors.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/10">
              <h3 className="font-display font-semibold text-base text-[#C5A059] uppercase tracking-wider">3. Direct Principal Contact</h3>
              <p>
                Should you have any inquiries regarding your stored contact preferences, please reach Designated Broker Alex Morgan directly at (512) 560-7284 or via email at meridian@swbell.net.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
