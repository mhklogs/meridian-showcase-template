import { EXECUTIVES } from '../data';
import { ActivePage } from '../types';
import { ArrowLeft, Linkedin, ShieldCheck, Award } from 'lucide-react';

interface AboutViewProps {
  onChangePage: (page: ActivePage) => void;
}

export default function AboutView({ onChangePage }: AboutViewProps) {
  return (
    <section className="pt-32 sm:pt-36 pb-24 bg-[#070709] text-[#F4F4F6] border-t border-white/10 px-6 sm:px-12 min-h-screen relative z-20 w-full block" id="leadership-page">

      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Navigation back button */}
        <button
          onClick={() => onChangePage('home')}
          className="inline-flex items-center space-x-2 font-mono text-xs text-[#C5A059] font-bold hover:underline cursor-pointer tracking-wider uppercase mb-2"
        >
          <ArrowLeft size={14} />
          <span>Return to Home</span>
        </button>

        {/* Page Header */}
        <div className="border-b border-white/10 pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 border border-white/10 px-3 py-1 font-mono text-[9px] tracking-widest text-[#C5A059] uppercase bg-[#101114] rounded-[2px]">
            <Award size={12} className="text-[#C5A059]" />
            <span>EXECUTIVE PROFILE & FIDUCIARY DOSSIER</span>
          </div>
          <h1 className="font-display font-semibold text-3xl sm:text-5xl tracking-wide text-[#F4F4F6] uppercase leading-none">
            LEADERSHIP & <span className="text-[#C5A059]">DOSSIERS</span>
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#8E909A] font-light leading-relaxed max-w-2xl">
            Established under TREC License #0594267, Meridian Estates delivers direct principal representation, multi-jurisdictional license oversight, and high-yield real estate capital stewardship.
          </p>
        </div>

        {/* Full Detailed Executive Dossiers */}
        <div className="space-y-16">
          {EXECUTIVES.map((exec) => (
            <div
              key={exec.name}
              className="bg-[#101114] border border-white/10 p-8 sm:p-12 rounded-[2px] shadow-2xl space-y-8 relative overflow-hidden"
            >
              {/* Profile Card Header */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-8 gap-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 aspect-square overflow-hidden border border-white/10 bg-black/40">
                    <img
                      src={exec.image}
                      alt={exec.name}
                      className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] text-[#C5A059] tracking-widest uppercase font-bold block">
                      OFFICIAL EXECUTIVE DOSSIER
                    </span>
                    <h2 className="font-display font-semibold text-2xl sm:text-4xl text-[#F4F4F6] uppercase leading-none">
                      {exec.name}
                    </h2>
                    <span className="font-mono text-xs text-[#C5A059] font-bold uppercase tracking-widest block pt-1">
                      {exec.role}
                    </span>
                  </div>
                </div>

                {exec.linkedin && (
                  <a
                    href={exec.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 border border-[#C5A059] px-4 py-2.5 font-mono text-xs font-bold text-[#C5A059] hover:bg-[#C5A059] hover:text-[#08080A] transition-all uppercase tracking-wider rounded-[2px]"
                  >
                    <Linkedin size={15} />
                    <span>VIEW LINKEDIN PROFILE ↗</span>
                  </a>
                )}
              </div>

              {/* Biography Summary */}
              <div className="space-y-3">
                <h3 className="font-display font-semibold text-sm text-[#C5A059] uppercase tracking-widest">
                  EXECUTIVE BIOGRAPHY & BACKGROUND
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#8E909A] leading-relaxed font-light">
                  {exec.bio}
                </p>
              </div>

              {/* Regulatory Credentials & Licenses Matrix */}
              <div className="space-y-4 border-t border-white/10 pt-6">
                <h3 className="font-display font-semibold text-sm text-[#C5A059] uppercase tracking-widest">
                  REGULATORY LICENSES & QUALIFICATIONS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {exec.credentials.map((cred, credIdx) => (
                    <div key={credIdx} className="bg-[#08080A] border border-white/10 p-3.5 flex items-start space-x-3 rounded-[2px]">
                      <ShieldCheck size={16} className="text-[#C5A059] flex-shrink-0 mt-0.5" />
                      <span className="font-sans text-xs text-[#F4F4F6]/90 font-light">{cred}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strategic Advisory Specialties */}
              {exec.specialties && exec.specialties.length > 0 && (
                <div className="space-y-3 border-t border-white/10 pt-6">
                  <h3 className="font-display font-semibold text-sm text-[#C5A059] uppercase tracking-widest">
                    STRATEGIC ADVISORY SPECIALTIES
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {exec.specialties.map((spec, specIdx) => (
                      <span key={specIdx} className="bg-[#08080A] border border-[#C5A059]/40 px-3 py-1.5 font-mono text-[9px] text-[#F4F4F6] uppercase tracking-wider rounded-[2px]">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
