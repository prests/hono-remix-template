import { join } from 'node:path';
import { Hono } from 'hono';
import { remix } from 'remix-hono/handler';
import type { AppLoadContext, ServerBuild } from '@remix-run/node';
import { installGlobals } from '@remix-run/node';
import { serveStatic } from '@hono/node-server/serve-static';
import { serve } from '@hono/node-server';
import { logger } from 'hono/logger';
import { NONCE, secureHeaders } from 'hono/secure-headers';

import { IS_PRODUCTION_MODE, MODE } from './constants/server.js';
import { importDevBuild } from './dev-server.js';
import type { Env } from './middleware/env.js';
import { getEnv } from './middleware/env.js';

declare module '@remix-run/node' {
  interface AppLoadContext {
    /**
     * The app version from the build assets
     */
    readonly appVersion: string;
    /**
     * Content Security Policy's nonce
     */
    readonly nonce: string;
    /**
     * Injected Application Environmental Variables
     */
    readonly env: Env;
  }
}

const BUILD_DIR = join(process.cwd(), 'build');

installGlobals();

const env = getEnv();

const app = new Hono();

app.use('/assets/*', serveStatic({ root: join(BUILD_DIR, 'client') }));

app.use('*', serveStatic({ root: IS_PRODUCTION_MODE ? './build/client' : './public' }));

app.use('*', logger());

app.use(
  '*',
  secureHeaders({
    contentSecurityPolicy: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", ...(IS_PRODUCTION_MODE ? [] : ['wss:', 'data:'])],
      scriptSrc: ["'self'", "'strict-dynamic'", NONCE],
      styleSrc: ["'self'", NONCE],
    },
  })
);

app.use(async (c, next) => {
  const nonce = c.get('secureHeadersNonce');
  if (!nonce) {
    throw new Error('CSP nonce not initialized');
  }

  const build = (IS_PRODUCTION_MODE
    ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line import/no-unresolved -- this expected until you build the app
      await import('../build/server/index.js')
    : await importDevBuild()) as unknown as ServerBuild;

  return remix({
    build,
    mode: MODE,
    getLoadContext() {
      return {
        appVersion: IS_PRODUCTION_MODE ? build.assets.version : 'dev',
        nonce,
        env,
      } satisfies AppLoadContext;
    },
  })(c, next);
});

if (IS_PRODUCTION_MODE) {
  serve({ ...app, port: Number(process.env.PORT) || 3_000 }, async info => {
    console.log(`🚀 Server started on port ${info.port}`);
  });
}

export default app;
