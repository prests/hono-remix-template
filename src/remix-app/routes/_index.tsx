import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';

const meta: MetaFunction = () => [
  { title: 'Remix Hono Template' },
  { name: 'description', content: 'This is a template for setting up a Remix application powered by Hono!' },
];

const loader = ({ context }: LoaderFunctionArgs) => {
  const { APP_NAME } = context.env;

  return json({ APP_NAME });
};

const RootIndexRoute = () => {
  const { APP_NAME } = useLoaderData<typeof loader>();

  return <div>{APP_NAME}</div>;
};

export default RootIndexRoute;
export { loader, meta };
