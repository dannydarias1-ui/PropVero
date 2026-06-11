const stats = [
  { label: "Listings Tracked", value: "132K+", detail: "Cleaned DR market records" },
  { label: "Santiago Yield", value: "14.4%", detail: "Apartment gross yield benchmark" },
  { label: "Strong Deal Signals", value: "24", detail: "Active residential opportunities" },
  { label: "Markets Covered", value: "6+", detail: "Expanding across the DR" },
];

const markets = [
  { city: "Santiago", yield: "14.4%", status: "Expansion", liquidity: "Strong" },
  { city: "Santo Domingo", yield: "7.2%", status: "Institutional", liquidity: "High" },
  { city: "Punta Cana", yield: "8.1%", status: "Growth", liquidity: "Medium" },
  { city: "Puerto Plata", yield: "7.1%", status: "Transitional", liquidity: "Medium" },
  { city: "Higüey", yield: "9.0%", status: "High Yield", liquidity: "Medium" },
  { city: "Jarabacoa", yield: "6.8%", status: "Expansion", liquidity: "Selective" },
];

const opportunities = [
  { city: "Santiago", property: "Apartment", score: "94", yield: "12.8%" },
  { city: "Santiago", property: "House", score: "91", yield: "11.2%" },
  { city: "Puerto Plata", property: "Villa", score: "89", yield: "10.1%" },
  { city: "Higüey", property: "Apartment", score: "88", yield: "9.4%" },
];

