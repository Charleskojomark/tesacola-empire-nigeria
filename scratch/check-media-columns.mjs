import { neon } from "@neondatabase/serverless";
const sql = neon("postgresql://neondb_owner:npg_rjMC0xlLg8YB@ep-misty-bar-b4jkvu8g-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require");
const cols = await sql`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'product_images'`;
console.log(cols);
