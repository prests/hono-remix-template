import { Outlet } from '@remix-run/react';

import { Document } from './Document';
import stylexStylesheet from './main.css?url';

import type { LinksFunction } from '@remix-run/node';

const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: stylexStylesheet,
  },
];

const App = () => (
  <Document>
    <Outlet />
  </Document>
);

export default App;
export { links };
