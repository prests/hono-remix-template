import { Links, Meta, Scripts, ScrollRestoration } from '@remix-run/react';
import { createHead } from 'remix-island';

import { useNonce } from './hooks/nonce';

import type { PropsWithChildren } from 'react';

const Head = createHead(() => (
  <>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <Meta />
    <Links />
  </>
));

const Document = ({ children }: PropsWithChildren) => {
  const nonce = useNonce();

  return (
    <>
      <Head />
      {children}

      <ScrollRestoration nonce={nonce ?? undefined} />
      <Scripts nonce={nonce ?? undefined} />
    </>
  );
};

export { Document, Head };
