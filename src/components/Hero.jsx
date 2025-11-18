import { useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  const wrapperRef = useRef(null);

  // Smooth parallax tilt that makes the 3D hero "face" the cursor
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    let rafId = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / rect.width; // -0.5..0.5
      const y = (e.clientY - (rect.top + rect.height / 2)) / rect.height; // -0.5..0.5
      // Map to subtle rotation (in degrees)
      const maxTilt = 6; // feel free to tweak
      targetX = (-y) * maxTilt; // rotateX: invert so moving mouse up tilts scene up
      targetY = x * maxTilt; // rotateY
      if (prefersReduced) {
        currentX = targetX;
        currentY = targetY;
        el.style.transform = `perspective(1200px) rotateX(${currentX}deg) rotateY(${currentY}deg)`;
      }
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      if (prefersReduced) {
        currentX = 0;
        currentY = 0;
        el.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg)`;
      }
    };

    const animate = () => {
      const ease = 0.08; // spring-ish easing
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;
      el.style.transform = `perspective(1200px) rotateX(${currentX.toFixed(3)}deg) rotateY(${currentY.toFixed(3)}deg)`;
      rafId = requestAnimationFrame(animate);
    };

    if (!prefersReduced) rafId = requestAnimationFrame(animate);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section className="relative h-[86vh] w-full overflow-hidden">
      {/* 3D scene wrapper that tilts with cursor */}
      <div
        ref={wrapperRef}
        className="absolute inset-0 will-change-transform transition-transform duration-300"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Spline
          scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Gradient overlay to deepen contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />

      {/* Foreground content remains stable (not tilted) */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-fuchsia-400 animate-pulse"></span>
            Live demo • Interactive 3D hero
          </div>
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-white drop-shadow-[0_10px_35px_rgba(168,85,247,0.35)]">
            A futuristic website with stunning animations
          </h1>
          <p className="mt-4 text-white/70 text-base sm:text-lg">
            Explore a dark, cyberpunk aesthetic where an astronaut reaches through a 3D browser into iridescent space. Smooth motion, glassy UI, and neon accents make everything feel alive.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#features" className="pointer-events-auto rounded-xl bg-gradient-to-br from-fuchsia-500 to-blue-500 px-5 py-3 text-sm font-medium text-white shadow-[0_10px_35px_rgba(59,130,246,0.35)] transition hover:brightness-110">
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
