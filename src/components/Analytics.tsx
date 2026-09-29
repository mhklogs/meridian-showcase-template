import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface OdometerProps {
  value: number;
  suffix?: string;
}

function Odometer({ value, suffix = '' }: OdometerProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const updateValue = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad
      const easeProgress = progress * (2 - progress);
      const current = Math.floor(easeProgress * value);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(updateValue);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-display font-black text-6xl sm:text-7xl xl:text-8xl tracking-tighter uppercase leading-none transition-colors duration-500">
      {displayValue}
      {suffix}
    </span>
  );
}

export default function Analytics() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const columns = [
    {
      number: <Odometer value={50} suffix="+" />,
      label: 'YEARS OF INDUSTRY INFLUENCE',
      desc: 'Bespoke client representation in Colorado, operating continuously across market cycles since 1975 under Alex Morgan.',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    },
    {
      number: <Odometer value={100} suffix="%" />,
      label: 'STATEWIDE COLORADO SERVICE',
      desc: 'Comprehensive transactional capacity spanning Denver, hill country, DFW, Phoenix, Denver, and smaller luxury enclaves.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    },
    {
      number: (
        <span className="font-display font-black text-6xl sm:text-7xl xl:text-8xl tracking-tighter uppercase leading-none">
          24/7
        </span>
      ),
      label: 'ELITE CLIENT ACCESSIBILITY',
      desc: 'Round-the-clock advisory, immediate transaction security, and priority advocacy dedicated strictly to your wealth preservation.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section className="bg-[#08080A] text-[#F4F4F6] border-y border-white/10 relative z-10 w-full overflow-hidden md:pl-28">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row min-h-[450px] md:h-[500px] divide-y md:divide-y-0 md:divide-x divide-white/10">
        
        {columns.map((col, index) => {
          const isHovered = hoveredIdx === index;
          return (
            <div
              key={index}
              onMouseEnter={() => setHoveredIdx(index)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="relative flex-1 p-8 sm:p-12 group flex flex-col justify-between overflow-hidden cursor-default transition-all duration-700 ease-out"
              style={{
                flexGrow: isHovered ? 1.5 : 1,
              }}
            >
              {/* Lifestyle Image Background reveal on hover */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out z-0 scale-105"
                style={{
                  backgroundImage: `url(${col.image})`,
                  opacity: isHovered ? 0.95 : 0,
                  transform: isHovered ? 'scale(1)' : 'scale(1.08)',
                }}
              />

              {/* Parallax mask gradient overlay on hover */}
              <div 
                className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/90 transition-opacity duration-700 z-10 pointer-events-none"
                style={{ opacity: isHovered ? 1 : 0 }}
              />

              {/* Standard dark background reveal when NOT hovered */}
              <div 
                className="absolute inset-0 bg-[#101114] transition-opacity duration-700 z-0"
                style={{ opacity: isHovered ? 0 : 1 }}
              />

              {/* Content Panel */}
              <div className="relative z-20 space-y-8 flex flex-col justify-between h-full">
                {/* Number/Odometer container */}
                <div 
                  className={`my-4 transition-colors duration-500 ${
                    isHovered ? 'text-[#C5A059]' : 'text-[#F4F4F6]'
                  }`}
                >
                  {col.number}
                </div>

                {/* Subheadings and descriptive text blocks */}
                <div className="space-y-4">
                  <h4 
                    className={`font-display font-semibold text-sm tracking-wide uppercase transition-colors duration-500 ${
                      isHovered ? 'text-[#C5A059]' : 'text-[#F4F4F6]'
                    }`}
                  >
                    {col.label}
                  </h4>
                  <p 
                    className={`font-sans text-xs font-light leading-relaxed transition-colors duration-500 ${
                      isHovered ? 'text-[#F4F4F6]/90' : 'text-[#8E909A]'
                    }`}
                  >
                    {col.desc}
                  </p>
                </div>
              </div>

              {/* Gold bottom accent line */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#C5A059] transition-transform duration-700 origin-left z-30"
                style={{
                  transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
                }}
              />

            </div>
          );
        })}

      </div>
    </section>
  );
}
