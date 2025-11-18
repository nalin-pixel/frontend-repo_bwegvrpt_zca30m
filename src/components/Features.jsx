import { Cpu, Sparkles, GalleryHorizontal, Shield } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Immersive 3D Hero",
    desc: "Interactive Spline animation with neon gradients and cinematic depth.",
  },
  {
    icon: Cpu,
    title: "Blazing Performance",
    desc: "Optimized, responsive layout powered by Vite, React, and Tailwind CSS.",
  },
  {
    icon: GalleryHorizontal,
    title: "Fluid Motion",
    desc: "Micro-interactions and soft glows that enhance usability and delight.",
  },
  {
    icon: Shield,
    title: "Accessible by Design",
    desc: "Thoughtful contrast, keyboard-friendly controls, and clear hierarchy.",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative z-10 w-full py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white">Why it's special</h2>
          <p className="mt-3 text-white/70 max-w-2xl">A surreal, cybernetic aesthetic with practical polish: modular components, clean typography, and smooth animations that feel effortless.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur shadow-[0_10px_40px_rgba(59,130,246,0.15)]">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-blue-500 text-white">
                <Icon size={18} />
              </div>
              <h3 className="text-white font-medium">{title}</h3>
              <p className="mt-2 text-white/70 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
