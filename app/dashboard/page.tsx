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

type MarketPulseData = {
  ok: boolean;
  marketPulse: any;
  topMarkets: any[];
  buyerMarkets: any[];
  sellerMarkets: any[];
  fastestMarkets: any[];
};

const money = (value: any) =>
  value !== null && value !== undefined
    ? Number(value).toLocaleString("en-US")
    : "N/A";

const pct = (value: any) =>
  value !== null && value !== undefined ? `${Number(value).toFixed(2)}%` : "N/A";

const num = (value: any) =>
  value !== null && value !== undefined
    ? Number(value).toLocaleString("en-US")
    : "N/A";

export default function DashboardPage() {
  const [data, setData] = useState<ApiData | null>(null);
  const [pulse, setPulse] = useState<MarketPulseData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    Promise.all([
      fetch("/api/dashboard", {
        signal: controller.signal,
        cache: "no-store",
      }).then(async (r) => {
        if (!r.ok) return null;
        return r.json();
      }),

      fetch("/api/market-pulse", {
        signal: controller.signal,
        cache: "no-store",
      }).then((r) => r.json()),
    ])
      .then(([dashboardJson, pulseJson]) => {
        setData(dashboardJson);
        setPulse(pulseJson);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Dashboard fetch error:", error);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const topCities = useMemo(() => data?.citySummary ?? [], [data]);
  const marketPulse = pulse?.marketPulse;
  const topMarkets = pulse?.topMarkets ?? [];
  const buyerMarkets = pulse?.buyerMarkets ?? [];
  const fastestMarkets = pulse?.fastestMarkets ?? [];
  const fallbackTopMarket = topMarkets?.[0];

  if (loading) {
    return (
      <main className="min-h-screen bg-[#070B14] text-white p-8">
        <p className="text-slate-400">Loading PropVero intelligence...</p>
      </main>
    );
  }

  if (!pulse?.ok && !data?.ok) {
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
                active inventory, yield signals, market quality, pricing pressure,
                and city-level opportunity.
              </p>
            </div>

            <div className="text-sm text-slate-400">
              Updated:{" "}
              <span className="text-slate-200">
                {new Date(
                  data?.generatedAt ??
                    marketPulse?.latest_scraped_at ??
                    Date.now()
                ).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10">
            <MetricCard
              label="Top Market"
              value={
                data?.summary?.topMarket ?? fallbackTopMarket?.city ?? "N/A"
              }
              sub={`${
                top?.active_listings ??
                fallbackTopMarket?.active_inventory ??
                "—"
              } active listings`}
            />
            <MetricCard
              label="Active Inventory"
              value={num(marketPulse?.active_inventory)}
              sub="PropVero Market Pulse"
            />
            <MetricCard
              label="Markets Tracked"
              value={data?.summary?.marketsShown ?? topMarkets.length ?? "N/A"}
              sub="Top markets shown"
            />
            <MetricCard
              label="Price Pressure"
              value={pct(marketPulse?.price_pressure_index)}
              sub="Seller concession signal"
            />
          </div>
        </div>
      </section>

      {pulse?.ok && marketPulse && (
        <section className="max-w-7xl mx-auto px-8 py-8">
          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-6 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">PropVero Market Pulse</h2>
                <p className="text-slate-400 text-sm">
                  National market behavior signals from the latest PropVero run.
                </p>
              </div>

              <div className="text-sm text-slate-400">
                Latest scan:{" "}
                <span className="text-slate-200">
                  {new Date(marketPulse.latest_scraped_at).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <MetricCard
                label="Active Inventory"
                value={num(marketPulse.active_inventory)}
                sub="Operational active listings"
              />
              <MetricCard
                label="New Listings"
                value={num(marketPulse.new_listings_latest_run)}
                sub="Latest run only"
              />
              <MetricCard
                label="7-Day Avg New"
                value={num(marketPulse.avg_new_listings_7d)}
                sub="New listings per day"
              />
              <MetricCard
                label="Sold Signals"
                value={num(marketPulse.sold_signals)}
                sub="Demand proxy"
              />
              <MetricCard
                label="Survival Rate"
                value={pct(marketPulse.inventory_survival_rate)}
                sub="Active under 21-day rule"
              />
              <MetricCard
                label="Price Pressure"
                value={pct(marketPulse.price_pressure_index)}
                sub="Seller concession signal"
              />
            </div>
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-8 pb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MarketList
          title="Top Buyer Opportunity Markets"
          subtitle="Markets with stronger seller concessions and reliable price-change data."
          rows={buyerMarkets.slice(0, 8)}
          rankKey="buyer_leverage_rank"
          valueLabel="Pressure"
          valueKey="price_pressure_index"
          valueFormatter={pct}
        />

        <MarketList
          title="Fastest Moving Markets"
          subtitle="Markets with the lowest average days observed among active listings."
          rows={fastestMarkets.slice(0, 8)}
          rankKey="speed_rank"
          valueLabel="Avg DOM"
          valueKey="avg_days_on_market"
          valueFormatter={(v) =>
            v !== null && v !== undefined ? `${Number(v).toFixed(1)} days` : "N/A"
          }
        />
      </section>

      <section className="max-w-7xl mx-auto px-8 pb-8">
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

      {topCities.length > 0 && (
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
                    <MiniStat
                      label="Quality"
                      value={row.market_quality_label ?? "N/A"}
                    />
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
                {pct(data?.santiagoDashboard?.[0]?.best_yield_pct)}
              </p>
              <p className="text-slate-400 text-sm mt-2">
                Santiago active listings:{" "}
                {money(data?.summary?.santiagoActiveListings)}
              </p>
            </div>

            <div className="space-y-3">
              {(data?.santiagoDashboard ?? []).map((row, index) => (
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
                    <MiniStat
                      label="Median Sale"
                      value={money(row.median_sale_price)}
                    />
                    <MiniStat
                      label="Median Rent"
                      value={money(row.median_monthly_rent)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
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

function MarketList({
  title,
  subtitle,
  rows,
  rankKey,
  valueLabel,
  valueKey,
  valueFormatter,
}: {
  title: string;
  subtitle: string;
  rows: any[];
  rankKey: string;
  valueLabel: string;
  valueKey: string;
  valueFormatter: (value: any) => string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl">
      <div className="mb-5">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-slate-400 text-sm">{subtitle}</p>
      </div>

      <div className="space-y-3">
        {rows.map((row, idx) => (
          <div
            key={`${title}-${row.city}-${idx}`}
            className="rounded-xl bg-slate-900/70 border border-white/10 p-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-9 w-9 rounded-full bg-amber-400/10 text-amber-300 flex items-center justify-center font-bold">
                  {row[rankKey] ?? idx + 1}
                </div>

                <div>
                  <h3 className="font-semibold">{row.city}</h3>
                  <p className="text-xs text-slate-400">{row.investor_read}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold">{valueFormatter(row[valueKey])}</p>
                <p className="text-xs text-slate-400">{valueLabel}</p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
              <MiniStat label="Inventory" value={num(row.active_inventory)} />
              <MiniStat label="Sold Signals" value={num(row.sold_signals)} />
              <MiniStat label="Status" value={row.market_status ?? "N/A"} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}