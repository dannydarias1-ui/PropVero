import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT jsonb_build_object(
        'type', 'FeatureCollection',
        'features', COALESCE(
          jsonb_agg(
            jsonb_build_object(
              'type', 'Feature',
              'geometry', ST_AsGeoJSON(ST_Transform(geom, 4326))::jsonb,
              'properties', jsonb_build_object(
                'city', city,
                'municipality', municipality,
                'active_listings', active_listings,
                'investment_segments', investment_segments,
                'best_yield_pct', best_yield_pct,
                'market_regime', market_regime,
                'market_quality_score', market_quality_score,
                'market_quality_label', market_quality_label,
                'confidence_level', confidence_level
              )
            )
          ),
          '[]'::jsonb
        )
      ) AS geojson
      FROM gis.market_map_municipalities_fast_v1
      WHERE geom IS NOT NULL;
    `);

    return NextResponse.json(result.rows[0].geojson);
  } catch (error) {
    console.error("Market map error:", error);

    return NextResponse.json(
      { error: "Failed to load market map" },
      { status: 500 }
    );
  }
}