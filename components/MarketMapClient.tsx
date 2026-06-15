"use client";

import "leaflet/dist/leaflet.css";

import { useEffect, useMemo, useState } from "react";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";

function getFillColor(feature: any) {
  const yieldPct = Number(feature?.properties?.best_yield_pct || 0);
  const regime = feature?.properties?.market_regime;

  if (yieldPct >= 8) return "#22c55e";
  if (yieldPct >= 5) return "#f59e0b";
  if (regime === "stable") return "#38bdf8";
  return "#ef4444";
}

export default function MarketMapClient() {
  const [data, setData] = useState<any>(null);
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    fetch("/api/market-map")
      .then((r) => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const topMarkets = useMemo(() => {
    return [...(data?.features ?? [])]
      .sort(
        (a: any, b: any) =>
          Number(b.properties?.active_listings || 0) -
          Number(a.properties?.active_listings || 0)
      )
      .slice(0, 8);
  }, [data]);

  if (!data) {
    return (
      <div className="h-[650px] flex items-center justify-center rounded-xl bg-slate-900/50">
        Loading market intelligence map...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
      <div className="relative overflow-hidden rounded-xl border border-white/10">
        <div className="absolute left-4 top-4 z-[1000] rounded-xl border border-white/10 bg-slate-950/90 p-4 shadow-xl backdrop-blur">
          <p className="text-sm font-bold text-white mb-3">Market Legend</p>

          <LegendItem color="#22c55e" label="High Yield ≥ 8%" />
          <LegendItem color="#f59e0b" label="Fair Yield 5–8%" />
          <LegendItem color="#38bdf8" label="Stable Market" />
          <LegendItem color="#ef4444" label="Low / Transitional" />
        </div>

        <MapContainer
          center={[18.8, -70.2]}
          zoom={8}
          scrollWheelZoom={true}
          style={{ height: "650px", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <GeoJSON
            data={data}
            style={(feature: any) => ({
              color: "#ffffff",
              weight: 1,
              opacity: 0.7,
              fillOpacity: 0.45,
              fillColor: getFillColor(feature),
            })}
            onEachFeature={(feature: any, layer: any) => {
              const p = feature.properties;

              layer.on({
                click: () => {
                  setSelected(p);
                },
                mouseover: (event: any) => {
                  event.target.setStyle({
                    weight: 3,
                    color: "#fbbf24",
                    fillOpacity: 0.7,
                  });
                },
                mouseout: (event: any) => {
                  event.target.setStyle({
                    weight: 1,
                    color: "#ffffff",
                    fillOpacity: 0.45,
                    fillColor: getFillColor(feature),
                  });
                },
              });

              layer.bindPopup(`
                <div style="min-width: 240px; font-family: Arial, sans-serif;">
                  <h3 style="font-size: 17px; font-weight: 700; margin-bottom: 8px;">
                    ${p.city}
                  </h3>

                  <div><b>Active listings:</b> ${p.active_listings ?? "N/A"}</div>

                  <div><b>Best yield:</b> ${
                    p.best_yield_pct
                      ? Number(p.best_yield_pct).toFixed(2) + "%"
                      : "N/A"
                  }</div>

                  <div><b>Regime:</b> ${p.market_regime ?? "N/A"}</div>

                  <div><b>Quality:</b> ${p.market_quality_label ?? "N/A"}</div>

                  <div><b>Confidence:</b> ${p.confidence_level ?? "N/A"}</div>
                </div>
              `);
            }}
          />
        </MapContainer>
      </div>

      <aside className="rounded-xl border border-white/10 bg-slate-950/80 p-5">
        <h3 className="text-xl font-bold">Market Focus</h3>
        <p className="text-sm text-slate-400 mt-1">
          Click any municipality on the map.
        </p>

        <div className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/10 p-4">
          <p className="text-sm text-amber-300">Selected Market</p>
          <p className="text-2xl font-black mt-1">
            {selected?.city ?? "None selected"}
          </p>

          {selected && (
            <div className="mt-4 space-y-2 text-sm">
              <SideStat label="Active listings" value={selected.active_listings} />
              <SideStat
                label="Best yield"
                value={
                  selected.best_yield_pct
                    ? `${Number(selected.best_yield_pct).toFixed(2)}%`
                    : "N/A"
                }
              />
              <SideStat label="Regime" value={selected.market_regime ?? "N/A"} />
              <SideStat
                label="Quality"
                value={selected.market_quality_label ?? "N/A"}
              />
              <SideStat
                label="Confidence"
                value={selected.confidence_level ?? "N/A"}
              />
            </div>
          )}
        </div>

        <div className="mt-6">
          <h4 className="font-semibold mb-3">Top Active Markets</h4>

          <div className="space-y-2">
            {topMarkets.map((feature: any, index: number) => {
              const p = feature.properties;

              return (
                <button
                  key={p.city}
                  onClick={() => setSelected(p)}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] p-3 text-left hover:border-amber-400/40 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">
                      {index + 1}. {p.city}
                    </span>
                    <span className="text-amber-300 text-sm">
                      {p.active_listings}
                    </span>
                  </div>

                  <div className="text-xs text-slate-400 mt-1">
                    Yield:{" "}
                    {p.best_yield_pct
                      ? `${Number(p.best_yield_pct).toFixed(2)}%`
                      : "N/A"}{" "}
                    · {p.market_regime ?? "N/A"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-300 mb-2">
      <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: color }} />
      <span>{label}</span>
    </div>
  );
}

function SideStat({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-2">
      <span className="text-slate-400">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}