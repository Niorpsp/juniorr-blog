import pg from 'pg';

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || process.env.PG_CONNECTION_STRING;
const connectionPool = connectionString ? new Pool({ connectionString }) : null;

export default connectionPool;
