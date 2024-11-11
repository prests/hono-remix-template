import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import * as stylex from '@stylexjs/stylex';

import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';

const meta: MetaFunction = () => [
  { title: 'Remix Hono Template' },
  { name: 'description', content: 'This is a template for setting up a Remix application powered by Hono!' },
];

const loader = ({ context }: LoaderFunctionArgs) => {
  const { APP_NAME } = context.env;

  return json({ APP_NAME });
};

const styles = stylex.create({
  base: {
    color: 'red',
    fontWeight: 800,
  },
});

const RootIndexRoute = () => {
  const { APP_NAME } = useLoaderData<typeof loader>();

  return <div {...stylex.props(styles.base)}>{APP_NAME}</div>;
};

export default RootIndexRoute;
export { loader, meta };
