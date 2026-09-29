import { useState, useEffect } from 'react';
import { ShieldCheck, FileText, Lock, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface DisclosuresSectionProps {
  initialTab?: 'trec' | 'terms' | 'privacy';
  onBackToMain?: () => void;
}

export default function DisclosuresSection({ initialTab = 'trec', onBackToMain }: DisclosuresSectionProps) {
  const [activeTab, setActiveTab] = useState<'trec' | 'terms' | 'privacy'>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <section className="py-24 sm:py-32 bg-[#0A0A0C] text-[#F4F3EF] border-t border-[#22242B] px-6 min-h-screen" id="disclosures-portal">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Navigation back button */}
        {onBackToMain && (
          <button
            onClick={onBackToMain}
            className="inline-flex items-center space-x-2 font-mono text-xs text-[#C5A880] font-bold hover:underline cursor-pointer tracking-wider uppercase mb-4"
          >
            <ArrowLeft size={14} />
            <span>Return to Main Website</span>
          </button>
        )}

        {/* Header Block */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border-b border-[#22242B] pb-8 space-y-4"
        >
          <div className="inline-flex items-center space-x-2 border border-[#C5A880]/30 px-3 py-1 font-mono text-[9px] tracking-widest text-[#C5A880] uppercase bg-[#121316]">
            <ShieldCheck size={12} className="text-[#C5A880]" />
            <span>REGULATORY & LEGAL PORTAL</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl tracking-tighter text-[#F4F3EF] uppercase leading-none">
            STATUTORY COMPLIANCE & <span className="text-[#C5A880]">LEGAL NOTICES</span>
          </h1>
          <p className="font-sans text-xs text-[#F4F3EF]/80 font-normal leading-relaxed uppercase tracking-wider">
            OFFICIAL REGULATORY DISCLOSURES, TERMS OF SERVICE, AND CONSUMER PRIVACY PROTECTIONS FOR Meridian Estates BROKERAGE.
          </p>
        </motion.div>

        {/* Tab Navigation Controls */}
        <div className="flex border-b border-[#22242B] space-x-2 sm:space-x-4 overflow-x-auto pb-1" id="regulatory-tabs">
          <button
            onClick={() => setActiveTab('trec')}
            className={`flex items-center space-x-2 px-5 py-3 font-mono text-xs font-bold tracking-widest uppercase transition-all border-b-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'trec'
                ? 'border-[#C5A880] text-[#C5A880] bg-[#121316]'
                : 'border-transparent text-[#F4F3EF]/60 hover:text-[#F4F3EF]'
            }`}
          >
            <ShieldCheck size={14} />
            <span>TREC Disclosures (IABS)</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`flex items-center space-x-2 px-5 py-3 font-mono text-xs font-bold tracking-widest uppercase transition-all border-b-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'terms'
                ? 'border-[#C5A880] text-[#C5A880] bg-[#121316]'
                : 'border-transparent text-[#F4F3EF]/60 hover:text-[#F4F3EF]'
            }`}
          >
            <FileText size={14} />
            <span>Terms of Use</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center space-x-2 px-5 py-3 font-mono text-xs font-bold tracking-widest uppercase transition-all border-b-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'border-[#C5A880] text-[#C5A880] bg-[#121316]'
                : 'border-transparent text-[#F4F3EF]/60 hover:text-[#F4F3EF]'
            }`}
          >
            <Lock size={14} />
            <span>Privacy Policy</span>
          </button>
        </div>

        {/* TAB 1: TREC DISCLOSURES */}
        {activeTab === 'trec' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            {/* Consumer Protection Notice Highlight Box */}
            <div className="bg-[#121316] border-l-4 border-[#C5A880] border-y border-r border-[#22242B] p-6 space-y-4 shadow-xl" id="consumer-protection-box">
              <span className="font-mono text-[9px] text-[#C5A880] font-bold uppercase tracking-widest block">
                TREC BULLETIN FOR CONSUMERS
              </span>
              <h2 className="font-display font-extrabold text-lg text-[#F4F3EF] uppercase leading-tight">
                Colorado Real Estate Commission Consumer Protection Notice
              </h2>
              <p className="font-sans text-xs text-[#F4F3EF]/80 font-normal leading-relaxed">
                The Colorado Real Estate Commission (TREC) regulates real estate brokers and sales agents, real estate inspectors, home warranty companies, easement or right-of-way agents, and timeshare developers. You can find information about filing a complaint on the official TREC website.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 font-mono text-[10px]">
                <a 
                  href="https://example.com/regulatory/complaint-form.pdf" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-[#C5A880] font-bold hover:underline inline-flex items-center space-x-1"
                >
                  <span>VIEW OFFICIAL TREC CN 1-5 PDF ↗</span>
                </a>
                <span className="text-[#F4F3EF]/30">|</span>
                <a 
                  href="https://example.com/regulator" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-[#F4F3EF] hover:text-[#C5A880] transition-colors font-bold hover:underline inline-flex items-center space-x-1"
                >
                  <span>VISIT WWW.TREC.COLORADO.GOV ↗</span>
                </a>
              </div>
            </div>

            {/* Form TXR-2501 (Information About Brokerage Services) Official Document Section */}
            <div className="bg-[#121316] border border-[#22242B] p-8 sm:p-12 shadow-xl space-y-8 relative" id="iabs-form-box">
              <div className="absolute top-4 right-4 border border-[#22242B] px-3 py-1 font-mono text-[8px] text-[#C5A880] uppercase tracking-widest bg-[#16181E]">
                STATE FORM TXR-2501
              </div>

              <div className="text-center space-y-2 border-b border-[#22242B] pb-6">
                <h2 className="font-display font-black text-xl tracking-tight text-[#F4F3EF] uppercase leading-tight">
                  INFORMATION ABOUT BROKERAGE SERVICES
                </h2>
                <p className="font-sans text-[10px] text-[#F4F3EF]/70 font-semibold max-w-lg mx-auto leading-relaxed uppercase">
                  Colorado law requires all real estate license holders to give the following information about brokerage services to prospective buyers, tenants, sellers and landlords.
                </p>
              </div>

              {/* Types of License Holders */}
              <div className="space-y-3">
                <h3 className="font-display font-extrabold text-sm text-[#C5A880] uppercase tracking-widest">
                  TYPES OF REAL ESTATE LICENSE HOLDERS:
                </h3>
                <ul className="space-y-2 font-sans text-xs text-[#F4F3EF]/80 list-disc pl-4 leading-relaxed font-normal">
                  <li>
                    <strong className="text-[#F4F3EF] font-semibold uppercase">A BROKER</strong> is responsible for all brokerage activities, including acts performed by sales agents sponsored by the broker.
                  </li>
                  <li>
                    <strong className="text-[#F4F3EF] font-semibold uppercase">A SALES AGENT</strong> must be sponsored by a broker and works with clients on behalf of the broker.
                  </li>
                </ul>
              </div>

              {/* License Holder Contact Information Matrix Table */}
              <div className="space-y-4 border-t border-[#22242B] pt-6">
                <h3 className="font-display font-extrabold text-sm text-[#C5A880] uppercase tracking-widest">
                  LICENSE HOLDER CONTACT INFORMATION MATRIX:
                </h3>
                
                <div className="overflow-x-auto border border-[#22242B]" id="iabs-matrix-table">
                  <table className="w-full text-left font-mono text-[9px] border-collapse min-w-[500px]">
                    <thead>
                      <tr className="bg-[#16181E] text-[#F4F3EF] border-b border-[#22242B]">
                        <th className="p-3 uppercase">LICENSEE ROLE / BRAND</th>
                        <th className="p-3 uppercase">LICENSE NO.</th>
                        <th className="p-3 uppercase">EMAIL ADDRESS</th>
                        <th className="p-3 uppercase">TELEPHONE NO.</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#22242B] bg-[#121316] text-[#F4F3EF]">
                      <tr>
                        <td className="p-3 font-bold uppercase">Licensed Broker Firm:<br />Meridian Estates</td>
                        <td className="p-3 font-bold">0594267</td>
                        <td className="p-3 select-all text-[#C5A880]">meridian@swbell.net</td>
                        <td className="p-3">(512) 560-7284</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold uppercase">Designated Broker:<br />Alex Morgan</td>
                        <td className="p-3 font-bold">0175549</td>
                        <td className="p-3 select-all text-[#C5A880]">meridian@swbell.net</td>
                        <td className="p-3">(512) 560-7284</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: TERMS OF USE */}
        {activeTab === 'terms' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-[#121316] border border-[#22242B] p-8 sm:p-12 shadow-xl space-y-8"
          >
            <div className="space-y-2 border-b border-[#22242B] pb-4">
              <h2 className="font-display font-black text-2xl text-[#F4F3EF] uppercase tracking-tight">
                TERMS OF USE & SERVICE AGREEMENT
              </h2>
              <span className="font-mono text-[9px] text-[#C5A880] uppercase tracking-widest">Effective Date: August 2026</span>
            </div>

            <div className="space-y-6 font-sans text-xs text-[#F4F3EF]/80 leading-relaxed font-normal">
              <p>
                Welcome to Meridian Estates Real Estate. By accessing or using our website, services, and associated content, you agree to comply with and be bound by the following terms and conditions.
              </p>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-sm text-[#C5A880] uppercase tracking-wider">1. Brokerage Services & Representation</h3>
                <p>
                  All property listings, market assessments, and real estate advisory details displayed on this website are for informational purposes. Formal client representation is established only upon execution of a written buyer or seller representation agreement compliant with TREC rules.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-sm text-[#C5A880] uppercase tracking-wider">2. Equal Housing Opportunity</h3>
                <p>
                  Meridian Estates fully supports the principles of the Fair Housing Act and the Equal Opportunity Act. All properties are offered on an equal opportunity basis without discrimination based on race, color, religion, sex, handicap, familial status, or national origin.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-sm text-[#C5A880] uppercase tracking-wider">3. Intellectual Property</h3>
                <p>
                  All editorial photography, architectural copywriting, property dossiers, and brand assets are the exclusive property of Meridian Estates and protected under applicable trademark and copyright laws.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: PRIVACY POLICY */}
        {activeTab === 'privacy' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-[#121316] border border-[#22242B] p-8 sm:p-12 shadow-xl space-y-8"
          >
            <div className="space-y-2 border-b border-[#22242B] pb-4">
              <h2 className="font-display font-black text-2xl text-[#F4F3EF] uppercase tracking-tight">
                PRIVACY & DATA PROTECTION POLICY
              </h2>
              <span className="font-mono text-[9px] text-[#C5A880] uppercase tracking-widest">Effective Date: August 2026</span>
            </div>

            <div className="space-y-6 font-sans text-xs text-[#F4F3EF]/80 leading-relaxed font-normal">
              <p>
                At Meridian Estates, we are committed to safeguarding the privacy and confidential financial profile of our luxury residential and commercial clients.
              </p>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-sm text-[#C5A880] uppercase tracking-wider">1. Information Collection & Usage</h3>
                <p>
                  We collect personal contact details provided voluntarily through our contact forms or telephone inquiries solely to facilitate real estate advisory services, comparative market analysis, and private transaction coordination.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-sm text-[#C5A880] uppercase tracking-wider">2. Non-Disclosure & Confidentiality</h3>
                <p>
                  We do NOT sell, lease, trade, or share your contact or transaction information with third-party telemarketers or external advertisers. Information is disclosed strictly as necessary to execute real estate closing procedures with title companies, lenders, or regulatory auditors.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-sm text-[#C5A880] uppercase tracking-wider">3. Contact Security</h3>
                <p>
                  Should you have any inquiries regarding your stored contact preferences, please reach Designated Broker Alex Morgan directly at (512) 560-7284 or via email at meridian@swbell.net.
                </p>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
