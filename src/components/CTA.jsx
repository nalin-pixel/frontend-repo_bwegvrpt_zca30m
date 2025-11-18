export default function CTA() {
  return (
    <section id="cta" className="relative z-10 w-full py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-500/10 via-violet-500/10 to-blue-500/10 p-10 backdrop-blur">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-white">Ready to craft your next vision?</h3>
              <p className="mt-2 text-white/70">Spin up ideas fast and bring them to life with cinematic 3D and smooth UI.</p>
            </div>
            <div className="flex gap-3">
              <a href="#" className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:brightness-95">Start Free</a>
              <a href="#" className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 backdrop-blur transition hover:bg-white/10">View Showcase</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
