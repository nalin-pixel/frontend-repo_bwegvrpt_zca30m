import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import CTA from './components/CTA';

function App() {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      {/* Soft starfield and grid accents with red hue */}
      <div className="pointer-events-none fixed inset-0 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_top_left,rgba(239,68,68,0.28),transparent),radial-gradient(800px_400px_at_bottom_right,rgba(244,63,94,0.22),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <Navbar />
      <Hero />
      <Features />
      <CTA />

      <footer className="relative z-10 border-t border-white/10 py-8">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/60 text-sm">
          <p>© {new Date().getFullYear()} Nebula Labs. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a className="hover:text-white" href="#features">Features</a>
            <a className="hover:text-white" href="#cta">Get Started</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
