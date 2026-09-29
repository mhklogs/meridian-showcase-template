import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Phone } from 'lucide-react';


// Dynamic Captions sequence mapping for Mid-Page Interlude
const SHOWCASE_CAPTIONS = [
  {
    pill: 'PHILOSOPHY & SANCTUARY',
    quote: '“ARCHITECTURE IS NOT MERELY THE SHAPING OF SPACE; IT IS THE SANCTUARY WHERE LEGACY IS WRITTEN.”',
    subtext: '— ALEX MORGAN, DESIGNATED BROKER & FOUNDER · Meridian Estates REAL ESTATE',
  },
  {
    pill: 'PRIVATE CORRIDOR SOURCING',
    quote: '“UNLISTED ASSETS TRANSACT IN PRIVATE CONFIDENCE. WE NAVIGATE THE UNREGISTERED MARKET WITH DISCRETION.”',
    subtext: '— Meridian Estates ACQUISITIONS GROUP · DENVER, COLORADO',
  },
  {
    pill: 'UNCOMPROMISING ADVOCACY',
    quote: '“FIVE DECADES OF UNWAVERING COLORADO REAL ESTATE LEADERSHIP AND RIGOROUS REGULATORY FIDUCIARY OVERSIGHT.”',
    subtext: '— TREC BROKERAGE LICENSE #0594267 · ESTABLISHED 1975',
  },
];

const TOTAL_SHOWCASE_FRAMES = 100;

export default function Showcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const callBtnRef = useRef<HTMLAnchorElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const [activeCaptionIndex, setActiveCaptionIndex] = useState<number>(0);
  const lastFrameRef = useRef<number>(-1);
  const captionRef = useRef<number>(0);

  // Preload converted clips 5, 6 & 7 frame image sequence (frames 0-99 in /herosection)
  // Phones load every 3rd frame — much lighter and smoother on mobile networks
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const step = isMobile ? 3 : 1;
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 0; i < TOTAL_SHOWCASE_FRAMES; i += step) {
      const img = new Image();
      img.decoding = 'async';
      const frameNum = String(i).padStart(3, '0');
      img.src = `/herosection/frame_${frameNum}.jpg?v=native1to1`;
      img.onload = () => {
        if (i === 0) {
          renderCanvasFrame(0);
        }
      };
      loadedImages[i] = img;
    }
    imagesRef.current = loadedImages;
  }, []);


  // Draw current showcase frame to canvas with cover scaling, fallback frame recovery & radial vignette scrim
  const renderCanvasFrame = (frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_SHOWCASE_FRAMES; offset++) {
        const prev = imagesRef.current[Math.max(0, frameIdx - offset)];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
      }
    }
    if (!img || !img.complete || img.naturalWidth === 0) return;


    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

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

    // Draw frame image in 100% crisp original video quality
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    // Anchor the call button onto the frame watermark spot (bottom-right of the source video)
    const btn = callBtnRef.current;
    if (btn) {
      const bw = btn.offsetWidth || 180;
      const bh = btn.offsetHeight || 45;
      const margin = 16;
      let cx = offsetX + imgWidth * 0.903 * (drawWidth / imgWidth);
      const cy = offsetY + imgHeight * 0.8385 * (drawHeight / imgHeight);
      cx = Math.min(Math.max(cx, margin + bw / 2), width - margin - bw / 2);
      btn.style.left = `${cx}px`;
      btn.style.top = `${cy}px`;
    }
  };

  // GSAP ScrollTrigger freeze/pin engine scrubbing through converted clips 5-7
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        id: 'philosophy-trigger',
        trigger: sectionRef.current,
        start: 'top top',
        end: isMobile ? '+=1200' : '+=2000',
        pin: containerRef.current,
        pinSpacing: true,
        scrub: 0.5,
        fastScrollEnd: true,
        preventOverlaps: 'philosophy-section',
        onUpdate: (self) => {
          const progress = self.progress;

          const frameIdx = Math.min(
            TOTAL_SHOWCASE_FRAMES - 1,
            Math.max(0, Math.floor(progress * TOTAL_SHOWCASE_FRAMES))
          );

          if (frameIdx !== lastFrameRef.current) {
            lastFrameRef.current = frameIdx;
            renderCanvasFrame(frameIdx);
          }

          const capIdx = Math.min(
            SHOWCASE_CAPTIONS.length - 1,
            Math.max(0, Math.floor(progress * SHOWCASE_CAPTIONS.length))
          );
          if (capIdx !== captionRef.current) {
            captionRef.current = capIdx;
            setActiveCaptionIndex(capIdx);
          }
        },
      });
    }, sectionRef);

    const handleResize = () => {
      const currentProgress = ScrollTrigger.getById('philosophy-trigger')?.progress || 0;
      const fIdx = Math.floor(currentProgress * TOTAL_SHOWCASE_FRAMES);
      lastFrameRef.current = -1;
      renderCanvasFrame(fIdx);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const activeCaption = SHOWCASE_CAPTIONS[activeCaptionIndex] || SHOWCASE_CAPTIONS[0];

  return (
    <section 
      id="philosophy" 
      ref={sectionRef} 
      className="relative z-20 w-full bg-[#070709] text-[#F4F4F6] border-t border-white/10 select-none"
    >
      {/* Pinned Viewport Stage Container */}
      <div 
        ref={containerRef}
        className="w-full h-screen overflow-hidden flex flex-col justify-between pt-24 pb-12 px-6 sm:px-12 md:px-20 relative bg-[#070709]"
      >
        {/* Converted Clips 5 & 6 Frame Sequence Canvas */}
        <canvas
          ref={canvasRef}
          className="frame-scrub-canvas absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-100"
        />

        {/* Dynamic Canvas Blending Scrim against Deep Obsidian Background (#070709) */}
        <div 
          className="absolute inset-0 z-[5] pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(7,7,9,0.35) 0%, rgba(7,7,9,0.05) 50%, rgba(7,7,9,0.40) 100%)'
          }}
        />

        {/* Pure Minimalist Philosophy Quote Overlay - Original Unboxed Style */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`caption-${activeCaptionIndex}`}
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 my-auto max-w-4xl mx-auto text-center space-y-6 px-4"
          >
            {/* Core Quote Headline */}
            <h2 
              className="font-display font-semibold text-[#F4F4F6] uppercase leading-tight max-w-3xl mx-auto drop-shadow-2xl"
              style={{
                fontSize: 'clamp(1.1rem, 4.5vw, 2.75rem)',
                letterSpacing: '0.05em'
              }}
            >
              {activeCaption.quote}
            </h2>

            {/* Author Subtext */}
            <p className="font-mono text-[10px] sm:text-xs text-[#8E909A] tracking-[0.25em] uppercase pt-2">
              {activeCaption.subtext}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Desktop Call Button — covers the frame watermark spot (bottom-right) */}
        <a
          href="tel:5125607284"
          ref={callBtnRef}
          style={{ left: '95%', top: '86%' }}
          className="hidden md:flex absolute -translate-x-1/2 -translate-y-1/2 z-30 items-center space-x-2 whitespace-nowrap bg-[#101114]/90 backdrop-blur-md border border-[#C5A059]/50 text-[#C5A059] hover:bg-[#C5A059] hover:text-[#070709] font-mono text-[10px] font-bold tracking-widest uppercase px-5 py-3 transition-colors duration-300 shadow-2xl active:scale-95 rounded-[2px]"
          id="philosophy-call-btn"
        >
          <Phone size={13} />
          <span>(512) 560-7284</span>
        </a>

      </div>
    </section>
  );
}
