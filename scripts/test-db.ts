import { sql } from 'drizzle-orm';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function main() {
  console.log('Testing database connection...');
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️  DATABASE_URL is not set. Skipping real connection test.');
    process.exit(0);
  }
  try {
    const { db } = await import('../db');
    const result = await db.execute(sql`SELECT 1 as test`);
    console.log('✅ Database connection test successful!');
    console.log(result);
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection test failed:', error);
    process.exit(1);
  }
}

main();
