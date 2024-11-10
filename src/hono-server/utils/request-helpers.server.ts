import type { Context } from 'hono';

const getIPAddress = (c: Context): string =>
  c.req.header('X-Forwarded-For') || c.req.header('CF-Connecting-IP') || c.req.header('X-Real-IP') || 'unknown';

export { getIPAddress };
