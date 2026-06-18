import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const marketPulseResult = await query(`
      SELECT *
      FROM propvero_market_pulse_v1
      LIMIT 1
    `);

    const topMarketsResult = await query(`
      SELECT *
      FROM propvero_top_markets_v1
      ORDER BY inventory_rank
      LIMIT 25
    `);

    const buyerMarketsResult = await query(`
      SELECT *
      FROM propvero_top_markets_v1
      WHERE buyer_leverage_rank IS NOT NULL
      ORDER BY buyer_leverage_rank
      LIMIT 10
    `);

    const sellerMarketsResult = await query(`
      SELECT *
      FROM propvero_top_markets_v1
      WHERE seller_strength_rank IS NOT NULL
      ORDER BY seller_strength_rank
      LIMIT 10
    `);

    const fastestMarketsResult = await query(`
      SELECT *
      FROM propvero_top_markets_v1
      ORDER BY speed_rank
      LIMIT 10
    `);

    return NextResponse.json({
      ok: true,
      marketPulse: marketPulseResult.rows[0] ?? null,
      topMarkets: topMarketsResult.rows,
      buyerMarkets: buyerMarketsResult.rows,
      sellerMarkets: sellerMarketsResult.rows,
      fastestMarkets: fastestMarketsResult.rows,
    });
  } catch (error) {
    console.error("Market Pulse API error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Failed to load PropVero Market Pulse data",
      },
      { status: 500 }
    );
  }
}