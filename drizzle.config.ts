import { defineConfig, Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

interface PgConfig extends Config {
    dialect: 'postgresql';
    dbCredentials: {
      url: string;
    };
}

export default defineConfig({
  dialect: "postgresql", 
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  }
} as PgConfig);
