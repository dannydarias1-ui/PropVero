import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const pulse = await query(`
      SELECT *
      FROM propvero_market_pulse_v1
      LIMIT 1
    `);

    const cities = await query(`
      SELECT *
      FROM propvero_top_markets_v1
      ORDER BY inventory_rank
      LIMIT 25
    `);

    return NextResponse.json({
      ok: true,
      generatedAt: new Date().toISOString(),

      summary: {
        topMarket: cities.rows?.[0]?.city ?? "N/A",
        totalActiveListings:
          pulse.rows?.[0]?.active_inventory ?? 0,
        marketsShown: cities.rows.length,
        santiagoActiveListings:
          cities.rows.find((r: any) => r.city === "Santiago")
            ?.active_inventory ?? 0,
      },

      citySummary: cities.rows,

      santiagoDashboard: [
        {
          property_type: "apartment",
          currency: "USD",
          yield_label: "Market Pulse",
          gross_yield_pct: 9.1,
          median_sale_price: 159000,
          median_monthly_rent: 1200,
          best_yield_pct: 9.1,
        },
      ],

      homepage: [],
    });
  } catch (error) {
    console.error("Dashboard API error:", error);

    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      { status: 500 }
    );
  }
}