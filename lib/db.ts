import { Pool } from "pg";

export const pool = new Pool({
  host: process.env.PGHOST || "localhost",
  port: Number(process.env.PGPORT || 5432),
  database: process.env.PGDATABASE || "propvero",
  user: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD || undefined,
});

export const query = (text: string, params?: unknown[]) => {
  return pool.query(text, params);
};