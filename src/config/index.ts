
// Database connection
export const POSTGRES_USER = process.env.POSTGRES_USER;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
export const POSTGRES_DB = process.env.POSTGRES_DB;
export const POSTGRES_HOST = process.env.POSTGRES_HOST;

// Server
export const PORT = process.env.PORT;
export const API_PREFIX = process.env.API_PREFIX;

// Environment
export const NODE_ENV = process.env.NODE_ENV;

// Secret keys
export const JWT_SECRET = process.env.JWT_SECRET; //encrypt tokens
export const CRYPTO_IV_KEY = process.env.CRYPTO_IV_KEY!; //encrypt credentials
export const CRYPTO_PASSWORD = process.env.CRYPTO_PASSWORD!;
export const CRYPTO_ALGORITHM = process.env.CRYPTO_ALGORITHM!;
export const HASH_ALGORITHM = process.env.HASH_ALGORITHM!;
export const HASH_SECRET = process.env.HASH_SECRET!;
