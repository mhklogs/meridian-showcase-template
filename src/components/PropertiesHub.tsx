import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROPERTIES } from '../data';
import { Property } from '../types';
import { MapPin, X, Phone, ArrowUpRight, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

interface PropertiesHubProps {
  onContactSeller: (address: string) => void;
}

export default function PropertiesHub({ onContactSeller }: PropertiesHubProps) {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const categories = ['All', 'Single Family', 'Estate', 'Waterfront', 'Farm & Ranch', 'Modern'];

  // Full curated portfolio dataset
  const allProperties = PROPERTIES;

  // Filter listings based on category selection
  const filteredProperties = selectedType === 'All'
    ? allProperties
    : allProperties.filter(p => p.type === selectedType);


  // Currency utility
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };


  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Preload frame image sequence for background canvas in Portfolio Hub (/inbetween) — desktop only (canvas is hidden on phones)
  useEffect(() => {
    if (window.innerWidth < 768) return;
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 0; i < 150; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/inbetween/frame_${frameNum}.jpg?v=native1to1`;
      img.onload = () => {
        if (i === 0) {
          renderBackgroundCanvas(0);
        }
      };
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;
  }, []);

  const renderBackgroundCanvas = (progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const TOTAL_FRAMES = 150;
    const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(progress * TOTAL_FRAMES)));
    
    let img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = imagesRef.current[Math.max(0, frameIdx - offset)];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
      }
    }
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    const imgWidth = img.naturalWidth || 1920;
    const imgHeight = img.naturalHeight || 1080;
    const canvasRatio = width / height;
    const imgRatio = imgWidth / imgHeight;

    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // GSAP ScrollTrigger horizontal scroll pinning engine
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      const track = wrapper.querySelector(".property-track") as HTMLElement;
      if (!track) return;

      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        // On mobile phone view, allow smooth native touch scroll without aggressive screen pinning
        gsap.set(track, { x: 0 });
        renderBackgroundCanvas(0.5);
        return;
      }

      const getScrollAmount = () => {
        const cards = track.querySelectorAll('.property-card, .terminal-end-card');
        if (!cards.length) return 0;
        
        let totalWidth = 0;
        cards.forEach((card) => {
          totalWidth += (card as HTMLElement).offsetWidth;
        });
        const gap = 40;
        totalWidth += (cards.length - 1) * gap;

        const parentWidth = stageRef.current?.clientWidth || wrapper.clientWidth || window.innerWidth;
        const maxScroll = Math.max(0, totalWidth - parentWidth + 60);
        return maxScroll;
      };

      const scrollAmount = getScrollAmount();

      if (scrollAmount <= 0) {
        gsap.set(track, { x: 0 });
        return;
      }

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => "+=" + getScrollAmount(),
          pin: true,
          pinSpacing: true,
          scrub: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            renderBackgroundCanvas(self.progress);
          },
          onLeaveBack: () => {
            gsap.set(track, { x: 0 });
            renderBackgroundCanvas(0);
          },
          onLeave: () => {
            gsap.set(track, { x: -getScrollAmount() });
            renderBackgroundCanvas(1);
          },
          onEnterBack: (self) => {
            gsap.set(track, { x: -self.progress * getScrollAmount() });
            renderBackgroundCanvas(self.progress);
          },
        },
      });
    }, wrapper);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [selectedType, filteredProperties.length, expandedCardId]);


  return (
    <div 
      ref={wrapperRef}
      id="properties"
      className="portfolio-container relative z-20 w-full bg-[#070709]" 
    >
      <section 
        id="properties-section"
        className="relative z-20 w-full bg-[#070709] text-[#F4F4F6] border-t border-white/10 select-none" 
      >
        {/* Background Frame Scrubbing Canvas (/inbetween) */}
        <canvas
          ref={canvasRef}
          className="frame-scrub-canvas absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-100 hidden md:block"
        />

        {/* Legibility Scrim over the frame canvas */}
        <div
          className="absolute inset-0 z-[5] pointer-events-none hidden md:block"
          style={{
            background: 'linear-gradient(to bottom, rgba(7,7,9,0.55) 0%, rgba(7,7,9,0.35) 50%, rgba(7,7,9,0.60) 100%)'
          }}
        />

        {/* Pinned Viewport Stage Container */}
        <div 
          ref={stageRef}
          className="w-full md:h-screen flex flex-col justify-start md:justify-between gap-6 md:gap-0 pt-20 sm:pt-24 md:pt-16 pb-8 px-4 sm:px-8 md:pl-40 md:pr-16 relative z-10 bg-transparent"
        >
          {/* Header & Filter Controller Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4 z-10">
            <div className="space-y-1">
              <span className="font-mono text-[9px] text-[#C5A059] font-bold uppercase tracking-[0.25em] block">
                CURATED PORTFOLIO
              </span>
              <h2 className="font-display font-semibold text-xl sm:text-3xl md:text-4xl tracking-wide text-[#F4F4F6] uppercase leading-none">
                COLORADO <span className="text-[#C5A059]">PORTFOLIO</span>
              </h2>
            </div>

            {/* Filter Category Selector Tabs */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-widest">
              {categories.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedType(type);
                    setExpandedCardId(null);
                  }}
                  className={`relative pb-1 transition-colors duration-300 cursor-pointer bg-transparent ${
                    selectedType === type
                      ? 'text-[#C5A059] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-[#C5A059]'
                      : 'text-[#8E909A] hover:text-[#F4F4F6]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Properties Cards Track */}
          <div className="relative md:my-auto w-full py-4 z-10">
            <div
              ref={trackRef}
              className="property-track flex flex-nowrap space-x-4 sm:space-x-8 md:space-x-10 items-start will-change-transform overflow-x-auto md:overflow-visible touch-pan-x snap-x snap-mandatory no-scrollbar py-2"
              id="properties-horizontal-track"
            >
              {filteredProperties.map((prop) => {
                const isCardExpanded = expandedCardId === prop.id;
                return (
                  <div 
                    key={prop.id}
                  className="property-card flex-shrink-0 snap-center bg-[#101114] border border-white/10 overflow-hidden relative shadow-2xl hover:border-[#C5A059] transition-all duration-500 flex flex-col justify-between rounded-[2px]"
                  style={{
                    flex: '0 0 clamp(250px, 75vw, 340px)',
                    maxWidth: '340px',
                    minWidth: '250px',
                    width: '100%',
                    boxSizing: 'border-box',
                  }}
                  id={`prop-grid-card-${prop.id}`}
                >
                    {/* Image & Type Badge */}
                    <div 
                      className="relative aspect-[16/9] w-full overflow-hidden bg-[#08080A] cursor-pointer group"
                      onClick={() => setSelectedProperty(prop)}
                    >
                      <img 
                        src={prop.image} 
                        alt={prop.type} 
                        className="w-full h-full object-cover select-none filter grayscale hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-[#08080A]/30 group-hover:opacity-0 transition-opacity pointer-events-none" />

                      {/* Type Badge */}
                      <div className="absolute top-3 left-3 z-20">
                        <span className="font-mono text-[9px] tracking-widest uppercase font-bold text-[#F4F4F6] drop-shadow-lg">
                          {prop.type}
                        </span>
                      </div>
                    </div>

                    {/* Minimal Essential Preview (Price Always Visible) */}
                    <div className="p-4 space-y-2 flex flex-col justify-between flex-grow">
                      <div className="space-y-1">
                        <h3 
                          onClick={() => setSelectedProperty(prop)}
                          className="font-display font-semibold text-xl text-[#F4F4F6] uppercase tracking-wide leading-none hover:text-[#C5A059] transition-colors cursor-pointer"
                        >
                          {formatPrice(prop.price)}
                        </h3>
                      </div>

                      {/* Expandable Details Block (Unhides when arrow button clicked) */}
                      <AnimatePresence>
                        {isCardExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-3 pt-2.5 border-t border-white/10"
                          >
                            <p className="font-sans text-[11px] text-[#C5A059] uppercase font-medium tracking-wider flex items-center space-x-1">
                              <MapPin size={11} className="text-[#C5A059] flex-shrink-0" />
                              <span className="truncate">{prop.address}</span>
                            </p>

                            <p className="font-sans text-[11px] text-[#8E909A] line-clamp-3 leading-relaxed font-light">
                              {prop.description}
                            </p>

                            {/* Specs Matrix */}
                            <div className="grid grid-cols-3 gap-1 border-t border-white/10 pt-2.5 font-mono text-[9px] text-[#8E909A] text-center">
                              <div>
                                <span className="block text-[#F4F4F6] text-xs font-bold">{prop.beds}</span>
                                <span className="uppercase text-[8px] tracking-widest text-[#8E909A]">Beds</span>
                              </div>
                              <div className="border-x border-white/10">
                                <span className="block text-[#F4F4F6] text-xs font-bold">{prop.baths}</span>
                                <span className="uppercase text-[8px] tracking-widest text-[#8E909A]">Baths</span>
                              </div>
                              <div>
                                <span className="block text-[#F4F4F6] text-xs font-bold">{prop.sqft.toLocaleString()}</span>
                                <span className="uppercase text-[8px] tracking-widest text-[#8E909A]">Sqft</span>
                              </div>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProperty(prop);
                              }}
                              className="w-full py-2 text-[#C5A059] hover:text-[#F4F4F6] font-mono text-[9px] font-bold tracking-widest uppercase transition-colors duration-300 flex items-center justify-center space-x-1.5 cursor-pointer"
                            >
                              <span>VIEW DOSSIER</span>
                              <ArrowUpRight size={12} />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Arrow Expand Toggle Bar */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedCardId(isCardExpanded ? null : prop.id);
                        setTimeout(() => ScrollTrigger.refresh(), 350);
                      }}
                      className="w-full bg-[#0E0F12] text-[#8E909A] hover:text-[#C5A059] hover:bg-[#14161C] py-2 px-4 font-mono text-[9px] font-bold tracking-widest uppercase border-t border-white/10 flex items-center justify-between transition-colors duration-300 cursor-pointer active:scale-98"
                      aria-label="Toggle property details"
                      id={`toggle-card-details-${prop.id}`}
                    >
                      <span>{isCardExpanded ? 'HIDE' : 'DETAILS'}</span>
                      {isCardExpanded ? <ChevronUp size={14} className="text-[#C5A059]" /> : <ChevronDown size={14} />}
                    </button>

                  </div>
                );
              })}

              {/* Terminal End Card: Off-Market Asset Advisory */}
              <div 
                onClick={() => onContactSeller('')}
                className="property-card flex-shrink-0 bg-[#101114] border border-dashed border-[#C5A059]/40 overflow-hidden relative shadow-2xl hover:border-[#C5A059] transition-all duration-500 flex flex-col justify-between cursor-pointer group rounded-[2px]"
                style={{
                  flex: '0 0 320px',
                  maxWidth: '340px',
                  minWidth: '280px',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <div className="p-6 space-y-4 flex flex-col justify-between h-full">
                  <div className="space-y-3">
                    <span className="font-mono text-[8px] tracking-widest uppercase font-bold text-[#C5A059]">
                      PRIVATE INQUIRY
                    </span>
                    <h3 className="font-display font-semibold text-xl text-[#F4F4F6] uppercase tracking-wide leading-tight">
                      SEEKING SOMETHING OFF-MARKET?
                    </h3>
                    <p className="font-sans text-[11px] text-[#8E909A] leading-relaxed font-light">
                      Access unlisted Colorado estates through our private corridor.
                    </p>
                  </div>

                  <div className="text-[#C5A059] py-2.5 font-mono text-[9px] font-bold tracking-widest uppercase flex items-center justify-between group-hover:text-[#F4F4F6] transition-colors">
                    <span>GET IN TOUCH</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>


        {/* DETAIL MODAL DRAWER OVERLAY */}
        <AnimatePresence>
          {selectedProperty && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#0A0A0C]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
              onClick={() => setSelectedProperty(null)}
              id="property-detail-modal"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 30 }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className="bg-[#121316] text-[#F4F3EF] border border-[#C5A880]/50 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedProperty(null)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 bg-[#16181E] hover:bg-[#E85A37] text-white flex items-center justify-center rounded-full transition-colors cursor-pointer border border-[#22242B]"
                  id="modal-close-btn"
                >
                  <X size={18} />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-12">
                  
                  {/* Image Section */}
                  <div className="md:col-span-6 relative aspect-[4/3] md:aspect-auto md:h-full min-h-[300px]">
                    <img 
                      src={selectedProperty.image} 
                      alt={selectedProperty.address} 
                      className="w-full h-full object-cover absolute inset-0 grayscale hover:grayscale-0 transition-all duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-[#0A0A0C]/30 pointer-events-none" />
                    
                    {/* Overlay pricing */}
                    <div className="absolute bottom-6 left-6 text-white z-10 space-y-1">
                      <span className="font-mono text-[9px] text-[#C5A880] font-bold uppercase tracking-widest block drop-shadow-lg">
                        {selectedProperty.type}
                      </span>
                      <h3 className="font-display font-black text-3xl sm:text-4xl tracking-tighter block uppercase drop-shadow-2xl">
                        {formatPrice(selectedProperty.price)}
                      </h3>
                    </div>
                  </div>

                  {/* Text and Form section */}
                  <div className="md:col-span-6 p-8 sm:p-10 space-y-6 flex flex-col justify-between">
                    
                    <div className="space-y-4">
                      
                      {/* Header */}
                      <div className="space-y-1">
                        <span className="font-mono text-[8px] tracking-widest uppercase font-bold text-[#C5A880] inline-block pt-1">
                          {selectedProperty.status}
                        </span>
                        <h2 className="font-display font-black text-xl text-[#F4F3EF] uppercase leading-tight pt-1">
                          {selectedProperty.address}
                        </h2>
                      </div>

                      {/* Specs Grid */}
                      <div className="grid grid-cols-3 gap-2 border-t border-b border-[#22242B] py-4 font-mono text-[10px] text-[#F4F3EF]/60 text-center">
                        <div>
                          <span className="block font-black text-[#F4F3EF] text-sm">{selectedProperty.beds}</span>
                          <span className="uppercase text-[8px] tracking-widest">Beds</span>
                        </div>
                        <div className="border-x border-[#22242B]">
                          <span className="block font-black text-[#F4F3EF] text-sm">{selectedProperty.baths}</span>
                          <span className="uppercase text-[8px] tracking-widest">Baths</span>
                        </div>
                        <div>
                          <span className="block font-black text-[#F4F3EF] text-sm">
                            {selectedProperty.sqft.toLocaleString()}
                          </span>
                          <span className="uppercase text-[8px] tracking-widest">Sqft</span>
                        </div>
                      </div>

                      {/* Full Description */}
                      <p className="font-sans text-xs text-[#F4F3EF]/80 leading-relaxed font-normal">
                        {selectedProperty.description}
                      </p>

                    </div>

                    {/* Immediate Inquiry Form */}
                    <div className="pt-6 border-t border-[#22242B] space-y-4">

                      <p className="font-sans text-xs text-[#F4F3EF]/85 leading-relaxed font-normal">
                        Interested in <strong className="text-[#C5A880]">"{selectedProperty.address}"</strong>? Notify Alex Morgan directly.
                      </p>

                      <div className="pt-2 flex gap-3">
                        <button
                          onClick={() => {
                            onContactSeller(`Inquiry Regarding: ${selectedProperty.address}`);
                            setSelectedProperty(null);
                          }}
                          className="bg-[#E85A37] text-white hover:bg-[#C5A880] hover:text-[#0A0A0C] font-display text-xs font-bold tracking-widest px-6 py-3.5 uppercase transition-all duration-300 flex-grow text-center cursor-pointer active:scale-95 flex items-center justify-center space-x-1"
                          id="modal-inquire-btn"
                        >
                          <span>INQUIRE ↗</span>
                        </button>

                        <a
                          href="tel:5125607284"
                          className="border border-[#22242B] hover:bg-[#22242B] text-[#F4F3EF] flex items-center justify-center w-12 h-12 transition-all duration-300"
                          title="Call Alex Morgan directly"
                          id="modal-phone-btn"
                        >
                          <Phone size={16} />
                        </a>
                      </div>

                      <p className="font-mono text-[8px] text-[#F4F3EF]/40 uppercase tracking-widest pt-2">
                        Meridian Estates · TREC #0000000
                      </p>
                    </div>

                  </div>

                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </section>
    </div>
  );
}
