import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_rjMC0xlLg8YB@ep-misty-bar-b4jkvu8g-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  },
});