const features = [
  {
    title: "VeroScore™",
    text: "Proprietary deal scoring that ranks opportunities while protecting the full methodology.",
  },
  {
    title: "Market Intelligence",
    text: "Track price movement, liquidity, inventory pressure, and market momentum across cities.",
  },
  {
    title: "Yield Analytics",
    text: "Compare sale prices against rent benchmarks to evaluate potential investment returns.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-2xl font-bold tracking-tight">PropVero</p>
            <p className="text-xs uppercase tracking-[0.35em] text-yellow-400">
              Real Estate Intelligence
            </p>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a className="hover:text-yellow-400" href="#markets">Markets</a>
            <a className="hover:text-yellow-400" href="#deals">Deals</a>
            <a className="hover:text-yellow-400" href="#insights">Insights</a>
            <a className="hover:text-yellow-400" href="#pricing">Pricing</a>
            <button className="rounded-full bg-yellow-400 px-5 py-2 font-semibold text-slate-950 hover:bg-yellow-300">
              Get Started
            </button>
          </nav>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <div className="mb-6 inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm text-yellow-300">
            Dominican Republic market intelligence is coming online.
          </div>

          <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Truth-driven real estate intelligence for the Dominican Republic.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Discover hidden opportunities with VeroScore™, yield analytics, market
            indices, liquidity signals, and investor-grade insights.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button className="rounded-xl bg-yellow-400 px-8 py-4 font-bold text-slate-950 hover:bg-yellow-300">
              Explore Markets
            </button>
            <button className="rounded-xl border border-white/15 px-8 py-4 font-bold text-white hover:border-yellow-400">
              View Top Deals
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl">
          <div className="rounded-2xl bg-slate-900 p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Investor Dashboard</p>
                <h2 className="text-2xl font-bold">Santiago Market Pulse</h2>
              </div>
              <span className="rounded-full bg-yellow-400/10 px-3 py-1 text-sm text-yellow-300">
                Pilot
              </span>
            </div>

            <div className="space-y-4">
              {[
                ["Strong Deals", "24", "Active residential opportunities"],
                ["Good Deals", "92", "Priced favorably vs benchmarks"],
                ["Gross Yield", "14.4%", "Apartment benchmark"],
              ].map(([label, value, detail]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-slate-950 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold">{label}</p>
                      <p className="mt-1 text-sm text-slate-400">{detail}</p>
                    </div>
                    <p className="text-3xl font-bold text-yellow-400">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-5 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="mt-3 text-3xl font-bold text-yellow-400">{stat.value}</p>
              <p className="mt-2 text-sm text-slate-400">{stat.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="markets" className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">
            Market Coverage
          </p>
          <h2 className="mt-4 text-4xl font-bold">Built for DR investors first.</h2>
          <p className="mt-4 max-w-3xl text-slate-300">
            Start with Santiago and Santo Domingo, then expand into the full Dominican
            Republic with city-level benchmarks and deal discovery.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {markets.map((market) => (
              <div key={market.city} className="rounded-3xl border border-white/10 bg-slate-900 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">{market.city}</h3>
                  <span className="rounded-full bg-yellow-400/10 px-3 py-1 text-sm text-yellow-300">
                    {market.status}
                  </span>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-400">Yield</p>
                    <p className="mt-1 text-2xl font-bold text-yellow-400">{market.yield}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Liquidity</p>
                    <p className="mt-1 text-2xl font-bold">{market.liquidity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="deals" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">
              Top Opportunities
            </p>
            <h2 className="mt-4 text-4xl font-bold">Deal intelligence at a glance.</h2>
            <p className="mt-4 max-w-2xl text-slate-300">
              Preview how PropVero will rank opportunities by score, yield, and market context.
            </p>
          </div>
          <button className="rounded-xl border border-yellow-400/40 px-6 py-3 font-semibold text-yellow-300 hover:bg-yellow-400 hover:text-slate-950">
            Preview Pro
          </button>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
          <div className="grid grid-cols-4 bg-white/5 px-6 py-4 text-xs uppercase tracking-wider text-slate-400">
            <p>City</p>
            <p>Property</p>
            <p>VeroScore™</p>
            <p>Yield</p>
          </div>

          {opportunities.map((item) => (
            <div key={`${item.city}-${item.property}`} className="grid grid-cols-4 border-t border-white/10 px-6 py-5 text-sm">
              <p className="font-semibold">{item.city}</p>
              <p className="text-slate-300">{item.property}</p>
              <p className="font-bold text-yellow-400">{item.score}</p>
              <p>{item.yield}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="insights" className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">
            Why PropVero
          </p>
          <h2 className="mt-4 text-4xl font-bold">From listings to intelligence.</h2>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-3xl border border-white/10 bg-slate-900 p-8">
                <h3 className="text-2xl font-bold">{feature.title}</h3>
                <p className="mt-4 text-slate-400">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">
            Pricing
          </p>
          <h2 className="mt-4 text-4xl font-bold">Start free. Upgrade when ready.</h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8">
            <h3 className="text-2xl font-bold">Free</h3>
            <p className="mt-2 text-slate-400">For market exploration.</p>
            <p className="mt-8 text-4xl font-bold">$0</p>
            <ul className="mt-8 space-y-3 text-slate-300">
              <li>Limited market access</li>
              <li>Mid-tier deal signals</li>
              <li>Basic city analytics</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-yellow-400/40 bg-yellow-400/10 p-8">
            <h3 className="text-2xl font-bold">Pro</h3>
            <p className="mt-2 text-slate-300">For serious investors.</p>
            <p className="mt-8 text-4xl font-bold text-yellow-400">$9.99/mo</p>
            <ul className="mt-8 space-y-3 text-slate-200">
              <li>80–100 VeroScore™ visibility</li>
              <li>Full DR coverage</li>
              <li>Forecasts and watchlists</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-yellow-400/20 to-white/[0.03] p-10 text-center">
          <h2 className="text-4xl font-bold">Make smarter real estate decisions.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            PropVero is building the intelligence layer for Dominican Republic real estate.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-xl bg-yellow-400 px-8 py-4 font-bold text-slate-950 hover:bg-yellow-300">
              Get Started Free
            </button>
            <button className="rounded-xl border border-white/15 px-8 py-4 font-bold text-white hover:border-yellow-400">
              Join Pro
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row">
          <div>
            <p className="text-2xl font-bold">PropVero</p>
            <p className="mt-2 text-sm text-slate-400">
              Truth-driven real estate intelligence.
            </p>
          </div>

          <div className="flex gap-6 text-sm text-slate-400">
            <a className="hover:text-yellow-400" href="#markets">Markets</a>
            <a className="hover:text-yellow-400" href="#pricing">Pricing</a>
            <a className="hover:text-yellow-400" href="#insights">About</a>
            <a className="hover:text-yellow-400" href="#">Contact</a>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-7xl text-sm text-slate-600">
          © 2026 PropVero. All rights reserved.
        </p>
      </footer>
    </main>
  );
}