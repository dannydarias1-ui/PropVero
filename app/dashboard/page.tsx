const deals = [
  { city: "Santiago", type: "Apartment", score: 94, yield: "12.8%", status: "Strong Deal" },
  { city: "Santiago", type: "House", score: 91, yield: "11.2%", status: "Strong Deal" },
  { city: "Puerto Plata", type: "Villa", score: 89, yield: "10.1%", status: "Good Deal" },
  { city: "Higüey", type: "Apartment", score: 88, yield: "9.4%", status: "Good Deal" },
];

const yields = [
  { city: "Santiago", value: 14.4 },
  { city: "Higüey", value: 9.0 },
  { city: "Punta Cana", value: 8.1 },
  { city: "Santo Domingo", value: 7.2 },
  { city: "Puerto Plata", value: 7.1 },
];

const scoreBands = [
  { band: "90–100", label: "Elite", count: 24, width: "90%" },
  { band: "80–89", label: "Strong", count: 68, width: "72%" },
  { band: "70–79", label: "Good", count: 142, width: "55%" },
  { band: "60–69", label: "Watch", count: 210, width: "42%" },
];

const markets = [
  {
    city: "Santiago",
    status: "Expansion",
    signal: "Strong yield and deal activity",
    color: "bg-green-400",
  },
  {
    city: "Santo Domingo",
    status: "Institutional",
    signal: "High liquidity and deeper market",
    color: "bg-blue-400",
  },
  {
    city: "Puerto Plata",
    status: "Transitional",
    signal: "Tourism-driven opportunity pockets",
    color: "bg-yellow-400",
  },
];

const marketIndex = [
  { month: "Jan", value: 42, x: 0, y: 190 },
  { month: "Feb", value: 55, x: 100, y: 155 },
  { month: "Mar", value: 48, x: 200, y: 172 },
  { month: "Apr", value: 62, x: 300, y: 130 },
  { month: "May", value: 58, x: 400, y: 142 },
  { month: "Jun", value: 74, x: 500, y: 92 },
  { month: "Jul", value: 69, x: 600, y: 105 },
  { month: "Aug", value: 82, x: 700, y: 68 },
  { month: "Sep", value: 78, x: 800, y: 78 },
  { month: "Oct", value: 88, x: 900, y: 42 },
  { month: "Nov", value: 84, x: 1000, y: 52 },
  { month: "Dec", value: 93, x: 1100, y: 20 },
];

const marketIndexPoints = marketIndex
  .map((item) => `${item.x},${item.y}`)
  .join(" ");

const labeledMonths = ["Jan", "Jun", "Dec"];

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
            <h1 className="mt-3 text-5xl font-bold">
              PropVero Market Intelligence
            </h1>
            <p className="mt-4 max-w-2xl text-slate-300">
              Track deal quality, market yield, liquidity, and opportunity signals
              across the Dominican Republic.
            </p>
          </div>

          <button className="rounded-xl bg-yellow-400 px-6 py-3 font-bold text-slate-950 hover:bg-yellow-300">
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
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-slate-900 p-6"
            >
              <p className="text-sm text-slate-400">{label}</p>
              <p className="mt-3 text-3xl font-bold text-yellow-400">{value}</p>
              <p className="mt-2 text-sm text-slate-500">{detail}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Market Index</p>
                <h2 className="text-2xl font-bold">DR Opportunity Index</h2>
              </div>
              <span className="rounded-full bg-green-400/10 px-3 py-1 text-sm text-green-300">
                +8.7%
              </span>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950 p-5">
              <div className="relative h-60">
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[0, 1, 2, 3].map((line) => (
                    <div key={line} className="border-t border-white/10" />
                  ))}
                </div>

                <svg viewBox="-30 0 1160 285" className="relative h-full w-full">
                  <polyline
                    fill="none"
                    stroke="#facc15"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={marketIndexPoints}
                  />

                  {marketIndex.map((item) => (
                    <g key={item.month}>
                      {labeledMonths.includes(item.month) && (
                        <text
                          x={item.x}
                          y={item.y - 18}
                          textAnchor="middle"
                          fill="#facc15"
                          fontSize="22"
                          fontWeight="700"
                        >
                          {item.value}
                        </text>
                      )}

                      <circle
                        cx={item.x}
                        cy={item.y}
                        r="8"
                        fill="#facc15"
                        stroke="#020617"
                        strokeWidth="4"
                      />
                    </g>
                  ))}
                </svg>
              </div>

              <div className="mt-3 grid grid-cols-12 gap-2 text-center text-[10px] text-slate-500">
                {marketIndex.map((item) => (
                  <span key={item.month}>{item.month.slice(0, 1)}</span>
                ))}
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-400">
              Simulated monthly index movement. This will later connect to the
              PropVero Market Index engine.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Yield Comparison</p>
            <h2 className="text-2xl font-bold">Gross Yield by Market</h2>

            <div className="mt-8 space-y-5">
              {yields.map((item) => (
                <div key={item.city}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>{item.city}</span>
                    <span className="text-yellow-400">{item.value}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-800">
                    <div
                      className="h-3 rounded-full bg-yellow-400"
                      style={{ width: `${(item.value / 15) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
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
            <h2 className="mt-2 text-3xl font-bold">Score Distribution</h2>
            <p className="mt-4 text-slate-300">
              Preview how opportunities are grouped into score bands for Free and
              Pro users.
            </p>

            <div className="mt-8 space-y-5">
              {scoreBands.map((band) => (
                <div key={band.band}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>
                      {band.band} · {band.label}
                    </span>
                    <span className="text-yellow-300">{band.count}</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-950">
                    <div
                      className="h-3 rounded-full bg-yellow-400"
                      style={{ width: band.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          {markets.map((market) => (
            <div
              key={market.city}
              className="rounded-3xl border border-white/10 bg-slate-900 p-6"
            >
              <div className="flex items-center gap-3">
                <span className={`h-3 w-3 rounded-full ${market.color}`} />
                <p className="text-2xl font-bold">{market.city}</p>
              </div>
              <p className="mt-4 text-yellow-400">{market.status}</p>
              <p className="mt-3 text-sm text-slate-400">{market.signal}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}