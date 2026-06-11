const deals = [
  { city: "Santiago", type: "Apartment", score: 94, yield: "12.8%", status: "Strong Deal" },
  { city: "Santiago", type: "House", score: 91, yield: "11.2%", status: "Strong Deal" },
  { city: "Puerto Plata", type: "Villa", score: 89, yield: "10.1%", status: "Good Deal" },
  { city: "Higüey", type: "Apartment", score: 88, yield: "9.4%", status: "Good Deal" },
];

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <a href="/" className="text-sm text-yellow-400 hover:text-yellow-300">
          ← Back to Home
        </a>

        <div className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-400">
              Investor Dashboard
            </p>
            <h1 className="mt-3 text-5xl font-bold">PropVero Market Intelligence</h1>
            <p className="mt-4 max-w-2xl text-slate-300">
              Track deal quality, market yield, liquidity, and opportunity signals across
              the Dominican Republic.
            </p>
          </div>

          <button className="rounded-xl bg-yellow-400 px-6 py-3 font-bold text-slate-950">
            Upgrade to Pro
          </button>
        </div>

        <section className="mt-10 grid gap-5 md:grid-cols-4">
          {[
            ["Listings", "132K+", "Cleaned records"],
            ["Strong Deals", "24", "Santiago pilot"],
            ["Avg Yield", "14.4%", "Apartment benchmark"],
            ["Markets", "6+", "DR coverage"],
          ].map(([label, value, detail]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <p className="text-sm text-slate-400">{label}</p>
              <p className="mt-3 text-3xl font-bold text-yellow-400">{value}</p>
              <p className="mt-2 text-sm text-slate-500">{detail}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
            <h2 className="text-2xl font-bold">Top Deal Signals</h2>

            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
              <div className="grid grid-cols-5 bg-white/5 px-4 py-3 text-xs uppercase tracking-wider text-slate-400">
                <p>City</p>
                <p>Type</p>
                <p>Score</p>
                <p>Yield</p>
                <p>Status</p>
              </div>

              {deals.map((deal) => (
                <div
                  key={`${deal.city}-${deal.type}`}
                  className="grid grid-cols-5 border-t border-white/10 px-4 py-4 text-sm"
                >
                  <p className="font-semibold">{deal.city}</p>
                  <p className="text-slate-300">{deal.type}</p>
                  <p className="font-bold text-yellow-400">{deal.score}</p>
                  <p>{deal.yield}</p>
                  <p className="text-green-300">{deal.status}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-yellow-400/30 bg-yellow-400/10 p-6">
            <p className="text-sm text-yellow-300">VeroScore™</p>
            <h2 className="mt-2 text-3xl font-bold">Premium Signal Layer</h2>
            <p className="mt-4 text-slate-300">
              Free users see limited mid-tier opportunities. Pro users unlock top
              80–100 VeroScore™ opportunities, deeper market context, and watchlists.
            </p>

            <div className="mt-8 space-y-4">
              {[
                ["80–100", "Pro-only top deal visibility"],
                ["60–79", "Free preview opportunities"],
                ["Forecasts", "Coming in future version"],
              ].map(([label, detail]) => (
                <div key={label} className="rounded-2xl bg-slate-950/80 p-5">
                  <p className="text-2xl font-bold text-yellow-400">{label}</p>
                  <p className="mt-1 text-sm text-slate-400">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          {[
            ["Santiago", "Expansion", "Strong yield and deal activity"],
            ["Santo Domingo", "Institutional", "High liquidity and deeper market"],
            ["Puerto Plata", "Transitional", "Tourism-driven opportunity pockets"],
          ].map(([city, status, detail]) => (
            <div key={city} className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              <p className="text-2xl font-bold">{city}</p>
              <p className="mt-3 text-yellow-400">{status}</p>
              <p className="mt-3 text-sm text-slate-400">{detail}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}