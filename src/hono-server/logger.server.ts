import { getPath } from 'hono/utils/url';

import { getIPAddress } from './utils/request-helpers.server.js';

import type { Context, Next } from 'hono';

const logger =
  (appVersion: string, fn = console.log) =>
  async (c: Context, next: Next) => {
    const { method } = c.req;

    const start = Date.now();
    await next();
    const duration = Date.now() - start;

    const { status } = c.res;

    fn({
      timestamp: new Date().toISOString(),
      method,
      path: getPath(c.req.raw),
      status,
      client_ip: getIPAddress(c),
      duration_ms: duration,
      user_agent: c.req.header('User-Agent'),
      referrer: c.req.header('Referer'),
      query_params: c.req.query(),
      app_version: appVersion,
    });
  };

export { logger };
