"use client";

import { useEffect, useMemo, useState } from "react";
import MarketMap from "@/components/MarketMap";

type ApiData = {
  ok: boolean;
  generatedAt: string;
  summary: any;
  citySummary: any[];
  santiagoDashboard: any[];
  homepage: any[];
};

const money = (value: any) =>
  value ? Number(value).toLocaleString("en-US") : "N/A";

const pct = (value: any) =>
  value !== null && value !== undefined ? `${Number(value).toFixed(2)}%` : "N/A";

export default function DashboardPage() {
  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/dashboard", {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((r) => r.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Dashboard fetch error:", error);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const topCities = useMemo(() => data?.citySummary ?? [], [data]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#070B14] text-white p-8">
        <p className="text-slate-400">Loading PropVero intelligence...</p>
      </main>
    );
  }

  if (!data?.ok) {
    return (
      <main className="min-h-screen bg-[#070B14] text-white p-8">
        <p>Unable to load dashboard.</p>
      </main>
    );
  }

  const top = topCities[0];

  return (
    <main className="min-h-screen bg-[#070B14] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.22),transparent_35%),radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_30%)]" />

        <div className="relative px-8 py-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs text-amber-300 mb-4">
                LIVE DR MARKET INTELLIGENCE
              </div>

              <h1 className="text-5xl font-black tracking-tight">
                PropVero Dashboard
              </h1>

              <p className="text-slate-400 mt-3 max-w-2xl">
                Truth-driven real estate analytics for the Dominican Republic —
                active inventory, yield signals, market quality, and city-level opportunity.
              </p>
            </div>

            <div className="text-sm text-slate-400">
              Updated:{" "}
              <span className="text-slate-200">
                {new Date(data.generatedAt).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10">
            <MetricCard
              label="Top Market"
              value={data.summary.topMarket}
              sub={`${top?.active_listings ?? "—"} active listings`}
            />
            <MetricCard
              label="Top 10 Active Listings"
              value={money(data.summary.totalActiveListings)}
              sub="Across leading DR markets"
            />
            <MetricCard
              label="Markets Tracked"
              value={data.summary.marketsShown}
              sub="Top markets shown"
            />
            <MetricCard
              label="Santiago Active"
              value={money(data.summary.santiagoActiveListings)}
              sub="Pilot market depth"
            />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 py-8">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl">
          <div className="mb-5">
            <h2 className="text-2xl font-bold">DR Market Intelligence Map</h2>
            <p className="text-slate-400 text-sm">
              Municipality-level real estate signals powered by PropVero GIS.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-2">
  <MarketMap />
</div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 pb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold">Market Leaderboard</h2>
              <p className="text-slate-400 text-sm">
                Active inventory and opportunity signals by city
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {topCities.map((row, idx) => (
              <div
                key={`${row.city}-${idx}`}
                className="rounded-xl bg-slate-900/70 border border-white/10 p-4 hover:border-amber-400/40 transition"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-amber-400/10 text-amber-300 flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg">{row.city}</h3>
                      <p className="text-sm text-slate-400">
                        {row.market_regime ?? "No regime"} ·{" "}
                        {row.confidence_level ?? "No"} confidence
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-xl">
                      {money(row.active_listings)}
                    </p>
                    <p className="text-xs text-slate-400">active listings</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                  <MiniStat label="Best Yield" value={pct(row.best_yield_pct)} />
                  <MiniStat label="Segments" value={row.investment_segments} />
                  <MiniStat label="Quality" value={row.market_quality_label ?? "N/A"} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-6 shadow-2xl">
          <h2 className="text-2xl font-bold mb-2">Santiago Signal</h2>
          <p className="text-slate-400 text-sm mb-6">
            Pilot market investment snapshot
          </p>

          <div className="rounded-xl bg-amber-400/10 border border-amber-400/20 p-5 mb-5">
            <p className="text-sm text-amber-300">Best Segment Yield</p>
            <p className="text-5xl font-black mt-2">
              {pct(data.santiagoDashboard?.[0]?.best_yield_pct)}
            </p>
            <p className="text-slate-400 text-sm mt-2">
              Santiago active listings: {money(data.summary.santiagoActiveListings)}
            </p>
          </div>

          <div className="space-y-3">
            {data.santiagoDashboard.map((row, index) => (
              <div
                key={`${row.property_type}-${row.currency}-${index}`}
                className="rounded-xl bg-white/[0.04] border border-white/10 p-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold capitalize">
                      {row.property_type} · {row.currency}
                    </h3>
                    <p className="text-sm text-slate-400">{row.yield_label}</p>
                  </div>
                  <span className="text-amber-300 font-bold">
                    {pct(row.gross_yield_pct)}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <MiniStat label="Median Sale" value={money(row.median_sale_price)} />
                  <MiniStat label="Median Rent" value={money(row.median_monthly_rent)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function MetricCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-xl">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="text-3xl font-black mt-2">{value}</p>
      <p className="text-xs text-slate-500 mt-2">{sub}</p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: any }) {
  return (
    <div className="rounded-lg bg-black/20 p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="font-semibold mt-1">{value ?? "N/A"}</p>
    </div>
  );
}