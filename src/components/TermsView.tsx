import { ArrowLeft, FileText } from 'lucide-react';
import { ActivePage } from '../types';

interface TermsViewProps {
  onChangePage: (page: ActivePage) => void;
}

export default function TermsView({ onChangePage }: TermsViewProps) {
  return (
    <div className="py-6 sm:py-10 bg-[#070709] text-[#F4F4F6] px-4 sm:px-8 relative z-10 select-none" id="terms-page">
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
            <FileText size={12} className="text-[#C5A059]" />
            <span>LEGAL AGREEMENT</span>
          </div>
          <h1 className="font-display font-semibold text-3xl sm:text-5xl tracking-wide text-[#F4F4F6] uppercase leading-none">
            TERMS OF USE & <span className="text-[#C5A059]">SERVICE AGREEMENT</span>
          </h1>
          <p className="font-sans text-xs text-[#8E909A] font-light leading-relaxed uppercase tracking-wider">
            Official legal parameters and conditions governing the use of Meridian Estates Real Estate platform and services.
          </p>
        </div>

        {/* Terms Content Container matching Disclosures */}
        <div className="bg-[#101114] border border-white/10 p-8 sm:p-12 rounded-[2px] shadow-2xl space-y-8">
          <div className="space-y-2 border-b border-white/10 pb-4">
            <h2 className="font-display font-semibold text-xl sm:text-2xl text-[#F4F4F6] uppercase tracking-tight">
              TERMS OF USE AGREEMENT
            </h2>
            <span className="font-mono text-[9px] text-[#C5A059] uppercase tracking-widest block">EFFECTIVE DATE: AUGUST 2026</span>
          </div>

          <div className="space-y-6 font-sans text-xs sm:text-sm text-[#8E909A] leading-relaxed font-light">
            <p>
              Welcome to Meridian Estates Real Estate. By accessing or using our website, services, property dossiers, and associated content, you agree to comply with and be bound by the following terms and conditions.
            </p>

            <div className="space-y-2 pt-2 border-t border-white/10">
              <h3 className="font-display font-semibold text-base text-[#C5A059] uppercase tracking-wider">1. Brokerage Services & Representation</h3>
              <p>
                All property listings, market assessments, and real estate advisory details displayed on this website are for informational purposes. Formal client representation is established only upon execution of a written buyer or seller representation agreement compliant with Colorado Real Estate Commission (TREC) rules.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/10">
              <h3 className="font-display font-semibold text-base text-[#C5A059] uppercase tracking-wider">2. Equal Housing Opportunity</h3>
              <p>
                Meridian Estates fully supports the principles of the Fair Housing Act and the Equal Opportunity Act. All properties are offered on an equal opportunity basis without discrimination based on race, color, religion, sex, handicap, familial status, or national origin.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/10">
              <h3 className="font-display font-semibold text-base text-[#C5A059] uppercase tracking-wider">3. Intellectual Property</h3>
              <p>
                All editorial photography, architectural copywriting, property dossiers, brand assets, and frame-scrubbing visual media are the exclusive property of Meridian Estates and protected under applicable trademark and copyright laws.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/10">
              <h3 className="font-display font-semibold text-base text-[#C5A059] uppercase tracking-wider">4. Brokerage Fee Negotiability</h3>
              <p>
                Brokerage commission rates and service fees are not set by state law and are fully negotiable between principal and broker. All services are rendered in strict compliance with TREC statutes.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
