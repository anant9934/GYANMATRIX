import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Create a connection to the database
// The connection string is read from the DATABASE_URL environment variable
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);
