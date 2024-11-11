import { IS_PRODUCTION_MODE } from './constants/server.js';

// This server is only used to load the dev server build
const viteDevServer = IS_PRODUCTION_MODE
  ? undefined
  : await import('vite').then(vite =>
      vite.createServer({
        server: { middlewareMode: true },
        appType: 'custom',
      })
    );

/**
 * Load the dev server build
 * @returns The server build
 */
const getDevBuild = async () => viteDevServer?.ssrLoadModule('virtual:remix/server-build');

export { getDevBuild };
