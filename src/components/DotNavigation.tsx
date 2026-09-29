import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ActivePage } from '../types';

export interface SectionDot {
  id: string;
  label: string;
}

export const SECTIONS: SectionDot[] = [
  { id: 'overview', label: 'OVERVIEW' },
  { id: 'legacy', label: 'LEGACY' },
  { id: 'services', label: 'SERVICES' },
  { id: 'properties', label: 'PORTFOLIO' },
  { id: 'philosophy', label: 'PHILOSOPHY' },
  { id: 'location', label: 'LOCATION' },
  { id: 'contact', label: 'CONTACT' },
];

interface DotNavigationProps {
  activePage: ActivePage;
  onChangePage: (page: ActivePage) => void;
}

export default function DotNavigation({ activePage, onChangePage }: DotNavigationProps) {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    if (activePage !== 'home') return;

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const sectionIds = ["overview", "legacy", "services", "properties-section", "philosophy", "location", "contact-section"];

    const checkActiveSection = () => {
      const viewportCenter = window.innerHeight / 2;
      let currentSection = 'overview';
      let closestDist = Infinity;

      sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          currentSection = id.replace('-section', '');
          closestDist = -1;
        } else if (closestDist !== -1) {
          const dist = Math.abs(rect.top - viewportCenter);
          if (dist < closestDist) {
            closestDist = dist;
            currentSection = id.replace('-section', '');
          }
        }
      });

      setActiveSection(currentSection);
    };

    // Initial evaluation & window scroll listener
    checkActiveSection();
    window.addEventListener('scroll', checkActiveSection, { passive: true });

    const ctx = gsap.context(() => {
      sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => setActiveSection(id.replace('-section', '')),
          onEnterBack: () => setActiveSection(id.replace('-section', '')),
          onRefresh: checkActiveSection,
        });
      });
    });

    return () => {
      window.removeEventListener('scroll', checkActiveSection);
      ctx.revert();
    };
  }, [activePage]);

  const handleDotClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();

    if (activePage !== 'home') {
      onChangePage('home');
      setTimeout(() => {
        const target = sectionId === 'overview' ? 'overview' : sectionId === 'contact' ? 'contact-section' : sectionId === 'properties' ? 'properties-section' : sectionId;
        const el = document.getElementById(target) || document.getElementById(sectionId);
        if (el) {
          const lenis = (window as any).lenis;
          if (lenis && typeof lenis.scrollTo === 'function') {
            lenis.scrollTo(el, { duration: 1.2, force: true, lock: false });
          } else {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 250);
      return;
    }

    const target = sectionId === 'overview' ? 'overview' : sectionId === 'contact' ? 'contact-section' : sectionId === 'properties' ? 'properties-section' : sectionId;
    const el = document.getElementById(target) || document.getElementById(sectionId);
    if (!el) return;

    const lenis = (window as any).lenis;
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(el, { duration: 1.2, force: true, lock: false });
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (activePage !== 'home') {
      onChangePage('home');
    } else {
      const lenis = (window as any).lenis;
      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(0, { force: true });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const isFrameSection = activePage === 'home' && (activeSection === 'overview' || activeSection === 'philosophy');

  return (
    <>
      {/* Fixed Top-Left Stealth Brand Logo (Hidden in Overview & Philosophy when frames play) */}
      <div 
        style={{
          position: 'fixed',
          top: '1.5rem',
          left: '2rem',
          zIndex: 1000,
          opacity: isFrameSection ? 0 : 1,
          pointerEvents: isFrameSection ? 'none' : 'auto',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
          transform: isFrameSection ? 'translateY(-10px)' : 'translateY(0)',
        }}
        onClick={handleLogoClick}
        className="hidden md:flex flex-col cursor-pointer group select-none"
        id="sidebar-brand-logo"
      >
        <span className="font-display font-semibold text-base sm:text-lg tracking-widest leading-none text-[#F4F4F6] group-hover:text-[#C5A059] transition-colors duration-300">
          Meridian Estates
        </span>
        <span className="font-mono text-[8px] font-bold tracking-[0.2em] text-[#C5A059] mt-1 uppercase">
          COLORADO REAL ESTATE
        </span>
      </div>

      {/* Pure Floating Section Shortcuts (No Box Container - Visible on md+ screens) */}
      <nav 
        aria-label="Section navigation sidebar" 
        style={{
          zIndex: 999,
          position: 'fixed',
          left: '1.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'auto',
          background: 'transparent',
          padding: '0',
          border: 'none',
          boxShadow: 'none',
        }}
        className="sidebar-nav hidden md:flex flex-col items-start space-y-1.5 select-none"
        id="dot-navigation-bar"
      >
        {SECTIONS.map((section) => {
          const isActive = activePage === 'home' && activeSection === section.id;
          const isHovered = hoveredSection === section.id;

          return (
            <button
              key={section.id}
              onClick={(e) => handleDotClick(e, section.id)}
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
              className={`group flex items-center space-x-2 cursor-pointer py-0.5 text-left transition-all duration-300 focus:outline-none active:scale-95 ${
                isActive ? 'active' : ''
              }`}
              aria-label={`Navigate to ${section.label}`}
              id={`sidebar-nav-${section.id}`}
            >
              {/* Minimalist Indicator Dot */}
              <div className="relative flex items-center justify-center w-3 h-3">
                <div
                  className={`rounded-full transition-colors duration-300 ${
                    isActive
                      ? 'w-1.5 h-1.5 bg-[#C5A059]'
                      : isHovered
                      ? 'w-1.5 h-1.5 bg-[#F4F4F6] opacity-100'
                      : 'w-1.5 h-1.5 bg-[#F4F4F6] opacity-35 group-hover:opacity-100'
                  }`}
                />
              </div>

              {/* Section Link Label */}
              <span
                style={{ fontSize: '0.7rem', letterSpacing: '0.12em' }}
                className={`font-mono uppercase transition-colors duration-300 pointer-events-none whitespace-nowrap ${
                  isActive
                    ? 'text-[#C5A059] font-bold opacity-100'
                    : isHovered
                    ? 'text-[#F4F4F6] font-medium opacity-100'
                    : 'text-[#F4F4F6] opacity-45 group-hover:opacity-100'
                }`}
              >
                {section.label}
              </span>
            </button>
          );
        })}

      </nav>
    </>
  );
}
