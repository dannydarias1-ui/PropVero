"use client";

import dynamic from "next/dynamic";

const MarketMapClient = dynamic(() => import("./MarketMapClient"), {
  ssr: false,
  loading: () => (
    <div className="h-[650px] flex items-center justify-center rounded-xl bg-slate-900/50">
      Loading market intelligence map...
    </div>
  ),
});

export default function MarketMap() {
  return <MarketMapClient />;
}