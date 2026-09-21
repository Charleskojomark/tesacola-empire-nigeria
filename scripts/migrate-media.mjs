import { neon } from "@neondatabase/serverless";
const sql = neon("postgresql://neondb_owner:npg_rjMC0xlLg8YB@ep-misty-bar-b4jkvu8g-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require");

async function migrate() {
  await sql`ALTER TABLE product_images ADD COLUMN IF NOT EXISTS media_type TEXT DEFAULT 'IMAGE'`;
  console.log("Migration complete: media_type added to product_images");
  const cols = await sql`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'product_images'`;
  console.log(cols);
}

migrate().catch(console.error);
