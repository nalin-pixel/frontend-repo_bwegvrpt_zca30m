import { useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const trianglesRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    if (!section || !wrapper) return;

    let rafId = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handlePointerMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2); // -1..1
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2); // -1..1
      const maxTilt = prefersReduced ? 6 : 12;
      targetX = -y * maxTilt; // rotateX
      targetY = x * maxTilt; // rotateY
    };

    const handlePointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = () => {
      const ease = prefersReduced ? 0.12 : 0.08;
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;
      wrapper.style.transform = `perspective(1200px) rotateX(${currentX.toFixed(3)}deg) rotateY(${currentY.toFixed(3)}deg)`;

      // Subtle parallax on decorative triangles
      const px = currentY / 12; // invert axes for some depth fun
      const py = currentX / 12;
      trianglesRef.current.forEach((el, i) => {
        if (!el) return;
        const depth = (i + 1) * 6; // different layers
        el.style.transform = `translate3d(${px * depth}px, ${py * depth}px, 0) rotate(${(i % 2 ? 12 : -8) + px * 2}deg)`;
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    section.addEventListener('pointermove', handlePointerMove);
    section.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      cancelAnimationFrame(rafId);
      section.removeEventListener('pointermove', handlePointerMove);
      section.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[86vh] w-full overflow-hidden">
      {/* 3D scene wrapper that tilts with cursor */}
      <div
        ref={wrapperRef}
        className="absolute inset-0 will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Spline
          scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Red neon gradient overlay for stronger contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />

      {/* Decorative red neon triangles */}
      <svg
        ref={(el) => (trianglesRef.current[0] = el)}
        className="pointer-events-none absolute -left-10 top-16 h-28 w-28 opacity-70 blur-[0.3px]"
        viewBox="0 0 100 100"
        fill="none"
      >
        <defs>
          <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#fb7185" />
          </linearGradient>
        </defs>
        <polygon points="50,5 95,95 5,95" fill="url(#grad1)" opacity="0.25" />
        <polygon points="50,12 88,88 12,88" stroke="#ef4444" strokeWidth="1.2" opacity="0.6" />
      </svg>

      <svg
        ref={(el) => (trianglesRef.current[1] = el)}
        className="pointer-events-none absolute right-10 bottom-24 h-24 w-24 opacity-70"
        viewBox="0 0 100 100"
        fill="none"
      >
        <polygon points="50,8 92,92 8,92" fill="#ef4444" opacity="0.18" />
        <polygon points="50,15 85,85 15,85" stroke="#f87171" strokeWidth="1" opacity="0.6" />
      </svg>

      <svg
        ref={(el) => (trianglesRef.current[2] = el)}
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-6 h-16 w-16 opacity-80"
        viewBox="0 0 100 100"
        fill="none"
      >
        <polygon points="50,10 90,90 10,90" fill="#fca5a5" opacity="0.15" />
        <polygon points="50,18 82,82 18,82" stroke="#ef4444" strokeWidth="1.2" opacity="0.7" />
      </svg>

      {/* Foreground content remains stable (not tilted) */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse"></span>
            Live demo • Interactive 3D hero
          </div>
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-white drop-shadow-[0_10px_35px_rgba(239,68,68,0.35)]">
            A futuristic website with stunning animations
          </h1>
          <p className="mt-4 text-white/70 text-base sm:text-lg">
            Explore a dark, cyberpunk aesthetic where an astronaut reaches through a 3D browser into iridescent space. Smooth motion, glassy UI, and neon accents make everything feel alive.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#features" className="pointer-events-auto rounded-xl bg-gradient-to-br from-red-500 to-rose-500 px-5 py-3 text-sm font-medium text-white shadow-[0_10px_35px_rgba(239,68,68,0.35)] transition hover:brightness-110">
              Explore Features
            </a>
            <a href="#cta" className="pointer-events-auto rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 backdrop-blur transition hover:bg-white/10">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
