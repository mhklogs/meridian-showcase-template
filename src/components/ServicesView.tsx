import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES } from '../data';
import { ChevronDown, CheckCircle2, ShieldAlert } from 'lucide-react';
import { ActivePage } from '../types';

interface ServicesViewProps {
  onChangePage: (page: ActivePage) => void;
}

// Custom lifestyle images matching the services database entities
const SERVICE_IMAGES: { [key: string]: string } = {
  'buyer-rep': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
  'seller-rep': 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
  'commercial': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  'property-mgmt': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
  'investment': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
};

export default function ServicesView({ onChangePage }: ServicesViewProps) {
  const [expandedId, setExpandedId] = useState<string>('buyer-rep');

  const toggleExpand = (id: string) => {
    setExpandedId(id); // Set active to ensure one is always selected and cross-fades
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.refresh();
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 450);
  };

  const activeImage = SERVICE_IMAGES[expandedId] || SERVICE_IMAGES['buyer-rep'];

  return (
    <section 
      className="bg-[#101114] text-[#F4F4F6] relative z-10 w-full h-auto py-16 sm:py-20 px-6 md:pl-36 overflow-visible border-t border-b border-white/10 mb-0" 
      id="services"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="space-y-2 max-w-xl">
          <span className="font-mono text-[9px] text-[#C5A059] font-bold uppercase tracking-[0.25em] block">
            EXPERT ADVISORY
          </span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-wide text-[#F4F4F6] uppercase leading-none">
            SPECIALIZED <span className="text-[#C5A059]">SERVICES</span>
          </h2>
          <p className="text-[#8E909A] text-xs sm:text-sm leading-relaxed font-light">
            Standard-setting advisory across luxury residential, commercial acquisitions, 1031 exchanges, and direct capital placements.
          </p>
        </div>

        {/* Detailed services list with interactive accordions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - Accordions with Ultra-Clean Horizontal Line Breaks */}
          <div className="lg:col-span-7 flex flex-col justify-between" id="services-accordions-container">
            <div className="divide-y divide-white/10 border-t border-b border-white/10">
              {SERVICES.map((srv, index) => {
                const isExpanded = expandedId === srv.id;
                return (
                  <div 
                    key={srv.id}
                    className="overflow-hidden transition-colors duration-300"
                    id={`service-card-${srv.id}`}
                  >
                    {/* Header click bar */}
                    <button
                      onClick={() => toggleExpand(srv.id)}
                      className="w-full flex justify-between items-center py-4 text-left focus:outline-none cursor-pointer group"
                    >
                      <div className="flex items-center space-x-4">
                        <span className="font-mono text-xs text-[#C5A059] font-bold">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h3 className="font-display font-semibold text-lg sm:text-xl text-[#F4F4F6] uppercase tracking-wide group-hover:text-[#C5A059] transition-colors">
                          {srv.title}
                        </h3>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        className="text-[#F4F4F6]"
                      >
                        <ChevronDown size={18} />
                      </motion.div>
                    </button>

                    {/* Expandable text */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          onAnimationComplete={() => {
                            gsap.registerPlugin(ScrollTrigger);
                            ScrollTrigger.refresh();
                          }}
                        >
                          <div className="pb-5 pt-1 space-y-4">
                            
                            <p className="font-sans text-xs text-[#8E909A] leading-relaxed font-light italic">
                              {srv.shortDesc}
                            </p>

                            {/* Specific Bullet points */}
                            <div className="space-y-2">
                              <h4 className="font-mono font-bold text-[9px] text-[#C5A059] uppercase tracking-widest">
                                OBJECTIVES:
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {srv.features.map((feat, fIdx) => (
                                  <div key={fIdx} className="flex items-start space-x-2 font-mono text-[10px] text-[#8E909A] leading-snug">
                                    <CheckCircle2 size={12} className="text-[#C5A059] flex-shrink-0 mt-0.5" />
                                    <span>{feat}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                );
              })}
            </div>

            {/* Minimalist Regulatory Fee Notice */}
            <div className="pt-4 mt-4 border-t border-white/10 font-mono text-[9px] text-[#8E909A] leading-relaxed flex items-start space-x-2.5">
              <ShieldAlert size={13} className="text-[#C5A059] flex-shrink-0 mt-0.5" />
              <p>
                <span className="text-[#C5A059] font-bold">FEES NOTICE:</span> Real estate brokerage fees are not set by law and are fully negotiable. All services comply with TREC guidelines. Mortgage services provided by Horizon Capital LLC (NMLS #0000000).
              </p>
            </div>
          </div>

          {/* Right Column - Cross-fading Lifestyle Image Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* The Interactive Lifestyle Image Container */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-square overflow-hidden shadow-2xl border border-white/10 h-[300px] lg:h-[360px] rounded-[2px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={expandedId}
                  src={activeImage}
                  alt="Bespoke service representation scene"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-[#0A0A0C]/20 z-10 pointer-events-none" />
              {/* Bottom tag indicator */}
              <div className="absolute bottom-3 right-3 bg-[#08080A]/90 text-white font-mono text-[8px] tracking-widest px-2.5 py-1 z-20 uppercase border border-white/10">
                LIFESTYLE PREVIEW
              </div>
            </div>

            {/* Affiliated Mortgage Advantage */}
            <div className="bg-[#101114] text-[#F4F4F6] p-6 space-y-4 border-l-2 border-[#C5A059] border-y border-r border-white/10 rounded-[2px]" id="services-compliance-highlight">
              <span className="font-mono text-[9px] text-[#C5A059] font-bold uppercase tracking-widest block">
                AFFILIATED MORTGAGE ADVANTAGE
              </span>
              <h3 className="font-display font-semibold text-xl text-[#F4F4F6] uppercase leading-none">
                HORIZON CAPITAL LLC
              </h3>
              <p className="font-sans text-xs text-[#8E909A] leading-relaxed font-light">
                Unifying transactional real estate and capital deployment. Overseen by Designated Broker Alex Morgan (RMLO NMLS #0000000).
              </p>
              
              <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-3 font-mono text-xs text-[#8E909A]">
                <div>
                  <span className="block font-bold text-xs text-[#F4F4F6]">NMLS #0000000</span>
                  <span className="text-[8px] uppercase text-[#C5A059] tracking-wider">Horizon Capital LLC</span>
                </div>
                <div>
                  <span className="block font-bold text-xs text-[#F4F4F6]">NMLS #0000000</span>
                  <span className="text-[8px] uppercase text-[#C5A059] tracking-wider">Alex Morgan, RMLO</span>
                </div>
              </div>

              <div className="pt-1">
                <button 
                  onClick={() => onChangePage('contact')}
                  className="w-full bg-[#C5A059] text-[#08080A] hover:bg-[#F4F4F6] font-mono text-xs font-bold tracking-widest py-3 uppercase transition-colors duration-300 flex items-center justify-center space-x-1 cursor-pointer rounded-[2px] active:scale-98"
                >
                  <span>REQUEST MORTGAGE STRUCTURES ↗</span>
                </button>
              </div>
            </div>
          </div>


        </div>

      </div>
    </section>
  );
}
