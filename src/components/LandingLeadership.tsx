import { EXECUTIVES } from '../data';
import { ActivePage } from '../types';
import { Linkedin, ArrowUpRight } from 'lucide-react';

interface LandingLeadershipProps {
  onChangePage: (page: ActivePage) => void;
}

export default function LandingLeadership({ onChangePage }: LandingLeadershipProps) {
  return (
    <section className="bg-[#070709] text-[#F4F4F6] py-20 px-6 sm:px-12 md:pl-36 border-t border-white/10 relative z-10" id="legacy">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Heading & Dedicated Link */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h2 className="font-display font-semibold text-3xl sm:text-5xl text-[#F4F4F6] uppercase leading-none tracking-wide">
              LEADERSHIP
            </h2>
          </div>

          <button
            onClick={() => {
              window.location.hash = 'leadership';
              onChangePage('about');
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#C5A059',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: 0,
              cursor: 'pointer',
            }}
            className="font-mono font-bold hover:text-[#F4F4F6] transition-colors inline-flex items-center space-x-2 group"
          >
            <span>FULL LEADERSHIP DOSSIER</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>

        {/* Minimalist Landing Grid (No Outer Box Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {EXECUTIVES.map((exec) => {
            const roleTitle = exec.name === 'Alex Morgan'
              ? 'FOUNDING BROKER & DESIGNATED REALTOR'
              : 'INTERNATIONAL PROGRAM DIRECTOR';

            const summaryDescription = exec.name === 'Alex Morgan'
              ? 'Engineering long-term wealth preservation and institutional capital structures across Colorado.'
              : 'Directing international investor partnerships, program operations, and corporate relations.';

            return (
              <div 
                key={exec.name}
                onClick={() => {
                  window.location.hash = 'leadership';
                  onChangePage('about');
                }}
                className="flex flex-col sm:flex-row items-start gap-6 bg-transparent border-none p-0 shadow-none cursor-pointer group"
              >

                {/* Headshot Photo */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 aspect-square overflow-hidden border-none bg-black/40">
                  <img
                    src={exec.image}
                    alt={exec.name}
                    className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Name, Role & 1-Line Quote */}
                <div className="space-y-2 flex-grow">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-display font-semibold text-2xl sm:text-3xl text-[#F4F4F6] uppercase leading-none group-hover:text-[#C5A059] transition-colors">
                      {exec.name}
                    </h3>
                    {exec.linkedin && (
                      <a
                        href={exec.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#8E909A] hover:text-[#C5A059] transition-colors"
                        title="LinkedIn Profile"
                      >
                        <Linkedin size={16} />
                      </a>
                    )}
                  </div>

                  <span className="font-mono text-xs text-[#C5A059] font-bold uppercase tracking-widest block">
                    {roleTitle}
                  </span>

                  <p className="font-sans text-xs sm:text-sm text-[#8E909A] leading-relaxed font-light pt-1 max-w-md">
                    {summaryDescription}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
