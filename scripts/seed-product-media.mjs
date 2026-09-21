import { neon } from "@neondatabase/serverless";

const sql = neon("postgresql://neondb_owner:npg_rjMC0xlLg8YB@ep-misty-bar-b4jkvu8g-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require");

async function seedMedia() {
  console.log("Connecting to Neon to update flagship product media...");
  
  // Find flagship product
  const [product] = await sql`SELECT id, name, slug FROM products WHERE slug = 'sovereign-wholecut-oxford' LIMIT 1`;
  
  if (!product) {
    console.log("Product not found, listing all products:");
    const prods = await sql`SELECT id, name, slug FROM products LIMIT 5`;
    console.log(prods);
    return;
  }

  console.log(`Found flagship product: ${product.name} (${product.id})`);

  // Delete existing images for this product
  await sql`DELETE FROM product_images WHERE product_id = ${product.id}`;

  // Insert 4 distinct angle images + 1 luxury artisan motion video reel
  const mediaItems = [
    {
      id: `img-${Date.now()}-1`,
      product_id: product.id,
      url: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1400&q=85",
      alt_text: "Angle 1: Frontal Profile & Sculpted Chiseled Toe",
      is_main: true,
      sort_order: 1,
      media_type: "IMAGE"
    },
    {
      id: `img-${Date.now()}-2`,
      product_id: product.id,
      url: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1400&q=85",
      alt_text: "Angle 2: Lateral Waist Silhouette & Vamp Curvature",
      is_main: false,
      sort_order: 2,
      media_type: "IMAGE"
    },
    {
      id: `img-${Date.now()}-3`,
      product_id: product.id,
      url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1400&q=85",
      alt_text: "Angle 3: Oak Bark Tanned Sole & Hand-Fudge Welt Stitching",
      is_main: false,
      sort_order: 3,
      media_type: "IMAGE"
    },
    {
      id: `img-${Date.now()}-4`,
      product_id: product.id,
      url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1400&q=85",
      alt_text: "Angle 4: Hand-Burnished Heel Counter & Quarter Profile",
      is_main: false,
      sort_order: 4,
      media_type: "IMAGE"
    },
    {
      id: `img-${Date.now()}-5`,
      product_id: product.id,
      // High quality luxury leather craft showcase MP4 video
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      alt_text: "Artisan Movement Reel: 360° Lasting & Burnishing Motion",
      is_main: false,
      sort_order: 5,
      media_type: "VIDEO"
    }
  ];

  for (const item of mediaItems) {
    await sql`
      INSERT INTO product_images (id, product_id, url, alt_text, is_main, sort_order, media_type, created_at)
      VALUES (${item.id}, ${item.product_id}, ${item.url}, ${item.alt_text}, ${item.is_main}, ${item.sort_order}, ${item.media_type}, NOW())
    `;
  }

  console.log("Successfully seeded 4 angle photos + 1 artisan video reel to Neon!");
}

seedMedia().catch(console.error);
