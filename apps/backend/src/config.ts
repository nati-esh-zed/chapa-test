export const CHASECK = Bun.env.CHASECK
export const BASE_URL = Bun.env.RAILWAY_PUBLIC_DOMAIN
  ? `https://${Bun.env.RAILWAY_PUBLIC_DOMAIN}`
  : "http://localhost:3000"
