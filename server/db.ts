import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import { Pool as PgPool } from 'pg';
import ws from "ws";
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Check if running on Railway (Railway sets RAILWAY_ENVIRONMENT)
const isRailway = process.env.RAILWAY_ENVIRONMENT || process.env.DATABASE_URL?.includes('railway');

let pool: any;
let db: any;

if (isRailway) {
  // Use standard PostgreSQL for Railway
  pool = new PgPool({ 
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
  db = drizzlePg(pool, { schema });
} else {
  // Use Neon configuration for other environments
  neonConfig.webSocketConstructor = ws;
  neonConfig.poolQueryViaFetch = true;
  
  pool = new Pool({ 
    connectionString: process.env.DATABASE_URL,
    max: 1,
    idleTimeoutMillis: 0
  });
  db = drizzle({ client: pool, schema });
}

export { pool, db };
