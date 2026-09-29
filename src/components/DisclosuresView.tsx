import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { ActivePage } from '../types';

interface DisclosuresViewProps {
  onChangePage: (page: ActivePage) => void;
}

export default function DisclosuresView({ onChangePage }: DisclosuresViewProps) {
  return (
    <section className="py-6 sm:py-10 bg-[#070709] text-[#F4F4F6] px-4 sm:px-8 relative z-10 select-none" id="disclosures-page">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Navigation back button */}
        <button
          onClick={() => onChangePage('contact')}
          className="inline-flex items-center space-x-2 font-mono text-xs text-[#C5A059] font-bold hover:underline cursor-pointer tracking-wider uppercase active:scale-95 transition-transform"
        >
          <ArrowLeft size={14} />
          <span>RETURN TO FOOTER & CONTACT</span>
        </button>

        {/* Header Block */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-b border-white/10 pb-8 space-y-4"
        >
          <div className="inline-flex items-center space-x-2 border border-white/10 px-3 py-1 font-mono text-[9px] tracking-widest text-[#C5A059] uppercase bg-[#101114] rounded-[2px]">
            <ShieldCheck size={12} className="text-[#C5A059]" />
            <span>STATUTORY COMPLIANCE</span>
          </div>
          <h1 className="font-display font-semibold text-3xl sm:text-5xl tracking-wide text-[#F4F4F6] uppercase leading-none">
            TREC DISCLOSURES & <span className="text-[#C5A059]">REGULATORY MANDATES</span>
          </h1>
          <p className="font-sans text-xs text-[#8E909A] font-light leading-relaxed uppercase tracking-wider">
            Official Colorado Real Estate Commission (TREC) Information About Brokerage Services (IABS) & Consumer Protection Notice.
          </p>
        </motion.div>

        {/* Consumer Protection Notice Box */}
        <div className="bg-[#101114] border-l-2 border-[#C5A059] border-y border-r border-white/10 p-6 space-y-4 rounded-[2px]">
          <span className="font-mono text-[9px] text-[#C5A059] font-bold uppercase tracking-widest block">
            TREC BULLETIN FOR CONSUMERS
          </span>
          <h2 className="font-display font-semibold text-lg text-[#F4F4F6] uppercase leading-tight">
            Colorado Real Estate Commission Consumer Protection Notice
          </h2>
          <p className="font-sans text-xs text-[#8E909A] font-light leading-relaxed">
            The Colorado Real Estate Commission (TREC) regulates real estate brokers and sales agents, real estate inspectors, home warranty companies, easement or right-of-way agents, and timeshare developers. You can find information about filing a complaint on the official TREC website.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 font-mono text-[10px]">
            <a 
              href="https://example.com/regulatory/complaint-form.pdf" 
              target="_blank" 
              rel="noreferrer" 
              className="text-[#C5A059] font-bold hover:underline inline-flex items-center space-x-1"
            >
              <span>VIEW OFFICIAL TREC CN 1-5 PDF ↗</span>
            </a>
            <span className="text-white/20">|</span>
            <a 
              href="https://example.com/regulator" 
              target="_blank" 
              rel="noreferrer" 
              className="text-[#F4F4F6] hover:text-[#C5A059] transition-colors font-bold hover:underline inline-flex items-center space-x-1"
            >
              <span>VISIT WWW.TREC.COLORADO.GOV ↗</span>
            </a>
          </div>
        </div>

        {/* Form TXR-2501 (Information About Brokerage Services) Document */}
        <div className="bg-[#101114] border border-white/10 p-8 sm:p-12 rounded-[2px] shadow-2xl space-y-8 relative">
          <div className="absolute top-4 right-4 border border-white/10 px-3 py-1 font-mono text-[8px] text-[#C5A059] uppercase tracking-widest bg-[#08080A]">
            STATE FORM TXR-2501
          </div>

          <div className="text-center space-y-2 border-b border-white/10 pb-6">
            <h2 className="font-display font-semibold text-xl tracking-tight text-[#F4F4F6] uppercase leading-tight">
              INFORMATION ABOUT BROKERAGE SERVICES
            </h2>
            <p className="font-sans text-[10px] text-[#8E909A] font-light max-w-lg mx-auto leading-relaxed uppercase">
              Colorado law requires all real estate license holders to give the following information about brokerage services to prospective buyers, tenants, sellers and landlords.
            </p>
          </div>

          {/* Types of License Holders */}
          <div className="space-y-3">
            <h3 className="font-display font-semibold text-sm text-[#C5A059] uppercase tracking-widest">
              TYPES OF REAL ESTATE LICENSE HOLDERS:
            </h3>
            <ul className="space-y-2 font-sans text-xs text-[#8E909A] list-disc pl-4 leading-relaxed font-light">
              <li>
                <strong className="text-[#F4F4F6] font-semibold uppercase">A BROKER</strong> is responsible for all brokerage activities, including acts performed by sales agents sponsored by the broker.
              </li>
              <li>
                <strong className="text-[#F4F4F6] font-semibold uppercase">A SALES AGENT</strong> must be sponsored by a broker and works with clients on behalf of the broker.
              </li>
            </ul>
          </div>

          {/* License Holder Contact Information Matrix Table */}
          <div className="space-y-4 border-t border-white/10 pt-6">
            <h3 className="font-display font-semibold text-sm text-[#C5A059] uppercase tracking-widest">
              LICENSE HOLDER CONTACT INFORMATION MATRIX:
            </h3>
            
            <div className="overflow-x-auto border border-white/10 rounded-[2px]">
              <table className="w-full text-left font-mono text-[9px] border-collapse min-w-[500px]">
                <thead>
                  <tr className="bg-[#08080A] text-[#F4F4F6] border-b border-white/10">
                    <th className="p-3 uppercase">LICENSEE ROLE / BRAND</th>
                    <th className="p-3 uppercase">LICENSE NO.</th>
                    <th className="p-3 uppercase">EMAIL ADDRESS</th>
                    <th className="p-3 uppercase">TELEPHONE NO.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 bg-[#101114] text-[#F4F4F6]">
                  <tr>
                    <td className="p-3 font-bold uppercase">Licensed Broker Firm:<br />Meridian Estates</td>
                    <td className="p-3 font-bold">0594267</td>
                    <td className="p-3 select-all text-[#C5A059]">meridian@swbell.net</td>
                    <td className="p-3">(512) 560-7284</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold uppercase">Designated Broker:<br />Alex Morgan</td>
                    <td className="p-3 font-bold">0175549</td>
                    <td className="p-3 select-all text-[#C5A059]">meridian@swbell.net</td>
                    <td className="p-3">(512) 560-7284</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
