import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import { useNonce } from './hooks/nonce';
import stylexStylesheet from './main.css?url';

import type { LinksFunction } from '@remix-run/node';

const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: stylexStylesheet,
  },
];

const App = () => {
  const nonce = useNonce();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body>
        <Outlet />

        <ScrollRestoration nonce={nonce ?? undefined} />
        <Scripts nonce={nonce ?? undefined} />
      </body>
    </html>
  );
};

export default App;
export { links };
